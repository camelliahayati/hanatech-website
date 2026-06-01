from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import and_, func, select
from sqlalchemy.orm import Session

from .config import Settings
from .models import DentalSurveyResponse
from .schemas import SurveySubmissionIn


def is_honeypot_triggered(honeypot_value: str | None) -> bool:
    return bool((honeypot_value or "").strip())


def is_rate_limited(db: Session, ip_address: str, settings: Settings) -> bool:
    window_start = datetime.now(timezone.utc) - timedelta(
        minutes=settings.rate_limit_window_minutes
    )
    stmt = (
        select(func.count(DentalSurveyResponse.id))
        .where(DentalSurveyResponse.ip_address == ip_address)
        .where(DentalSurveyResponse.created_at >= window_start)
    )
    count = db.scalar(stmt) or 0
    return count >= settings.rate_limit_max_submissions


def is_duplicate_submission(
    db: Session,
    payload: SurveySubmissionIn,
    settings: Settings,
) -> bool:
    window_start = datetime.now(timezone.utc) - timedelta(
        hours=settings.duplicate_window_hours
    )
    stmt = (
        select(DentalSurveyResponse.id)
        .where(
            and_(
                DentalSurveyResponse.email == payload.email,
                DentalSurveyResponse.clinic_name == payload.clinic_name,
                DentalSurveyResponse.role == payload.role,
                DentalSurveyResponse.created_at >= window_start,
            )
        )
        .limit(1)
    )
    return db.scalar(stmt) is not None

