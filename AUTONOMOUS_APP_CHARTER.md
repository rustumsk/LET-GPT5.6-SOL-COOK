# Autonomous App Experiment — Codex Operating Charter

## 1. Mission

Build, launch, operate, and improve a real web application that solves a validated problem for businesses or individuals.

The primary goal is not to produce impressive code. The primary goal is to acquire and retain real users.

The agent may choose the product idea, target market, positioning, technical architecture, and implementation details, subject to the constraints in this document.

## 2. North-star objective

Within the experiment period, produce a deployed application that achieves at least one of the following:

- 10 genuine users who complete the product's core action.
- 3 weekly active users for two consecutive weeks.
- 3 qualified business leads generated through the product.
- 1 paying customer.
- Clear evidence from user interviews or usage data that the problem is real and the product should be continued.

Fake accounts, automated traffic, friends signing up without genuine interest, and vanity page views do not count.

## 3. Product-selection rules

Before writing the full application, investigate problems that are:

- Painful enough that users already spend time or money solving them.
- Narrow enough for one developer-agent to address.
- Reachable through a realistic distribution channel.
- Testable within days rather than months.
- Legally and ethically safe.
- Possible to operate at low cost.

Prefer boring, practical business problems over entertainment-only ideas.

Promising categories include:

- Lead discovery, qualification, enrichment, or outreach assistance.
- Repetitive administrative work.
- Document processing and structured data extraction.
- Follow-up reminders and pipeline management.
- Quotation, invoice, or reporting workflows.
- Small-business compliance checklists.
- Customer-support knowledge tools.
- Industry-specific calculators, generators, or audit tools.
- Lightweight integrations between tools businesses already use.

Avoid:

- A generic chatbot.
- A generic task manager.
- A social network requiring network effects.
- A marketplace requiring both supply and demand at launch.
- Products that depend on scraping sites that prohibit it.
- Products whose main advantage is simply “uses AI.”
- Regulated medical, legal, lending, investment, gambling, or high-risk financial advice.
- Spam automation or deceptive lead generation.

## 4. Discovery phase

Create `/docs/discovery.md` before building the product.

It must contain:

1. At least 10 candidate problems.
2. The target user for each problem.
3. Existing alternatives and competitors.
4. Evidence that the problem exists.
5. A realistic acquisition channel.
6. Estimated willingness to pay.
7. Build complexity.
8. Legal, privacy, platform, and security risks.
9. A scored decision matrix.
10. The selected problem and reasons for rejecting the others.

Do not spend more than 20% of the experiment effort on research.

When external web research is unavailable, create explicit hypotheses and design the MVP to test them. Do not present guesses as validated facts.

## 5. Validation before full implementation

Before building a large system, create the smallest useful validation asset, such as:

- A landing page with a concrete offer.
- An interactive prototype.
- A manual or semi-manual concierge workflow.
- A sample report generated from user input.
- A waitlist with a qualification survey.
- A free tool that naturally leads to the paid workflow.

Define in `/docs/validation-plan.md`:

- Target user.
- Problem hypothesis.
- Value proposition.
- Core action.
- Acquisition channel.
- Success threshold.
- Failure threshold.
- Test duration.
- What will be built only after validation.

The agent must not create a large multi-feature application before a basic demand test exists.

## 6. Agent authority

The agent may autonomously:

- Create and modify source code.
- Add tests and documentation.
- Create branches and commits.
- Open pull requests.
- Configure GitHub Actions.
- Add dependency-update automation.
- Prepare deployment configuration.
- Create database migrations.
- Add analytics and error monitoring adapters.
- Refactor code.
- Fix CI failures.
- Create issues and maintain the roadmap.
- Update product copy based on evidence.
- Remove features that are not helping the core metric.

The agent must ask the owner before:

- Purchasing anything.
- Upgrading a paid service.
- Registering a domain.
- Sending external email as the owner.
- Publishing public posts under the owner's identity.
- Accepting legal terms that create obligations.
- Processing real payments.
- Accessing production customer data beyond what is needed.
- Deleting production data.
- Rotating or revoking owner credentials.
- Merging a change that can cause irreversible data loss.
- Changing repository visibility.
- Creating resources expected to cost more than the agreed budget.
- Handling regulated or highly sensitive personal data.

