from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str
    database_url: str
    secret_key: str
    admin_username: str
    admin_password_hash: str
    session_cookie_name: str
    session_max_age_seconds: int
    secure_cookies: bool
    rate_limit_window_minutes: int
    rate_limit_max_submissions: int
    duplicate_window_hours: int


def _get_env(name: str, *, default: str | None = None) -> str:
    value = os.getenv(name, default)
    if value is None or not value.strip():
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def load_settings() -> Settings:
    secure_by_default = os.getenv("SECURE_COOKIES", "true").lower() in {
        "1",
        "true",
        "yes",
        "on",
    }
    return Settings(
        app_name="HanaTech Dental AI Validation Platform",
        database_url=_get_env("DATABASE_URL"),
        secret_key=_get_env("SECRET_KEY"),
        admin_username=_get_env("ADMIN_USERNAME"),
        admin_password_hash=_get_env("ADMIN_PASSWORD_HASH"),
        session_cookie_name=os.getenv("SESSION_COOKIE_NAME", "hanatech_session"),
        session_max_age_seconds=int(os.getenv("SESSION_MAX_AGE_SECONDS", "28800")),
        secure_cookies=secure_by_default,
        rate_limit_window_minutes=int(os.getenv("RATE_LIMIT_WINDOW_MINUTES", "10")),
        rate_limit_max_submissions=int(os.getenv("RATE_LIMIT_MAX_SUBMISSIONS", "3")),
        duplicate_window_hours=int(os.getenv("DUPLICATE_WINDOW_HOURS", "24")),
    )

