# Metrics

Primary funnel: qualified landing view → calculator started → calculator completed → change-order preview generated → interview intent.

Production decision: keep `NEXT_PUBLIC_ANALYTICS_MODE=local` for development and use `plausible` as the approved no-cookie production path when privacy review is complete. Enabling requires `NEXT_PUBLIC_ANALYTICS_MODE=plausible` plus `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; until then, production remains measurement-off by default.

Track `landing_viewed`, `calculator_started`, `calculator_completed`, `preview_generated`, `copy_clicked`, `share_clicked`, and `interview_intent` through the vendor-neutral adapter. Public analytics must never include calculator inputs, change descriptions, client names, cookies, or query-string payloads. The adapter suppresses events when the browser sends Do Not Track or Global Privacy Control.

Decision metrics: qualified visitor-to-completion, completion-to-preview, qualified leads, recent real incidents, and interview acceptance. Page views alone do not count.