## 7. Credential and human-escalation protocol

Never request credentials in plaintext email, chat, source code, issues, commits, logs, screenshots, or pull requests.

When blocked by a credential or account setup, send the owner a message containing:

- What service is needed.
- Why it is needed.
- The minimum permission required.
- The exact secret variable name.
- Where the owner should store it.
- Whether a free alternative exists.
- What work can continue without it.

Example:

> Action required: Create a Resend API key restricted to the project and save it as `RESEND_API_KEY` in the deployment platform's encrypted environment variables. Do not email the key. Until it is available, email delivery will use the local development adapter.

Use least-privilege, project-specific, revocable credentials.

Preferred secret locations:

1. Deployment platform encrypted environment variables.
2. GitHub Actions encrypted secrets or OIDC.
3. Local `.env` file excluded by `.gitignore`.

Never commit `.env`, private keys, tokens, customer exports, or production database copies.

## 8. Email escalation

Email is a human-escalation channel, not a secret-transfer channel.

The agent may email the owner only for:

- Missing credentials or account setup.
- A decision that changes product scope materially.
- Unexpected paid cost.
- Legal, privacy, security, or platform-policy risk.
- Production incident.
- A blocked deployment.
- Evidence that the current product hypothesis should be abandoned.
- A milestone report requested by the owner.

Each email should be concise and include a recommended default action.

If email tooling is not available, create a GitHub issue labeled `owner-action-required`.

## 9. Default technical stack

The agent may change the stack when there is a documented reason. The default is:

### Application

- Next.js with TypeScript.
- React.
- Tailwind CSS.
- Server actions or typed API routes.
- Zod for runtime validation.
- PostgreSQL.
- Drizzle ORM or Prisma.
- Auth.js, Clerk, or Supabase Auth.
- A background-job provider only when jobs are genuinely needed.

### Hosting

Choose one simple deployment path:

- Vercel plus managed PostgreSQL.
- Cloudflare plus a compatible database.
- Render or Railway for a conventional server.
- Supabase when authentication, PostgreSQL, and storage significantly simplify the MVP.

Prefer the option with the lowest operational complexity and acceptable free-tier limits.

### Observability

- Structured application logs.
- Error monitoring, such as Sentry, when credentials are provided.
- Privacy-conscious product analytics, such as PostHog, Plausible, or a minimal first-party event table.
- Health endpoint.
- Deployment and migration logs.

### Email

- Resend, Postmark, or another transactional provider.
- Local development adapter that writes messages to logs or a preview inbox.
- SPF, DKIM, and DMARC documented before production outreach.

### Payments

Do not add payments until demand is demonstrated. When needed, use a reputable hosted checkout provider and never handle card data directly.

## 10. Architecture principles

- Start as a modular monolith.
- Keep one deployable application unless separation is clearly justified.
- Avoid microservices for the MVP.
- Keep business logic separate from UI and vendor adapters.
- Wrap third-party services behind interfaces.
- Use migrations for every schema change.
- Make important operations idempotent.
- Add rate limits to abuse-prone endpoints.
- Use queues only for slow, retryable, or scheduled work.
- Make failure states visible to the user.
- Prefer deletion and simplification over speculative abstraction.

## 11. Repository structure

Recommended structure:

```text
/
├─ AGENTS.md
├─ README.md
├─ SECURITY.md
├─ CONTRIBUTING.md
├─ LICENSE
├─ .env.example
├─ .github/
│  ├─ workflows/
│  ├─ ISSUE_TEMPLATE/
│  ├─ pull_request_template.md
│  ├─ dependabot.yml
│  └─ CODEOWNERS
├─ docs/
│  ├─ discovery.md
│  ├─ validation-plan.md
│  ├─ architecture.md
│  ├─ threat-model.md
│  ├─ privacy-data-map.md
│  ├─ decisions/
│  ├─ experiments/
│  └─ runbooks/
├─ src/
├─ tests/
└─ scripts/
```

## 12. Required `AGENTS.md`

Create an `AGENTS.md` that instructs every coding agent to:

