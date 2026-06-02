from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Index, Integer, JSON, String, Text, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base

StringList = ARRAY(Text).with_variant(JSON, "sqlite")


class DentalSurveyResponse(Base):
    __tablename__ = "dental_survey_responses"
    __table_args__ = (
        Index("ix_dental_survey_created_at", "created_at"),
        Index("ix_dental_survey_country", "country"),
        Index("ix_dental_survey_role", "role"),
        Index("ix_dental_survey_clinic_type", "clinic_type"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(64), nullable=True)
    country: Mapped[str] = mapped_column(String(128), nullable=False)
    city: Mapped[str] = mapped_column(String(128), nullable=False)
    clinic_name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(128), nullable=False)
    role_other: Mapped[str | None] = mapped_column(String(255), nullable=True)

    clinic_type: Mapped[str] = mapped_column(String(128), nullable=False)
    number_of_dentists: Mapped[str] = mapped_column(String(32), nullable=False)
    monthly_treatment_volume: Mapped[str] = mapped_column(String(32), nullable=False)
    specialization: Mapped[list[str]] = mapped_column(StringList, nullable=False)

    contact_frequency: Mapped[int] = mapped_column(Integer, nullable=False)
    problematic_treatments: Mapped[list[str]] = mapped_column(StringList, nullable=False)
    weekly_followup_time: Mapped[str] = mapped_column(String(64), nullable=False)
    communication_channels: Mapped[list[str]] = mapped_column(StringList, nullable=False)
    current_software: Mapped[str] = mapped_column(Text, nullable=False)
    workflow_satisfaction: Mapped[int] = mapped_column(Integer, nullable=False)

    delayed_complication_experience: Mapped[str] = mapped_column(
        String(32), nullable=False
    )
    problem_severity_score: Mapped[int] = mapped_column(Integer, nullable=False)
    biggest_challenge: Mapped[str] = mapped_column(Text, nullable=False)

    ai_interest_score: Mapped[int] = mapped_column(Integer, nullable=False)
    valuable_ai_features: Mapped[list[str]] = mapped_column(StringList, nullable=False)
    concerns: Mapped[list[str]] = mapped_column(StringList, nullable=False)

    monthly_price_expectation: Mapped[str] = mapped_column(String(64), nullable=False)
    pilot_interest: Mapped[list[str]] = mapped_column(StringList, nullable=False)

    consent_contact: Mapped[bool] = mapped_column(Boolean, nullable=False)
    consent_research: Mapped[bool] = mapped_column(Boolean, nullable=False)
    privacy_accepted: Mapped[bool] = mapped_column(Boolean, nullable=False)

    ip_address: Mapped[str] = mapped_column(String(64), nullable=False)
    user_agent: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )


class DentalAiSurveySubmission(Base):
    __tablename__ = "dental_ai_survey_submissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    clinic_name: Mapped[str] = mapped_column(String(160), nullable=False)
    contact_name: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    phone: Mapped[str | None] = mapped_column(String(80), nullable=True)
    role: Mapped[str | None] = mapped_column(String(120), nullable=True)
    clinic_size: Mapped[str | None] = mapped_column(String(80), nullable=True)
    current_software: Mapped[str | None] = mapped_column(String(180), nullable=True)
    ai_priority: Mapped[str] = mapped_column(String(120), nullable=False)
    timeline: Mapped[str | None] = mapped_column(String(80), nullable=True)
    survey_answers: Mapped[dict] = mapped_column(JSON, nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
