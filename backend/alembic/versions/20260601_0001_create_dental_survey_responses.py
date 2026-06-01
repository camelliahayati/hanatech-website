"""Create dental_survey_responses table

Revision ID: 20260601_0001
Revises: None
Create Date: 2026-06-01 00:00:00
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "20260601_0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "dental_survey_responses",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=64), nullable=True),
        sa.Column("country", sa.String(length=128), nullable=False),
        sa.Column("city", sa.String(length=128), nullable=False),
        sa.Column("clinic_name", sa.String(length=255), nullable=False),
        sa.Column("role", sa.String(length=128), nullable=False),
        sa.Column("role_other", sa.String(length=255), nullable=True),
        sa.Column("clinic_type", sa.String(length=128), nullable=False),
        sa.Column("number_of_dentists", sa.String(length=32), nullable=False),
        sa.Column("monthly_treatment_volume", sa.String(length=32), nullable=False),
        sa.Column("specialization", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("contact_frequency", sa.Integer(), nullable=False),
        sa.Column(
            "problematic_treatments", postgresql.ARRAY(sa.Text()), nullable=False
        ),
        sa.Column("weekly_followup_time", sa.String(length=64), nullable=False),
        sa.Column(
            "communication_channels", postgresql.ARRAY(sa.Text()), nullable=False
        ),
        sa.Column("current_software", sa.Text(), nullable=False),
        sa.Column("workflow_satisfaction", sa.Integer(), nullable=False),
        sa.Column(
            "delayed_complication_experience", sa.String(length=32), nullable=False
        ),
        sa.Column("problem_severity_score", sa.Integer(), nullable=False),
        sa.Column("biggest_challenge", sa.Text(), nullable=False),
        sa.Column("ai_interest_score", sa.Integer(), nullable=False),
        sa.Column("valuable_ai_features", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("concerns", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("monthly_price_expectation", sa.String(length=64), nullable=False),
        sa.Column("pilot_interest", postgresql.ARRAY(sa.Text()), nullable=False),
        sa.Column("consent_contact", sa.Boolean(), nullable=False),
        sa.Column("consent_research", sa.Boolean(), nullable=False),
        sa.Column("privacy_accepted", sa.Boolean(), nullable=False),
        sa.Column("ip_address", sa.String(length=64), nullable=False),
        sa.Column("user_agent", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_dental_survey_created_at",
        "dental_survey_responses",
        ["created_at"],
        unique=False,
    )
    op.create_index(
        "ix_dental_survey_country",
        "dental_survey_responses",
        ["country"],
        unique=False,
    )
    op.create_index(
        "ix_dental_survey_role",
        "dental_survey_responses",
        ["role"],
        unique=False,
    )
    op.create_index(
        "ix_dental_survey_clinic_type",
        "dental_survey_responses",
        ["clinic_type"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_dental_survey_clinic_type", table_name="dental_survey_responses")
    op.drop_index("ix_dental_survey_role", table_name="dental_survey_responses")
    op.drop_index("ix_dental_survey_country", table_name="dental_survey_responses")
    op.drop_index("ix_dental_survey_created_at", table_name="dental_survey_responses")
    op.drop_table("dental_survey_responses")