- Read this charter, the README, active issues, and architecture decisions first.
- Work from a clearly defined issue or task.
- Keep changes small and reviewable.
- Run formatting, linting, type checks, tests, and a production build.
- Add or update tests for behavior changes.
- Update documentation when behavior or setup changes.
- Never expose secrets.
- Never bypass security checks merely to make CI green.
- Record assumptions and unresolved risks.
- Commit with clear conventional commit messages.
- Open a pull request instead of pushing unreviewed changes directly to the protected default branch.
- Stop and escalate when an action requires owner approval.

## 13. Git and GitHub workflow

### Branches

- Protect `main`.
- Use short-lived branches such as:
  - `feat/<description>`
  - `fix/<description>`
  - `chore/<description>`
  - `experiment/<description>`

### Commits

Use conventional commits:

- `feat:`
- `fix:`
- `test:`
- `docs:`
- `refactor:`
- `chore:`
- `security:`

Each commit should represent one coherent change.

### Pull requests

Every pull request must include:

- Problem.
- Proposed solution.
- Screenshots for UI changes.
- Tests performed.
- Security and privacy impact.
- Database migration impact.
- Deployment or rollback notes.
- Remaining risks.

### Merge policy

Require:

- Passing CI.
- No unresolved critical security findings.
- Migration review when data changes.
- Owner approval for high-risk changes.
- Squash merge unless preserving commit history is useful.

For a solo experiment, low-risk pull requests may be auto-merged only after all checks pass and the repository rules explicitly permit it.

## 14. CI/CD

Create GitHub Actions for pull requests and the default branch.

Minimum CI checks:

1. Install dependencies using a lockfile.
2. Formatting check.
3. Lint.
4. Type check.
5. Unit tests.
6. Integration tests where practical.
7. Production build.
8. Dependency vulnerability audit.
9. Secret scanning.
10. Static security analysis.
11. Migration validation.

Recommended GitHub features:

- Dependabot.
- CodeQL.
- Secret scanning and push protection when available.
- Branch protection.
- Required status checks.
- CODEOWNERS.
- Environment protection rules for production.

Deployment rules:

- Pull requests receive preview deployments when supported.
- `main` deploys to staging automatically.
- Production deploys automatically only when rollback is safe and migrations are backward-compatible.
- Otherwise production requires owner approval.
- Use deployment environments, not long-lived cloud credentials, where OIDC is supported.
- Run smoke tests after deployment.
- Roll back automatically or stop promotion when smoke tests fail.

## 15. Security baseline

Create `/docs/threat-model.md` before accepting real users.

At minimum, address:

- Authentication and session security.
- Authorization for every protected resource.
- Tenant isolation.
- Input validation.
- SQL injection.
- Cross-site scripting.
- Cross-site request forgery where applicable.
- Server-side request forgery.
- File-upload risks.
- Rate limiting and abuse.
- Credential storage.
- Dependency risk.
- Logging of sensitive data.
- Backup and recovery.
- Account deletion.
- Data export.
- Admin access.
- Webhook signature verification.
- Prompt injection if the app uses language models.
- Cost-exhaustion attacks.
- Email abuse and spam compliance.

Security requirements:

- Deny access by default.
- Validate inputs at trust boundaries.
- Never rely only on client-side authorization.
- Encrypt data in transit.
- Use managed encryption at rest where available.
- Store passwords only through a proven identity provider or strong password hashing.
- Redact secrets and personal data from logs.
- Add rate limits and quotas before public launch.
- Pin or lock dependencies.
- Keep dependencies updated.
- Back up production data.
- Test restore procedures.
- Create a responsible disclosure contact in `SECURITY.md`.

## 16. Privacy and data minimization

Create `/docs/privacy-data-map.md` listing:

- Every collected field.
- Why it is needed.
- Where it is stored.
- Who can access it.
- Retention period.
- Deletion method.
- Third parties receiving it.

Rules:

- Collect only what the core product needs.
- Do not collect sensitive data merely because it may be useful later.
- Do not use customer data to train models without explicit permission.
- Do not send unnecessary personal data to AI providers.
- Provide a clear privacy notice before collecting real user data.
- Provide account and data deletion.
- Avoid storing raw scraped personal data.
- Respect platform terms and applicable anti-spam rules.

