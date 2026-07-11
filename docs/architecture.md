# Architecture

## Validation asset

A static Next.js TypeScript application performs all calculations in the browser. No authentication, database, server-side personal-data processing, email provider, AI, or payments. Business rules live separately from UI and are unit tested. The deployment target is a free Vercel preview when owner access is provided.

## Evolution gate

Only after validation: modular-monolith server routes, PostgreSQL with migrations, managed authentication, first-party events, and vendor adapters. New infrastructure requires an ADR and data-map update.

