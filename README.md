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
