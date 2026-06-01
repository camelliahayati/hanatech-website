from __future__ import annotations

from typing import Any

from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from pydantic import ValidationError
from sqlalchemy.orm import Session

from ..anti_spam import (
    is_duplicate_submission,
    is_honeypot_triggered,
    is_rate_limited,
)
from ..config import load_settings
from ..database import get_db
from ..models import DentalSurveyResponse
from ..schemas import (
    CLINIC_TYPE_OPTIONS,
    COMMUNICATION_CHANNEL_OPTIONS,
    CONCERN_OPTIONS,
    CONTACT_FREQUENCY_LABELS,
    DELAYED_COMPLICATION_OPTIONS,
    MONTHLY_PRICE_OPTIONS,
    MONTHLY_TREATMENT_VOLUME_OPTIONS,
    NUMBER_OF_DENTISTS_OPTIONS,
    PILOT_INTEREST_OPTIONS,
    PROBLEMATIC_TREATMENTS_OPTIONS,
    ROLE_OPTIONS,
    SPECIALIZATION_OPTIONS,
    VALUABLE_AI_FEATURES_OPTIONS,
    WEEKLY_FOLLOWUP_TIME_OPTIONS,
    SurveySubmissionIn,
)
from ..security import ensure_csrf_token, get_client_ip, sanitize_header_value, verify_csrf_token

settings = load_settings()
router = APIRouter(tags=["dental-survey"])
templates = Jinja2Templates(directory="backend/app/templates")

TARGET_COUNTRIES = [
    "Netherlands",
    "Sweden",
    "Denmark",
    "Finland",
    "Germany",
    "United Kingdom",
]

MULTI_FIELDS = {
    "specialization",
    "problematic_treatments",
    "communication_channels",
    "valuable_ai_features",
    "concerns",
    "pilot_interest",
}


def _default_form_values() -> dict[str, Any]:
    return {
        "country": "",
        "role": "",
        "role_other": "",
        "clinic_type": "",
        "number_of_dentists": "",
        "monthly_treatment_volume": "",
        "contact_frequency": "",
        "weekly_followup_time": "",
        "workflow_satisfaction": "",
        "delayed_complication_experience": "",
        "problem_severity_score": "",
        "ai_interest_score": "",
        "monthly_price_expectation": "",
        "consent_contact": False,
        "consent_research": False,
        "privacy_accepted": False,
        "specialization": [],
        "problematic_treatments": [],
        "communication_channels": [],
        "valuable_ai_features": [],
        "concerns": [],
        "pilot_interest": [],
    }


def _common_context(request: Request) -> dict[str, Any]:
    return {
        "request": request,
        "role_options": ROLE_OPTIONS,
        "clinic_type_options": CLINIC_TYPE_OPTIONS,
        "number_of_dentists_options": NUMBER_OF_DENTISTS_OPTIONS,
        "monthly_treatment_volume_options": MONTHLY_TREATMENT_VOLUME_OPTIONS,
        "specialization_options": SPECIALIZATION_OPTIONS,
        "contact_frequency_labels": CONTACT_FREQUENCY_LABELS,
        "problematic_treatment_options": PROBLEMATIC_TREATMENTS_OPTIONS,
        "weekly_followup_time_options": WEEKLY_FOLLOWUP_TIME_OPTIONS,
        "communication_channel_options": COMMUNICATION_CHANNEL_OPTIONS,
        "delayed_complication_options": DELAYED_COMPLICATION_OPTIONS,
        "valuable_ai_feature_options": VALUABLE_AI_FEATURES_OPTIONS,
        "concern_options": CONCERN_OPTIONS,
        "monthly_price_options": MONTHLY_PRICE_OPTIONS,
        "pilot_interest_options": PILOT_INTEREST_OPTIONS,
        "target_countries": TARGET_COUNTRIES,
    }


@router.get("/dental-ai-survey")
def render_survey(request: Request):
    csrf_token = ensure_csrf_token(request)
    context = _common_context(request)
    context.update(
        {
            "csrf_token": csrf_token,
            "errors": [],
            "form_values": _default_form_values(),
        }
    )
    return templates.TemplateResponse("survey_form.html", context)


