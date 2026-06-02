"""Create dental_ai_survey_submissions table

Revision ID: 20260602_0002
Revises: 20260601_0001
Create Date: 2026-06-02 00:00:00
"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa

revision: str = "20260602_0002"
down_revision: str | None = "20260601_0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "dental_ai_survey_submissions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column("clinic_name", sa.String(length=160), nullable=False),
        sa.Column("contact_name", sa.String(length=160), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=80), nullable=True),
        sa.Column("role", sa.String(length=120), nullable=True),
        sa.Column("clinic_size", sa.String(length=80), nullable=True),
        sa.Column("current_software", sa.String(length=180), nullable=True),
        sa.Column("ai_priority", sa.String(length=120), nullable=False),
        sa.Column("timeline", sa.String(length=80), nullable=True),
        sa.Column("survey_answers", sa.JSON(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_dental_ai_survey_submissions_email",
        "dental_ai_survey_submissions",
        ["email"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_dental_ai_survey_submissions_email",
        table_name="dental_ai_survey_submissions",
    )
    op.drop_table("dental_ai_survey_submissions")
