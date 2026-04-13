# rectrack

*A cozy little reconciliation tracker for CPAs who deserve better than Excel.*

Built for Jen — a CPA juggling ~65 clients, a growing pipeline, and an
assistant who shouldn't have to read her mind. rectrack replaces the
spreadsheet-and-sticky-notes workflow with a single, opinionated system
that knows what needs to happen next.

## What it does

- Tracks every client's reconciliation state in one place
- Handles multiple accounts per client (each with their own quirks)
- Coordinates handoffs between Jen and Katie via email notifications
- Keeps client questions organized — pending vs. resolved, never lost
- Remembers *how* to access each weird little bank portal so you don't have to

## Status

Pre-contract. Demo-in-progress. The ADR in [docs/](docs/) is the north star.

## Stack

React (Vite) · AWS Lambda + API Gateway · Neon Postgres · S3 · SES
Fully serverless, scales to zero, costs roughly a coffee per month.

## Structure

```
rectrack/
├── docs/   ← architecture decisions live here
└── ...     ← everything else, coming soon
```

---

Made with care by [Sarah](https://github.com/lifeunsubscribe) ✦
