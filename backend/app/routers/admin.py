from __future__ import annotations

import csv
from datetime import datetime, timezone
from io import StringIO
from urllib.parse import urlencode

from fastapi import APIRouter, Depends, Query, Request, status
from fastapi.responses import RedirectResponse, Response
from fastapi.templating import Jinja2Templates
from sqlalchemy import Select, asc, desc, func, select
from sqlalchemy.orm import Session

from ..analytics import apply_filters, build_filters, compute_analytics
from ..config import load_settings
from ..database import get_db
from ..models import DentalSurveyResponse
from ..schemas import CLINIC_TYPE_OPTIONS, PILOT_INTEREST_OPTIONS, ROLE_OPTIONS
from ..security import (
    clear_admin_session,
    ensure_csrf_token,
    get_admin_username,
    mark_admin_authenticated,
    require_admin,
    verify_csrf_token,
    verify_password,
)

settings = load_settings()
router = APIRouter(prefix="/admin", tags=["admin"])
templates = Jinja2Templates(directory="backend/app/templates")


def _redirect_login(next_path: str = "/admin/dental-survey") -> RedirectResponse:
    query = urlencode({"next": next_path})
    return RedirectResponse(
        url=f"/admin/login?{query}",
        status_code=status.HTTP_303_SEE_OTHER,
    )


def _ensure_admin_or_redirect(request: Request):
    try:
        require_admin(request)
        return None
    except Exception:  # noqa: BLE001
        return _redirect_login(str(request.url.path))


def _base_query(filters: list) -> Select:
    stmt = select(DentalSurveyResponse)
    return apply_filters(stmt, filters)


@router.get("/login")
def admin_login_page(request: Request, next: str = Query("/admin/dental-survey")):
    csrf_token = ensure_csrf_token(request)
    return templates.TemplateResponse(
        "admin_login.html",
        {
            "request": request,
            "csrf_token": csrf_token,
            "next": next,
            "error": None,
        },
    )


