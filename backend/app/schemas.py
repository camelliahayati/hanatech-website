from __future__ import annotations

from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

ROLE_OPTIONS = [
    "Dentist",
    "Clinic Owner",
    "Practice Manager",
    "Orthodontist",
    "Oral Surgeon",
    "Dental Hygienist",
    "Other",
]

CLINIC_TYPE_OPTIONS = [
    "Private Clinic",
    "Group Practice",
    "Dental Chain",
    "University Clinic",
    "Public Clinic",
    "Other",
]

NUMBER_OF_DENTISTS_OPTIONS = ["Solo", "2-5", "6-10", "11-20", "20+"]
MONTHLY_TREATMENT_VOLUME_OPTIONS = ["<50", "50-100", "101-250", "251-500", "500+"]
SPECIALIZATION_OPTIONS = [
    "General Dentistry",
    "Implantology",
    "Orthodontics",
    "Oral Surgery",
    "Pediatric Dentistry",
    "Endodontics",
    "Prosthodontics",
    "Other",
]
PROBLEMATIC_TREATMENTS_OPTIONS = [
    "Implants",
    "Extractions",
    "Root Canal",
    "Oral Surgery",
    "Orthodontics",
    "Dentures",
    "Pediatric Treatments",
    "Other",
]
WEEKLY_FOLLOWUP_TIME_OPTIONS = [
    "Less than 1 hour",
    "1-5 hours",
    "6-10 hours",
    "11-20 hours",
    "More than 20 hours",
]
COMMUNICATION_CHANNEL_OPTIONS = [
    "Phone",
    "Email",
    "SMS",
    "WhatsApp",
    "Patient Portal",
    "Other",
]
DELAYED_COMPLICATION_OPTIONS = ["Yes", "No", "Not Sure"]
VALUABLE_AI_FEATURES_OPTIONS = [
    "Infection Detection",
    "Healing Assessment",
    "Swelling Detection",
    "Pain Risk Prediction",
    "Automated Triage",
    "Documentation Assistance",
    "Multilingual Patient Support",
    "Smart Follow-up Scheduling",
]
CONCERN_OPTIONS = [
    "GDPR",
    "Medical Liability",
    "AI Accuracy",
    "Regulatory Approval",
    "Data Security",
    "Workflow Disruption",
    "Patient Adoption",
    "No Concerns",
]
MONTHLY_PRICE_OPTIONS = [
    "Less than €100",
    "€100-250",
    "€250-500",
    "€500-1000",
    "€1000+",
]
PILOT_INTEREST_OPTIONS = [
    "Pilot Project",
    "Research Collaboration",
    "Clinical Validation Study",
    "Co-Development",
    "Early Access Program",
    "Letter of Support",
    "Product Demo",
]

CONTACT_FREQUENCY_LABELS = {
    1: "Never",
    2: "Rarely",
    3: "Sometimes",
    4: "Often",
    5: "Very Often",
}


def _clean_text(value: str) -> str:
    return " ".join(value.replace("\x00", "").strip().split())


