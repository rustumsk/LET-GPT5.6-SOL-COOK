# Deployment and rollback

Validation target: preview deployment on a provider subdomain. CI must pass first. Configure no production secrets for the static asset. Smoke-test the landing page, calculator, preview, keyboard navigation, mobile viewport, and health response. Roll back by promoting the previous known-good immutable deployment; stop promotion when smoke checks fail.
