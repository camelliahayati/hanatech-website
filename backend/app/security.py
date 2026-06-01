from __future__ import annotations

import hmac
import secrets
from typing import Any

from fastapi import HTTPException, Request, status
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

CSRF_SESSION_KEY = "csrf_token"
ADMIN_SESSION_KEY = "admin_authenticated"
ADMIN_USER_SESSION_KEY = "admin_username"


def verify_password(plain_password: str, password_hash: str) -> bool:
    try:
        return pwd_context.verify(plain_password, password_hash)
    except ValueError:
        return False


def ensure_csrf_token(request: Request) -> str:
    token = request.session.get(CSRF_SESSION_KEY)
    if not token:
        token = secrets.token_urlsafe(32)
        request.session[CSRF_SESSION_KEY] = token
    return token


def verify_csrf_token(request: Request, token: str | None) -> None:
    session_token = request.session.get(CSRF_SESSION_KEY)
    if not session_token or not token or not hmac.compare_digest(session_token, token):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="CSRF validation failed.",
        )


def mark_admin_authenticated(request: Request, username: str) -> None:
    request.session[ADMIN_SESSION_KEY] = True
    request.session[ADMIN_USER_SESSION_KEY] = username


def clear_admin_session(request: Request) -> None:
    request.session.pop(ADMIN_SESSION_KEY, None)
    request.session.pop(ADMIN_USER_SESSION_KEY, None)


def require_admin(request: Request) -> None:
    if request.session.get(ADMIN_SESSION_KEY) is not True:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")


def get_admin_username(request: Request) -> str | None:
    username = request.session.get(ADMIN_USER_SESSION_KEY)
    return username if isinstance(username, str) else None


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        first = forwarded.split(",")[0].strip()
        if first:
            return first
    return request.client.host if request.client else "unknown"


def sanitize_header_value(value: Any, max_length: int = 2048) -> str:
    text = str(value or "").replace("\x00", "")
    return text[:max_length]

