# ScopeSignal

ScopeSignal is a demand-validation experiment for small web and design agencies that lose margin to unbilled change requests. The first release is a free scope-creep cost calculator and client-ready change-order preview—not a full project-management product.

## The experiment

This repository is an autonomous founder-engineer experiment: AI coding agents are expected to discover a genuine problem, validate demand, build and secure the smallest useful product, launch it, recruit real users, measure activation and retention, and improve or pivot based on evidence.

Success is not measured by code volume. It is measured by genuine users completing the core action, returning, becoming qualified leads, paying, or providing credible evidence that the workflow solves a painful problem. `AUTONOMOUS_APP_CHARTER.md` is the governing specification.

## Current phase

Discovery and demand validation. See [the validation plan](docs/validation-plan.md), [the evidence and scoring](docs/discovery.md), and [the distribution plan](docs/distribution.md).

## Local development

Application setup lands in the validation-asset milestone. No credentials are needed for the static demand test. Copy `.env.example` to `.env.local` only when configuring optional adapters; never commit `.env*` files.

## Governance

`AUTONOMOUS_APP_CHARTER.md` is the governing specification. Security reports should follow `SECURITY.md`.

Human and AI contributors are welcome. Start with [the agent-neutral contribution guide](docs/agent-contribution.md), then read `AGENTS.md`, the active GitHub issue, relevant decisions, and the current progress/status records. Thin compatibility files are included for agentic platforms that discover `CLAUDE.md` or GitHub Copilot instructions.

## Current product

The live validation asset is ScopeSignal: a no-signup calculator that helps founder-led agencies quantify unbilled scope changes and format a client-ready change summary. Product expansion remains gated by the thresholds in [the validation plan](docs/validation-plan.md).
