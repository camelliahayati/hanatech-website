# HanaTech Dental AI Validation Platform (Backend)

Production-ready FastAPI survey module for validating HanaTech's AI-powered post-treatment dental monitoring product.

## Tech Stack

- Python + FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Alembic migrations
- Jinja2 templates

## Features

- Public survey page: `/dental-ai-survey`
- Thank-you page: `/dental-ai-survey/thank-you`
- Protected admin dashboard: `/admin/dental-survey`
- Admin response detail page
- Filtered CSV export
- Server-side validation with Pydantic
- CSRF protection
- Session-based admin authentication
- Honeypot + rate limiting + duplicate submission detection
- Analytics cards:
  - Total responses
  - Responses by country
  - Pilot interest rate
  - Average AI interest score
  - Average problem severity score
  - Top requested AI features
  - Most common concerns

## Environment Variables

Set these before running:

```bash
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/hanatech
SECRET_KEY=your_random_long_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

Optional:

```bash
SECURE_COOKIES=true
SESSION_COOKIE_NAME=hanatech_session
SESSION_MAX_AGE_SECONDS=28800
RATE_LIMIT_WINDOW_MINUTES=10
RATE_LIMIT_MAX_SUBMISSIONS=3
DUPLICATE_WINDOW_HOURS=24
```

## Install & Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run migrations:

```bash
alembic -c alembic.ini upgrade head
```

Start app:

```bash
uvicorn backend.app.main:app --reload
```

## Admin Password Hash

Generate bcrypt hash:

```python
from passlib.context import CryptContext
print(CryptContext(schemes=["bcrypt"], deprecated="auto").hash("your_password"))
```

## Notes

- Survey requires privacy policy acceptance.
- Admin routes redirect unauthorized users to `/admin/login`.
- CSV export filename format: `dental_survey_export_YYYY_MM_DD.csv`.