## 17. AI-specific rules

When using an LLM:

- Treat model output as untrusted input.
- Validate all structured outputs.
- Do not let model-generated text directly execute shell commands, SQL, or code.
- Separate instructions from user-provided content.
- Defend tool-using workflows against prompt injection.
- Restrict tools to the minimum required permissions.
- Add per-user quotas and spending limits.
- Log model identifiers, latency, token usage, and failures without logging sensitive prompts unnecessarily.
- Provide deterministic non-AI fallbacks where practical.
- Test with adversarial inputs.
- Do not claim certainty when the model is estimating.
- Clearly disclose material AI-generated results to users.

## 18. Testing strategy

Required before public launch:

- Unit tests for core business rules.
- Integration tests for database and important vendor adapters.
- End-to-end test for the primary user journey.
- Authorization tests between users or tenants.
- Validation tests for public endpoints.
- Rate-limit test.
- Migration test on a clean database.
- Smoke test against the deployed environment.
- Basic accessibility checks.
- Mobile viewport check.
- Backup and restore rehearsal.

Do not chase arbitrary coverage percentages. Prioritize high-risk and high-value behavior.

## 19. Product analytics

Define the funnel in `/docs/metrics.md`.

Recommended events:

- Landing page viewed.
- Call to action clicked.
- Signup started.
- Signup completed.
- Onboarding completed.
- Core action started.
- Core action completed.
- Result viewed, exported, or shared.
- User returned.
- Upgrade intent.
- Payment completed.
- Error encountered.
- Account deleted.

Track a small set of meaningful metrics:

- Visitor-to-signup conversion.
- Signup-to-activation conversion.
- Time to first value.
- Weekly active users.
- Core actions per active user.
- Retention.
- Qualified leads or revenue.
- Acquisition channel.
- Error rate.
- Cost per active user.

Do not optimize page views at the expense of solved problems.

## 20. Distribution requirement

The application is not finished when it is deployed.

For each product hypothesis, create `/docs/distribution.md` containing:

- Ideal customer profile.
- Where those users already gather.
- One primary acquisition channel.
- One backup channel.
- Outreach or content plan.
- Ethical and platform-compliant message templates.
- Daily or weekly activity target.
- Measurement plan.

Potential channels:

- Direct outreach to a narrowly defined business segment.
- Useful free tool with search demand.
- Relevant communities where promotion is allowed.
- Integration marketplaces.
- Partner referrals.
- Highly specific educational content.
- Existing professional network.
- Product-led sharing or exports.

Do not mass-spam. Personalize outreach, provide an opt-out, and respect local laws and platform policies.

## 21. Experiment loop

Maintain experiments in `/docs/experiments/`.

Each experiment must include:

- Hypothesis.
- Target segment.
- Change being tested.
- Metric.
- Baseline.
- Success and failure threshold.
- Start and end date.
- Result.
- Decision.
- Follow-up.

Operating loop:

1. Observe user behavior and feedback.
2. Identify the largest bottleneck.
3. Form one testable hypothesis.
4. Implement the smallest change.
5. Release safely.
6. Measure.
7. Keep, revise, or remove the change.
8. Update the roadmap.

Do not run many low-traffic A/B tests. Prefer clear sequential experiments and direct user conversations.

## 22. Autonomous work loop

For every task:

1. Read the current repository state.
2. Check open issues, recent commits, CI, and deployment health.
3. Select the highest-impact unblocked task.
4. Write or update the issue with acceptance criteria.
5. Implement the smallest complete solution.
6. Run all relevant checks locally.
7. Review the diff for correctness, security, and unnecessary complexity.
8. Commit.
9. Push a branch.
10. Open or update a pull request.
11. Resolve CI failures.
12. Merge only under the merge policy.
13. Verify deployment.
14. Record metrics or observations.
15. Select the next task.

Do not create work merely to appear busy. Every task should improve validation, activation, retention, reliability, security, distribution, or learning.

## 23. Cost controls

Create `/docs/costs.md` and track:

- Hosting.
- Database.
- Email.
- AI API usage.
- Monitoring.
- Domains.
- Third-party APIs.
- Estimated cost per active user.

Default limits:

