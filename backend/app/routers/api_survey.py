from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import load_settings
from ..database import get_db
from ..models import DentalAiSurveySubmission
from ..schemas import (
    ApiAdminLoginIn,
    ApiAdminTokenOut,
    DentalAiSurveySubmissionIn,
    DentalAiSurveySubmissionOut,
)
from ..security import verify_password

settings = load_settings()
router = APIRouter(prefix="/api", tags=["dental-ai-survey-api"])
bearer_scheme = HTTPBearer()
JWT_ALGORITHM = "HS256"


def _create_access_token(subject: str) -> str:
    expires = datetime.now(timezone.utc) + timedelta(hours=8)
    payload = {"sub": subject, "exp": expires}
    return jwt.encode(payload, settings.secret_key, algorithm=JWT_ALGORITHM)


def _require_api_admin(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> str:
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.secret_key,
            algorithms=[JWT_ALGORITHM],
        )
        subject = payload.get("sub")
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token.",
        ) from exc

    if subject != settings.admin_username:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required.",
        )
    return subject


@router.get("/health")
def api_health() -> dict[str, str]:
    return {"status": "ok"}


@router.post(
    "/survey",
    response_model=DentalAiSurveySubmissionOut,
    status_code=status.HTTP_201_CREATED,
)
def create_survey_submission(
    payload: DentalAiSurveySubmissionIn,
    db: Session = Depends(get_db),
) -> DentalAiSurveySubmission:
    submission = DentalAiSurveySubmission(**payload.model_dump())
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.post("/admin/login", response_model=ApiAdminTokenOut)
def admin_login(payload: ApiAdminLoginIn) -> ApiAdminTokenOut:
    if payload.username != settings.admin_username or not verify_password(
        payload.password,
        settings.admin_password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials.",
        )
    return ApiAdminTokenOut(access_token=_create_access_token(settings.admin_username))


@router.get(
    "/admin/surveys",
    response_model=list[DentalAiSurveySubmissionOut],
)
def list_survey_submissions(
    _: str = Depends(_require_api_admin),
    db: Session = Depends(get_db),
) -> list[DentalAiSurveySubmission]:
    result = db.scalars(
        select(DentalAiSurveySubmission).order_by(
            DentalAiSurveySubmission.created_at.desc()
        )
    )
    return list(result)
