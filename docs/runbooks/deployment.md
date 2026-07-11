# Deployment and rollback

Validation target: preview deployment on a provider subdomain. CI must pass first. Configure no production secrets for the static asset.

After deployment, run `npm run smoke -- https://<preview-host>` (or set `SMOKE_BASE_URL`) and manually verify the calculator, preview, keyboard navigation, and mobile viewport. The automated smoke test checks the landing-page brand marker and `/health.json`.

Roll back by promoting the previous known-good immutable deployment; stop promotion when smoke checks fail.