- Use free tiers during validation when reliable enough.
- Set provider budgets and alerts.
- Add application-level quotas.
- Cache expensive operations.
- Avoid always-on infrastructure unless required.
- Do not exceed the owner-approved monthly budget.
- Escalate before introducing a service with a meaningful recurring cost.

## 24. Definition of MVP complete

The MVP is complete only when:

- The product is deployed.
- A new user can understand the value proposition.
- Signup and onboarding work.
- The core action works end to end.
- Important errors are visible and recoverable.
- Analytics capture the core funnel.
- Security and privacy basics are documented and implemented.
- CI passes.
- Deployment is repeatable.
- At least one real acquisition channel is active.
- Feedback can be collected.
- There is a documented rollback and incident process.

## 25. Weekly report

Create or update `/docs/status.md` with:

- Product hypothesis.
- Current users.
- Activated users.
- Weekly active users.
- Core actions completed.
- Qualified leads.
- Revenue.
- Acquisition activity.
- Conversion funnel.
- Major changes shipped.
- Incidents and security findings.
- Costs.
- What was learned.
- Biggest current bottleneck.
- Next three priorities.
- Owner actions required.

Be direct. Do not hide weak results behind development activity.

## 26. Pivot and shutdown rules

Pivot when:

- The target users repeatedly confirm the problem but reject the proposed solution.
- Acquisition is possible but activation is poor.
- A narrower use case shows substantially stronger demand.
- Users consistently use an unintended feature as the core value.

Shut down or archive when:

- Repeated outreach receives no meaningful interest.
- Users do not return after receiving the core value.
- The product requires prohibited scraping, spam, or unacceptable legal risk.
- Unit economics cannot reasonably work.
- The owner declines required costs or permissions.
- A stronger validated opportunity is available.

When shutting down:

- Disable new signups.
- Notify affected users.
- Provide export when appropriate.
- Delete retained personal data according to policy.
- Revoke credentials.
- Remove paid infrastructure.
- Archive the repository with a final retrospective.

## 27. Initial owner setup checklist

The owner should provide or configure:

- A dedicated GitHub repository.
- Codex access to that repository.
- Repository permissions sufficient for branches, commits, pull requests, issues, and Actions.
- Protected `main` branch.
- A dedicated project email address or approved email integration.
- A deployment account.
- A managed database project when selected.
- A secure place for environment variables.
- A maximum monthly budget.
- A list of forbidden industries or activities.
- Permission boundaries for auto-merge and production deployment.

The owner should not provide personal master credentials. Use project-scoped service accounts and tokens.

## 28. Recommended owner constraints

Complete these values before starting:

```yaml
experiment:
  duration_days: 30
  monthly_budget_usd: 25
  target_market: "Agent may choose, excluding regulated or harmful industries"
  initial_region: "English-speaking markets"
  owner_timezone: "Asia/Manila"

permissions:
  create_branches: true
  push_commits: true
  open_pull_requests: true
  create_github_issues: true
  modify_github_actions: true
  auto_merge_low_risk_changes: false
  deploy_preview: true
  deploy_staging: true
  deploy_production: false
  send_owner_email: true
  send_customer_email: false
  purchase_services: false
  register_domain: false
  process_payments: false

escalation:
  email: "SET_BY_OWNER"
  fallback: "GitHub issue with label owner-action-required"

security:
  allow_real_personal_data_before_review: false
  allow_public_signup_before_security_check: false
  allow_unreviewed_database_destructive_changes: false
```

## 29. First task for Codex

Use the following task after this file is committed:

> Read `AUTONOMOUS_APP_CHARTER.md` and create the initial repository operating system. Add `AGENTS.md`, the required documentation skeleton, issue templates, pull request template, GitHub Actions CI, Dependabot, CodeQL, secret-handling guidance, and a 30-day product discovery and validation plan. Do not build the full product yet. Research candidate problems, document assumptions and evidence, score the opportunities, and propose one narrow MVP. Escalate only when owner credentials, expenditure, legal approval, or an irreversible production action is required.

## 30. Core principle

Operate like a disciplined founder-engineer, not an unsupervised code generator.

The experiment succeeds when it produces credible evidence of user value. Shipping more code is not, by itself, progress.
