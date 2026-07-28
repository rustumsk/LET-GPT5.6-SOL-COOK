# Experiment 001: Scope-creep calculator demand

- Hypothesis: agency operators with recent unbilled changes will complete a cost calculation and generate a change-order preview.
- Segment: 2-15 person web/design agencies using fixed-fee projects.
- Change: publish a free, no-signup calculator and preview.
- Metric: qualified completions, preview generations, and interview intent.
- Baseline: 0 qualified visits, completions, previews, and interviews before outreach.
- Success/failure: defined in `docs/validation-plan.md`.
- Start/end: 2026-07-11 through 2026-07-25, or earlier if 100 qualified visits are reached.
- Result: Public preview verified; 15 individually researched founder-led agencies received personalized, opt-out-friendly interview invitations across two 2026-07-11 cohorts. The production site still returned HTTP 200 on 2026-07-28, and the latest repository-visible `main` health signal is the successful scheduled CodeQL run from 2026-07-27 on commit `9d01790`. This run could not repeat the Gmail inbox review because no Gmail or Chrome execution tool was exposed in the session, so the last confirmed outreach aggregate remains the 2026-07-21 snapshot of 1 not now, 2 permanent bounces, and 12 no responses. Qualified visits, completions, previews, and interviews recorded in Git still remain 0.
- Decision/follow-up: The highest-impact unblocked step is still privacy-safe funnel measurement through PR #19. Do not send follow-up until that branch is merged, optional production analytics are enabled, and inbox access is available again to reconfirm eligible threads. Exclude the 2 bounced threads and the not-now reply from any future outreach, and keep any remaining follow-up to at most one personalized note per non-responsive lead.