@router.post("/login")
async def admin_login_submit(request: Request):
    csrf_token = ensure_csrf_token(request)
    form = await request.form()
    next_path = form.get("next", "/admin/dental-survey")

    try:
        verify_csrf_token(request, form.get("csrf_token"))
    except Exception:
        return templates.TemplateResponse(
            "admin_login.html",
            {
                "request": request,
                "csrf_token": csrf_token,
                "next": next_path,
                "error": "Security validation failed. Please try again.",
            },
            status_code=status.HTTP_403_FORBIDDEN,
        )

    username = (form.get("username") or "").strip()
    password = form.get("password") or ""

    if username != settings.admin_username or not verify_password(
        password, settings.admin_password_hash
    ):
        return templates.TemplateResponse(
            "admin_login.html",
            {
                "request": request,
                "csrf_token": csrf_token,
                "next": next_path,
                "error": "Invalid username or password.",
            },
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    mark_admin_authenticated(request, username=settings.admin_username)
    return RedirectResponse(url=next_path, status_code=status.HTTP_303_SEE_OTHER)


@router.post("/logout")
async def admin_logout(request: Request):
    form = await request.form()
    verify_csrf_token(request, form.get("csrf_token"))
    clear_admin_session(request)
    return RedirectResponse(url="/admin/login", status_code=status.HTTP_303_SEE_OTHER)


@router.get("/dental-survey")
def admin_dashboard(
    request: Request,
    db: Session = Depends(get_db),
    country: str | None = Query(None),
    role: str | None = Query(None),
    clinic_type: str | None = Query(None),
    pilot_interest: str | None = Query(None),
    sort: str = Query("newest"),
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=200),
):
    redirect = _ensure_admin_or_redirect(request)
    if redirect:
        return redirect

    filters = build_filters(
        country=country,
        role=role,
        clinic_type=clinic_type,
        pilot_interest=pilot_interest,
    )

    order_by = desc(DentalSurveyResponse.created_at) if sort != "oldest" else asc(
        DentalSurveyResponse.created_at
    )
    count_stmt = apply_filters(select(func.count(DentalSurveyResponse.id)), filters)
    total = int(db.scalar(count_stmt) or 0)
    total_pages = max((total + page_size - 1) // page_size, 1)
    if page > total_pages:
        page = total_pages

    data_stmt = (
        _base_query(filters)
        .order_by(order_by)
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    responses = list(db.scalars(data_stmt))
    analytics = compute_analytics(db, filters)

    distinct_countries_stmt = (
        select(DentalSurveyResponse.country)
        .distinct()
        .order_by(DentalSurveyResponse.country)
    )
    distinct_countries = [row[0] for row in db.execute(distinct_countries_stmt).all()]

    return templates.TemplateResponse(
        "admin_dashboard.html",
        {
            "request": request,
            "csrf_token": ensure_csrf_token(request),
            "responses": responses,
            "analytics": analytics,
            "selected_filters": {
                "country": country or "",
                "role": role or "",
                "clinic_type": clinic_type or "",
                "pilot_interest": pilot_interest or "",
                "sort": sort,
            },
            "filter_options": {
                "countries": distinct_countries,
                "roles": ROLE_OPTIONS,
                "clinic_types": CLINIC_TYPE_OPTIONS,
                "pilot_interests": PILOT_INTEREST_OPTIONS,
            },
            "pagination": {
                "page": page,
                "page_size": page_size,
                "total": total,
                "total_pages": total_pages,
            },
            "admin_username": get_admin_username(request),
        },
    )


@router.get("/dental-survey/{response_id}")
def admin_response_detail(
    request: Request,
    response_id: int,
    db: Session = Depends(get_db),
):
    redirect = _ensure_admin_or_redirect(request)
    if redirect:
        return redirect

    response = db.get(DentalSurveyResponse, response_id)
    if not response:
        return Response(status_code=status.HTTP_404_NOT_FOUND)

    return templates.TemplateResponse(
        "admin_detail.html",
        {
            "request": request,
            "response": response,
            "admin_username": get_admin_username(request),
            "csrf_token": ensure_csrf_token(request),
        },
    )


@router.get("/dental-survey/export.csv")
def export_csv(
    request: Request,
    db: Session = Depends(get_db),
    country: str | None = Query(None),
    role: str | None = Query(None),
    clinic_type: str | None = Query(None),
    pilot_interest: str | None = Query(None),
    sort: str = Query("newest"),
):
    redirect = _ensure_admin_or_redirect(request)
    if redirect:
        return redirect

    filters = build_filters(
        country=country,
        role=role,
        clinic_type=clinic_type,
        pilot_interest=pilot_interest,
    )
    order_by = desc(DentalSurveyResponse.created_at) if sort != "oldest" else asc(
        DentalSurveyResponse.created_at
    )
    rows = list(db.scalars(_base_query(filters).order_by(order_by)))

    stream = StringIO()
    writer = csv.writer(stream)
    writer.writerow(
        [
            "id",
            "full_name",
            "email",
            "phone",
            "country",
            "city",
            "clinic_name",
            "role",
            "role_other",
            "clinic_type",
            "number_of_dentists",
            "monthly_treatment_volume",
            "specialization",
            "contact_frequency",
            "problematic_treatments",
            "weekly_followup_time",
            "communication_channels",
            "current_software",
            "workflow_satisfaction",
            "delayed_complication_experience",
            "problem_severity_score",
            "biggest_challenge",
            "ai_interest_score",
            "valuable_ai_features",
            "concerns",
            "monthly_price_expectation",
            "pilot_interest",
            "consent_contact",
            "consent_research",
            "privacy_accepted",
            "ip_address",
            "user_agent",
            "created_at",
            "updated_at",
        ]
    )
    for item in rows:
        writer.writerow(
            [
                item.id,
                item.full_name,
                item.email,
                item.phone or "",
                item.country,
                item.city,
                item.clinic_name,
                item.role,
                item.role_other or "",
                item.clinic_type,
                item.number_of_dentists,
                item.monthly_treatment_volume,
                " | ".join(item.specialization),
                item.contact_frequency,
                " | ".join(item.problematic_treatments),
                item.weekly_followup_time,
                " | ".join(item.communication_channels),
                item.current_software,
                item.workflow_satisfaction,
                item.delayed_complication_experience,
                item.problem_severity_score,
                item.biggest_challenge,
                item.ai_interest_score,
                " | ".join(item.valuable_ai_features),
                " | ".join(item.concerns),
                item.monthly_price_expectation,
                " | ".join(item.pilot_interest),
                item.consent_contact,
                item.consent_research,
                item.privacy_accepted,
                item.ip_address,
                item.user_agent,
                item.created_at.isoformat(),
                item.updated_at.isoformat(),
            ]
        )

    date_stamp = datetime.now(timezone.utc).strftime("%Y_%m_%d")
    filename = f"dental_survey_export_{date_stamp}.csv"
    content = stream.getvalue().encode("utf-8")
    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return Response(content=content, media_type="text/csv; charset=utf-8", headers=headers)