@router.post("/dental-ai-survey")
async def submit_survey(request: Request, db: Session = Depends(get_db)):
    csrf_token = ensure_csrf_token(request)
    form = await request.form(max_fields=2000)
    form_values = _default_form_values()
    errors: list[str] = []

    for key, value in form.multi_items():
        if key in MULTI_FIELDS:
            form_values.setdefault(key, [])
            form_values[key] = form.getlist(key)
        else:
            form_values[key] = value

    form_values["consent_contact"] = bool(form.get("consent_contact"))
    form_values["consent_research"] = bool(form.get("consent_research"))
    form_values["privacy_accepted"] = bool(form.get("privacy_accepted"))

    if is_honeypot_triggered(form.get("website")):
        return RedirectResponse(
            url="/dental-ai-survey/thank-you",
            status_code=status.HTTP_303_SEE_OTHER,
        )

    try:
        verify_csrf_token(request, form.get("csrf_token"))
    except Exception as exc:  # noqa: BLE001
        errors.append(str(getattr(exc, "detail", "Security validation failed.")))

    payload_data = {
        "full_name": form.get("full_name"),
        "email": form.get("email"),
        "phone": form.get("phone"),
        "country": form.get("country"),
        "city": form.get("city"),
        "clinic_name": form.get("clinic_name"),
        "role": form.get("role"),
        "role_other": form.get("role_other"),
        "clinic_type": form.get("clinic_type"),
        "number_of_dentists": form.get("number_of_dentists"),
        "monthly_treatment_volume": form.get("monthly_treatment_volume"),
        "specialization": form.getlist("specialization"),
        "contact_frequency": form.get("contact_frequency"),
        "problematic_treatments": form.getlist("problematic_treatments"),
        "weekly_followup_time": form.get("weekly_followup_time"),
        "communication_channels": form.getlist("communication_channels"),
        "current_software": form.get("current_software"),
        "workflow_satisfaction": form.get("workflow_satisfaction"),
        "delayed_complication_experience": form.get("delayed_complication_experience"),
        "problem_severity_score": form.get("problem_severity_score"),
        "biggest_challenge": form.get("biggest_challenge"),
        "ai_interest_score": form.get("ai_interest_score"),
        "valuable_ai_features": form.getlist("valuable_ai_features"),
        "concerns": form.getlist("concerns"),
        "monthly_price_expectation": form.get("monthly_price_expectation"),
        "pilot_interest": form.getlist("pilot_interest"),
        "consent_contact": bool(form.get("consent_contact")),
        "consent_research": bool(form.get("consent_research")),
        "privacy_accepted": bool(form.get("privacy_accepted")),
    }

    submission: SurveySubmissionIn | None = None
    if not errors:
        try:
            submission = SurveySubmissionIn.model_validate(payload_data)
        except ValidationError as exc:
            errors.extend(err["msg"] for err in exc.errors())

    ip_address = get_client_ip(request)
    if not errors and submission is not None:
        if is_rate_limited(db, ip_address, settings):
            errors.append("Too many submissions from this IP. Please try again later.")
        elif is_duplicate_submission(db, submission, settings):
            errors.append(
                "A similar response was already submitted recently. "
                "If you need to update your response, contact HanaTech."
            )

    if errors or submission is None:
        context = _common_context(request)
        context.update(
            {"csrf_token": csrf_token, "errors": errors, "form_values": form_values}
        )
        return templates.TemplateResponse(
            "survey_form.html",
            context,
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    db_row = DentalSurveyResponse(
        full_name=submission.full_name,
        email=str(submission.email),
        phone=submission.phone,
        country=submission.country,
        city=submission.city,
        clinic_name=submission.clinic_name,
        role=submission.role,
        role_other=submission.role_other,
        clinic_type=submission.clinic_type,
        number_of_dentists=submission.number_of_dentists,
        monthly_treatment_volume=submission.monthly_treatment_volume,
        specialization=submission.specialization,
        contact_frequency=submission.contact_frequency,
        problematic_treatments=submission.problematic_treatments,
        weekly_followup_time=submission.weekly_followup_time,
        communication_channels=submission.communication_channels,
        current_software=submission.current_software,
        workflow_satisfaction=submission.workflow_satisfaction,
        delayed_complication_experience=submission.delayed_complication_experience,
        problem_severity_score=submission.problem_severity_score,
        biggest_challenge=submission.biggest_challenge,
        ai_interest_score=submission.ai_interest_score,
        valuable_ai_features=submission.valuable_ai_features,
        concerns=submission.concerns,
        monthly_price_expectation=submission.monthly_price_expectation,
        pilot_interest=submission.pilot_interest,
        consent_contact=submission.consent_contact,
        consent_research=submission.consent_research,
        privacy_accepted=submission.privacy_accepted,
        ip_address=sanitize_header_value(ip_address, max_length=64),
        user_agent=sanitize_header_value(request.headers.get("user-agent")),
    )
    db.add(db_row)
    db.commit()

    return RedirectResponse(
        url="/dental-ai-survey/thank-you",
        status_code=status.HTTP_303_SEE_OTHER,
    )


@router.get("/dental-ai-survey/thank-you")
def survey_thank_you(request: Request):
    return templates.TemplateResponse("survey_thank_you.html", {"request": request})
