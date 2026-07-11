# Security policy

## Supported versions

Only the latest deployed version is supported during validation.

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private vulnerability reporting for this repository. If it is unavailable, contact the repository owner privately and include reproduction steps without credentials or real customer data.

## Secret handling

- Local: `.env.local`, excluded by `.gitignore`.
- CI: GitHub Actions encrypted secrets or OIDC; prefer environment-scoped secrets.
- Hosting: the provider's encrypted project environment variables.
- Use project-specific, least-privilege, revocable credentials. Never place secrets in code, logs, issues, screenshots, commits, or pull requests.
