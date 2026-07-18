# Deployment and rollback

Validation target: preview deployment on a provider subdomain. CI must pass first. Configure no production secrets for the static asset.

After deployment, run `npm run smoke -- https://<preview-host>` (or set `SMOKE_BASE_URL`) and manually verify the calculator, preview, keyboard navigation, and mobile viewport. The automated smoke test checks the landing-page brand marker and `/health.json`.

If privacy-safe analytics is being enabled, set `NEXT_PUBLIC_ANALYTICS_MODE=plausible` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel's encrypted environment variables, then verify the `/privacy` page is linked from the footer and that browsers sending Do Not Track or Global Privacy Control do not emit funnel events.

Roll back by promoting the previous known-good immutable deployment; stop promotion when smoke checks fail.
