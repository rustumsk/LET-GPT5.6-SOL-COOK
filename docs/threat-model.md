# Threat model

## Current asset

Public, static calculator with no accounts, uploads, database, AI, or server-side user input. Primary risks are dependency compromise, DOM injection, analytics overcollection, deceptive calculations, abuse of future contact forms, and supply-chain secrets exposure.

Controls: React escaping, numeric bounds, no raw HTML, lockfile, Dependabot, CodeQL, secret scan, restrictive future security headers, no third-party scripts by default, transparent formulas, no client names, and local-only calculations.

## Pre-user checklist

- Authentication/session, resource authorization, tenant isolation: not present; deny-by-default tests required before introduction.
- SQLi, CSRF, SSRF, webhooks, uploads: no relevant endpoints; validate and threat-model before adding.
- XSS: React text rendering only; prohibit unsanitized HTML.
- Rate limiting/cost exhaustion/email abuse: add per-IP/user limits and quotas before server endpoints.
- Credentials: encrypted provider stores only; redact logs.
- Dependencies: lock, audit, CodeQL, Dependabot.
- Backup/restore, export/deletion, admin access: required with persistent data; rehearse restore before launch.
- Prompt injection: no LLM; an ADR and adversarial tests are required if added.

Residual risk: calculator outputs are estimates. Copy must not imply accounting, legal, or contractual advice.