class SurveySubmissionIn(BaseModel):
    full_name: Annotated[str, Field(min_length=2, max_length=255)]
    email: EmailStr
    phone: Annotated[str | None, Field(max_length=64)] = None
    country: Annotated[str, Field(min_length=2, max_length=128)]
    city: Annotated[str, Field(min_length=2, max_length=128)]
    clinic_name: Annotated[str, Field(min_length=2, max_length=255)]
    role: str
    role_other: Annotated[str | None, Field(max_length=255)] = None

    clinic_type: str
    number_of_dentists: str
    monthly_treatment_volume: str
    specialization: Annotated[list[str], Field(min_length=1)]

    contact_frequency: Annotated[int, Field(ge=1, le=5)]
    problematic_treatments: Annotated[list[str], Field(min_length=1)]
    weekly_followup_time: str
    communication_channels: Annotated[list[str], Field(min_length=1)]
    current_software: Annotated[str, Field(min_length=2, max_length=3000)]
    workflow_satisfaction: Annotated[int, Field(ge=1, le=10)]

    delayed_complication_experience: str
    problem_severity_score: Annotated[int, Field(ge=1, le=10)]
    biggest_challenge: Annotated[str, Field(min_length=10, max_length=5000)]

    ai_interest_score: Annotated[int, Field(ge=1, le=10)]
    valuable_ai_features: Annotated[list[str], Field(min_length=1)]
    concerns: Annotated[list[str], Field(min_length=1)]

    monthly_price_expectation: str
    pilot_interest: Annotated[list[str], Field(min_length=1)]

    consent_contact: bool = False
    consent_research: bool = False
    privacy_accepted: bool

    @field_validator(
        "full_name",
        "country",
        "city",
        "clinic_name",
        "role_other",
        "current_software",
        "biggest_challenge",
        mode="before",
    )
    @classmethod
    def clean_scalar_text(cls, value: str | None) -> str | None:
        if value is None:
            return value
        return _clean_text(value)

    @field_validator("role")
    @classmethod
    def validate_role(cls, value: str) -> str:
        if value not in ROLE_OPTIONS:
            raise ValueError("Invalid role option.")
        return value

    @field_validator("clinic_type")
    @classmethod
    def validate_clinic_type(cls, value: str) -> str:
        if value not in CLINIC_TYPE_OPTIONS:
            raise ValueError("Invalid clinic type option.")
        return value

    @field_validator("number_of_dentists")
    @classmethod
    def validate_number_of_dentists(cls, value: str) -> str:
        if value not in NUMBER_OF_DENTISTS_OPTIONS:
            raise ValueError("Invalid dentist count option.")
        return value

    @field_validator("monthly_treatment_volume")
    @classmethod
    def validate_monthly_treatment_volume(cls, value: str) -> str:
        if value not in MONTHLY_TREATMENT_VOLUME_OPTIONS:
            raise ValueError("Invalid monthly treatment volume option.")
        return value

    @field_validator("specialization")
    @classmethod
    def validate_specializations(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in SPECIALIZATION_OPTIONS]
        if invalid:
            raise ValueError("Invalid specialization option(s).")
        return sorted(set(value))

    @field_validator("problematic_treatments")
    @classmethod
    def validate_problematic_treatments(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in PROBLEMATIC_TREATMENTS_OPTIONS]
        if invalid:
            raise ValueError("Invalid treatment option(s).")
        return sorted(set(value))

    @field_validator("weekly_followup_time")
    @classmethod
    def validate_weekly_followup(cls, value: str) -> str:
        if value not in WEEKLY_FOLLOWUP_TIME_OPTIONS:
            raise ValueError("Invalid weekly follow-up time option.")
        return value

    @field_validator("communication_channels")
    @classmethod
    def validate_communication_channels(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in COMMUNICATION_CHANNEL_OPTIONS]
        if invalid:
            raise ValueError("Invalid communication channel option(s).")
        return sorted(set(value))

    @field_validator("delayed_complication_experience")
    @classmethod
    def validate_delayed_complication(cls, value: str) -> str:
        if value not in DELAYED_COMPLICATION_OPTIONS:
            raise ValueError("Invalid delayed complication option.")
        return value

    @field_validator("valuable_ai_features")
    @classmethod
    def validate_ai_features(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in VALUABLE_AI_FEATURES_OPTIONS]
        if invalid:
            raise ValueError("Invalid AI feature option(s).")
        return sorted(set(value))

    @field_validator("concerns")
    @classmethod
    def validate_concerns(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in CONCERN_OPTIONS]
        if invalid:
            raise ValueError("Invalid concern option(s).")
        return sorted(set(value))

    @field_validator("monthly_price_expectation")
    @classmethod
    def validate_monthly_price(cls, value: str) -> str:
        if value not in MONTHLY_PRICE_OPTIONS:
            raise ValueError("Invalid monthly pricing option.")
        return value

    @field_validator("pilot_interest")
    @classmethod
    def validate_pilot_interest(cls, value: list[str]) -> list[str]:
        invalid = [item for item in value if item not in PILOT_INTEREST_OPTIONS]
        if invalid:
            raise ValueError("Invalid pilot interest option(s).")
        return sorted(set(value))

    @model_validator(mode="after")
    def validate_conditional_fields(self) -> "SurveySubmissionIn":
        if self.role == "Other" and not self.role_other:
            raise ValueError("Role other is required when role is Other.")
        if not self.privacy_accepted:
            raise ValueError("Privacy policy acceptance is required.")
        return self


class SurveyListItemOut(BaseModel):
    id: int
    full_name: str
    clinic_name: str
    country: str
    role: str
    ai_interest_score: int
    pilot_interest: list[str]
    created_at: datetime


class SurveyAnalyticsOut(BaseModel):
    total_responses: int
    responses_by_country: list[tuple[str, int]]
    pilot_interest_rate: float
    average_ai_interest_score: float
    average_problem_severity_score: float
    top_requested_ai_features: list[tuple[str, int]]
    most_common_concerns: list[tuple[str, int]]

