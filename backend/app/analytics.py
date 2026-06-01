from __future__ import annotations

from collections.abc import Sequence
from typing import Any

from sqlalchemy import Select, desc, func, select
from sqlalchemy.orm import Session

from .models import DentalSurveyResponse
from .schemas import SurveyAnalyticsOut


def build_filters(
    *,
    country: str | None = None,
    role: str | None = None,
    clinic_type: str | None = None,
    pilot_interest: str | None = None,
) -> list[Any]:
    filters: list[Any] = []
    if country:
        filters.append(DentalSurveyResponse.country == country)
    if role:
        filters.append(DentalSurveyResponse.role == role)
    if clinic_type:
        filters.append(DentalSurveyResponse.clinic_type == clinic_type)
    if pilot_interest:
        filters.append(DentalSurveyResponse.pilot_interest.contains([pilot_interest]))
    return filters


def apply_filters(stmt: Select[Any], filters: Sequence[Any]) -> Select[Any]:
    for filter_expr in filters:
        stmt = stmt.where(filter_expr)
    return stmt


def compute_analytics(db: Session, filters: Sequence[Any]) -> SurveyAnalyticsOut:
    total_stmt = apply_filters(select(func.count(DentalSurveyResponse.id)), filters)
    total = int(db.scalar(total_stmt) or 0)

    country_stmt = apply_filters(
        select(
            DentalSurveyResponse.country,
            func.count(DentalSurveyResponse.id).label("count"),
        ).group_by(DentalSurveyResponse.country),
        filters,
    ).order_by(desc("count"), DentalSurveyResponse.country)
    responses_by_country = [(row[0], int(row[1])) for row in db.execute(country_stmt).all()]

    pilot_stmt = apply_filters(
        select(func.count(DentalSurveyResponse.id)).where(
            DentalSurveyResponse.pilot_interest.contains(["Pilot Project"])
        ),
        filters,
    )
    pilot_count = int(db.scalar(pilot_stmt) or 0)
    pilot_interest_rate = round((pilot_count / total) * 100, 2) if total else 0.0

    averages_stmt = apply_filters(
        select(
            func.avg(DentalSurveyResponse.ai_interest_score),
            func.avg(DentalSurveyResponse.problem_severity_score),
        ),
        filters,
    )
    avg_row = db.execute(averages_stmt).one()
    average_ai_interest_score = round(float(avg_row[0] or 0), 2)
    average_problem_severity_score = round(float(avg_row[1] or 0), 2)

    ai_features_subquery = apply_filters(
        select(func.unnest(DentalSurveyResponse.valuable_ai_features).label("feature")),
        filters,
    ).subquery()
    ai_features_stmt = (
        select(ai_features_subquery.c.feature, func.count().label("count"))
        .group_by(ai_features_subquery.c.feature)
        .order_by(desc("count"), ai_features_subquery.c.feature)
        .limit(8)
    )
    top_requested_ai_features = [
        (row[0], int(row[1])) for row in db.execute(ai_features_stmt).all()
    ]

    concerns_subquery = apply_filters(
        select(func.unnest(DentalSurveyResponse.concerns).label("concern")),
        filters,
    ).subquery()
    concerns_stmt = (
        select(concerns_subquery.c.concern, func.count().label("count"))
        .group_by(concerns_subquery.c.concern)
        .order_by(desc("count"), concerns_subquery.c.concern)
        .limit(8)
    )
    most_common_concerns = [(row[0], int(row[1])) for row in db.execute(concerns_stmt).all()]

    return SurveyAnalyticsOut(
        total_responses=total,
        responses_by_country=responses_by_country,
        pilot_interest_rate=pilot_interest_rate,
        average_ai_interest_score=average_ai_interest_score,
        average_problem_severity_score=average_problem_severity_score,
        top_requested_ai_features=top_requested_ai_features,
        most_common_concerns=most_common_concerns,
    )

