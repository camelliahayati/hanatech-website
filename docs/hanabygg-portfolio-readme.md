# Hana Bygg Portfolio — integration and release checklist

This feature is implemented in `src/pages/ByggPortfolio.jsx` and wired into the existing Hana Bygg `#projects` section. It does NOT add a second Projects section.

## Features
- Three legacy cards remain visible even if backend is unavailable
- Existing cards can acquire photos by matching stable `slug` values
- New published projects automatically appear in same grid
- Click cover or "View photos" to open a lightbox with thumbnails, Escape/arrow navigation
- Admin at `/admin/bygg-projects`: create, edit, publish/unpublish, upload multiple images, remove image association, delete records
- English / Swedish titles and descriptions
- All edits protected by database row-level security and approved admin membership

## Before enabling live uploads
1. Create a **dedicated** Supabase project for Hana Bygg (do not reuse HanaVoya or FocusMate AI data).
2. Run `docs/hanabygg-portfolio-setup.sql` in the project SQL editor.
3. Create an administrator under Authentication > Users, preferably with confirmed email.
4. Copy the auth user's UUID into the final SQL insert at the bottom of the setup file.
5. In Vercel project **hana-bygg**, set `VITE_BYGG_SUPABASE_URL` and `VITE_BYGG_SUPABASE_PUBLISHABLE_KEY` for Preview and Production. Publishable key only: never use a secret or service-role key in Vite.
6. Rebuild a preview deployment. Verify sign in, legacy-card photo attachment, creating a new project, unpublishing, gallery navigation, mobile layout, public cannot mutate data, and unauthorized authenticated accounts cannot write.
7. Check Supabase Security Advisor; run a review of uploaded photo content and permissions.
8. Promote a tested build only after approval.

## Known operational caveats
- Storage files removed from the editor are detached from galleries but not automatically deleted from the bucket. Periodically clean up orphaned files.
- Images must be under 8 MiB, and Storage bucket allows JPEG/PNG/WebP/AVIF. Image optimization is not implemented.
- The gallery lists published projects; images uploaded to the public bucket are technically accessible if someone knows the URL even before publication. Do not upload private/client-confidential photos.
- No live database, user accounts, or deployment to production have been provisioned by this branch.

## Existing slugs
- `residential-renovation`
- `dental-clinic-interiors`
- `wooden-doors-windows`

The frontend should continue to use the original site structure and original approved project copy. Do not present conceptual or unresolved Hellgate work as a completed project.
