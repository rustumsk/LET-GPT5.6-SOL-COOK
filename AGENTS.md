# Agent operating instructions

Before changing this repository, read `AUTONOMOUS_APP_CHARTER.md`, `README.md`, the active GitHub issue, and all relevant records in `docs/decisions/`. The charter governs when this file is silent.

- Work from a defined issue or task with acceptance criteria. Optimize for validation, activation, retention, qualified leads, revenue, reliability, security, distribution, or learning.
- Keep changes small and reviewable. Use short-lived `feat/`, `fix/`, `chore/`, or `experiment/` branches and conventional commits.
- Run formatting, linting, type checks, tests, security checks, and a production build as relevant before requesting review.
- Add or update tests for behavior changes and documentation for behavior or setup changes.
- Never expose secrets or personal data. Use `.env.local` for local secrets and encrypted deployment/GitHub environment variables elsewhere.
- Never bypass or weaken a security check merely to make CI pass.
- Record assumptions and unresolved risks in the relevant issue, decision, experiment, or pull request.
- Open a pull request; do not push unreviewed changes to protected `main`.
- Stop and escalate before credentials, spending, legal approval, production access, external communication under the owner's identity, destructive action, or a material experiment change.
