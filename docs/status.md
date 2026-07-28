# Weekly status - 2026-07-28

- **Hypothesis:** Small agencies will use a fast calculator/change-order preview to recover unbilled scope.
- **Users / activated / WAU / core actions / leads / revenue:** 0 / 0 / 0 / 0 / 0 / $0 immediately after outreach.
- **Acquisition:** Production validation asset is live; 15 personalized founder-led agency interview invitations were sent on 2026-07-11 in two measured cohorts, with no bulk list or tracking. This run could not repeat the Gmail inbox review because no Gmail or Chrome execution tool was exposed in the session, so the last confirmed aggregate remains the 2026-07-21 snapshot of 1 not now, 2 bounces, and 12 no responses.
- **Funnel:** No production analytics data yet. The privacy-safe funnel work in PR #19 remains the highest-impact unblocked change; this run also patched newly disclosed audit findings on that branch so it can return to a mergeable state once GitHub finishes rerunning checks.
- **Shipped:** No new production change was merged in this run. The active funnel branch now includes a targeted dependency/security refresh (`next` 16.2.12 plus audited transitive overrides) alongside the July 28 operating-record update.
- **Incidents/security findings:** None. Public signup and personal-data collection remain disabled.
- **Costs:** $0.
- **Learning:** The live site still responds over HTTPS, and the latest repository-visible run on `main` was a successful scheduled CodeQL scan on 2026-07-27. A new audit-only CI regression surfaced on PR #19 during this run and was cleared locally with a targeted dependency patch instead of a broad toolchain upgrade.
- **Bottleneck:** There is still no validated user behavior. The immediate constraint is collecting privacy-safe funnel evidence while inbox access for reply classification is unavailable in this run and production analytics remain disabled.
- **Next priorities:** Let GitHub rerun and pass PR #19 after the dependency patch; optionally set `NEXT_PUBLIC_ANALYTICS_MODE=plausible` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel; restore a compliant inbox-review path before any one-time follow-up to the 12 eligible non-responsive leads.
- **Owner actions required:** Optional only: set `NEXT_PUBLIC_ANALYTICS_MODE=plausible` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in Vercel to begin aggregate funnel measurement.

Production: <https://let-gpt-5-6-sol-cook.vercel.app>. The site returned HTTP 200 on 2026-07-28. The latest repository-visible `main` run is the successful scheduled CodeQL scan from 2026-07-27 on commit `9d01790`; PR #19 required a same-day audit fix before returning to review readiness, while older open failures remain on Dependabot PRs #20 and #21.
