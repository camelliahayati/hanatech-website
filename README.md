# HanaTech Website

Production-ready company website for HanaTech, built with React, Vite, and Tailwind CSS.

This repository also includes a Python/FastAPI healthcare survey backend module for the HanaTech Dental AI Validation Platform under [`backend/`](./backend/README.md).

## Tech Stack

- React 19
- Vite 6
- Tailwind CSS 3
- ESLint 9

## Pages

- Home
- Services
- About
- Contact
- Dental AI Survey start page: `/dental-ai-survey`
- Dental AI Survey form: `/dental-ai-survey/start`
- Dental AI Survey thank-you: `/dental-ai-survey/thank-you`
- Survey admin login: `/admin/login`
- Survey admin dashboard: `/admin/dental-survey`

## Brand Assets

Logo and favicon assets are stored in:

- `public/assets/hanatech-logo.png`
- `public/assets/hanatech-logo-wordmark.png`
- `public/assets/hanatech-logo-mark.png`
- `public/assets/favicon-16x16.png`
- `public/assets/favicon-32x32.png`
- `public/assets/apple-touch-icon.png`
- `public/assets/android-chrome-192x192.png`
- `public/assets/android-chrome-512x512.png`

## Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

For local survey API testing, run the FastAPI backend in another terminal:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` with a secure `SECRET_KEY` and bcrypt `ADMIN_PASSWORD_HASH`, then run:

```bash
alembic -c alembic.ini upgrade head
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

The Vite dev server proxies `/api` to `http://127.0.0.1:8000`.

## Quality Checks

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Backend health check:

```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

Then open:

- `http://127.0.0.1:5173/dental-ai-survey`
- `http://127.0.0.1:5173/dental-ai-survey/start`
- `http://127.0.0.1:5173/dental-ai-survey/thank-you`
- `http://127.0.0.1:5173/admin/login`
- `http://127.0.0.1:5173/admin/dental-survey`
- `http://127.0.0.1:8000/api/health`

## Path-Based Deployment

This project is prepared for deployment under the existing `hanatech.se` domain, without subdomains:

- `https://hanatech.se/dental-ai-survey`
- `https://hanatech.se/dental-ai-survey/start`
- `https://hanatech.se/dental-ai-survey/thank-you`
- `https://hanatech.se/admin/login`
- `https://hanatech.se/admin/dental-survey`
- `https://hanatech.se/api`

Production frontend environment:

```bash
VITE_API_BASE_URL=
```

Leaving `VITE_API_BASE_URL` empty makes the frontend call same-origin `/api/...`, which is the desired path-based deployment shape for `hanatech.se`.

Production backend environment:

```bash
DATABASE_URL=postgresql+psycopg://user:password@host:5432/hanatech
SECRET_KEY=generate_a_new_long_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=generate_a_bcrypt_hash
FRONTEND_ORIGIN=https://hanatech.se
SECURE_COOKIES=true
SESSION_COOKIE_NAME=hanatech_session
SESSION_MAX_AGE_SECONDS=28800
RATE_LIMIT_WINDOW_MINUTES=10
RATE_LIMIT_MAX_SUBMISSIONS=3
DUPLICATE_WINDOW_HOURS=24
```

The host or reverse proxy should route:

```text
/api/* -> FastAPI backend
/*      -> Vite frontend build
```

## SEO and Performance Notes

- Semantic page structure with sectioned content
- Open Graph and Twitter social metadata
- Canonical URL and robots directives
- Organization JSON-LD structured data
- App manifest and favicon pack
- Optimized brand asset sizing for faster paint and lower layout shift

## Project Structure

```text
.
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Publish to GitHub

1. Create an empty repository on GitHub (no README, no license, no `.gitignore`).
2. Add your remote:

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
```

3. Push `main`:

```bash
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
