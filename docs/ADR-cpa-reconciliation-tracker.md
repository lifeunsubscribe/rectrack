# ADR: CPA Reconciliation Workflow Tracker
**Project codename:** `rectrack` (working title)
**Author:** Sarah (contractor)
**Client:** Jen (CPA, tax prep business owner)
**Date:** 2026-04-12
**Status:** Draft — pending contract execution

---

## 1. Context & Problem Statement

Jen is a CPA who manages bookkeeping and tax reconciliation for approximately 65 clients (count is dynamic). She and one assistant (Katie) coordinate reconciliation work across multiple bank accounts per client on a monthly or quarterly billing cycle. She has previously used paid off-the-shelf software to track this workflow but it has never successfully adapted to her specific pipeline, requiring manual workarounds and Excel fallbacks.

Core pain points:
- No single source of truth for where each client stands in the reconciliation pipeline
- Multiple account types per client with different access methods and close dates
- Coordinating handoffs between Jen and Katie is entirely manual
- Conditions logic for what needs to happen at each step forces constant cognitive overhead
- No structured way to track pending client questions vs. resolved ones
- Small bank institutions sometimes require manual statement retrieval with no system for tracking access method or portal links per account
- Existing Excel workflow needs to be importable to backfill the new system

This system replaces their Excel tracker with a purpose-built, internal-only web application accessible on any device via browser.

---

## 2. Decision Drivers

- Two internal users only (Jen + Katie) — no client-facing portal
- Must be fully serverless to minimize fixed monthly infrastructure cost
- Must be responsive (desktop primary, mobile functional)
- Must remove cognitive overhead from workflow logic — the software enforces the process
- Must support inter-user coordination via email notifications on step completion
- Owner (contractor) retains codebase; client pays monthly SaaS retainer for access and maintenance
- ADR must be detailed enough for automated issue generation via Sharkrite

---

## 3. Stack Decision

### Frontend
**React (Vite)**

Deployed as static SPA to S3 + CloudFront. Vite chosen for: native ES module dev server (no bundle step = instant HMR), fast production builds, minimal configuration overhead. Used successfully on prior projects.

### Backend
**AWS Lambda + API Gateway (HTTP API)**

Serverless, scales to zero, no fixed uptime cost. HTTP API (not REST API) — sufficient for this use case and lower cost. At 2 users with ~1000 requests/day, monthly Lambda + API Gateway cost is effectively $0 under free tier limits.

### Database
**Neon (serverless Postgres)**

Chosen over DynamoDB after evaluation. The data model is inherently relational (clients → accounts → checklist periods → questions). DynamoDB would require single-table design to achieve the same query patterns, adding implementation complexity with no material benefit at this scale. Neon provides:
- Serverless (scales to zero, no fixed uptime cost)
- Standard SQL — no ORM gymnastics
- Free tier: 0.5GB storage, 191 compute hours/month — sufficient for 65 clients
- Connection string stored in AWS SSM Parameter Store, consumed by Lambda at runtime

Staying outside AWS-native database is an acceptable tradeoff. Neon is the better fit for the data model.

### Auth
**Custom JWT**

Signed with a secret stored in AWS SSM Parameter Store. Two users only — credentials seeded at deploy time by contractor with temporary passwords. Each user updates their own email address and password via the Settings page after first login. Passwords stored as bcrypt hashes in Postgres. JWT issued on login, stored in httpOnly cookie, validated via Lambda middleware on every request. Session expiry: 8 hours. No self-service password reset in MVP — contractor reseeds credentials manually if needed. Users are application-level only; no IAM users or Cognito involved.

### File Storage
**S3 with versioning enabled**

- Document uploads stored with key pattern: `clients/<client_id>/accounts/<account_id>/<filename>`
- Versioning on for accidental overwrite protection
- Presigned URL generation via Lambda for secure access
- No public bucket access

### Email Notifications
**AWS SES (Simple Email Service)**

Triggered by Lambda on checklist step status change. Recipient is always the user whose `id != completing_user_id`. Each user has a configurable notification email address. Per-step notification toggles available in settings.

### Hosting & Domain
**CloudFront + S3 + subdomain via ACM**

Application served at `app.keepmybooks.net` — a subdomain of the client's existing domain. Client adds a single CNAME record in GoDaddy DNS pointing to the CloudFront distribution. ACM provides free SSL. No new domain purchase required. If the service relationship ends, client removes the CNAME and contractor's AWS infrastructure remains unaffected.

### Infrastructure-as-Code
**SST (Serverless Stack Toolkit)**

TypeScript-native, built on CDK, live Lambda development for fast iteration. Preferred over SAM for solo contractor workflow. Final choice may be revisited during implementation sprint.

---

## 4. Data Model

### users
```sql
id                   UUID PRIMARY KEY DEFAULT gen_random_uuid()
name                 TEXT NOT NULL
email                TEXT UNIQUE NOT NULL
password_hash        TEXT NOT NULL
notification_email   TEXT NOT NULL
notifications_enabled BOOLEAN DEFAULT true
created_at           TIMESTAMPTZ DEFAULT now()
```

### notification_step_settings
Per-user, per-step notification toggle.
```sql
id       UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id  UUID REFERENCES users(id)
step     INTEGER NOT NULL  -- 1-5
enabled  BOOLEAN DEFAULT true
UNIQUE(user_id, step)
```

### schedules
App-level named schedules. Seeded with "Monthly" and "Quarterly" at launch.
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
name         TEXT NOT NULL
period_type  TEXT NOT NULL  -- 'monthly' | 'quarterly' | 'custom'
description  TEXT
created_at   TIMESTAMPTZ DEFAULT now()
```

### clients
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
name         TEXT NOT NULL
email        TEXT
schedule_id  UUID REFERENCES schedules(id)  -- overrides app default if set
notes        TEXT
archived     BOOLEAN DEFAULT false
created_at   TIMESTAMPTZ DEFAULT now()
updated_at   TIMESTAMPTZ DEFAULT now()
```

### accounts
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
client_id        UUID REFERENCES clients(id)
type             TEXT NOT NULL  -- 'checking'|'savings'|'loan'|'investment'|'credit_card'|'mortgage'
institution_name TEXT NOT NULL
location         TEXT   -- e.g. 'QBO', 'direct login', 'Northern Trust portal'
bank_url         TEXT   -- clickable link to institution portal
access_method    TEXT   -- freeform: 'Jen has access', 'texts client code', etc.
rec_through_date DATE   -- last reconciled-through date
close_date       DATE   -- current period close/due date
archived         BOOLEAN DEFAULT false
created_at       TIMESTAMPTZ DEFAULT now()
updated_at       TIMESTAMPTZ DEFAULT now()
```

### checklist_periods
One record per client per billing period.
```sql
id                   UUID PRIMARY KEY DEFAULT gen_random_uuid()
client_id            UUID REFERENCES clients(id)
period               TEXT NOT NULL  -- 'YYYY-MM' monthly | 'YYYY-QN' quarterly
step_1_complete      BOOLEAN DEFAULT false
step_1_completed_by  UUID REFERENCES users(id)
step_1_completed_at  TIMESTAMPTZ
step_2_complete      BOOLEAN DEFAULT false
step_2_completed_by  UUID REFERENCES users(id)
step_2_completed_at  TIMESTAMPTZ
step_3_complete      BOOLEAN DEFAULT false
step_3_completed_by  UUID REFERENCES users(id)
step_3_completed_at  TIMESTAMPTZ
step_4_complete      BOOLEAN DEFAULT false
step_4_completed_by  UUID REFERENCES users(id)
step_4_completed_at  TIMESTAMPTZ
step_5_complete      BOOLEAN DEFAULT false
step_5_completed_by  UUID REFERENCES users(id)
step_5_completed_at  TIMESTAMPTZ
created_at           TIMESTAMPTZ DEFAULT now()
updated_at           TIMESTAMPTZ DEFAULT now()
UNIQUE(client_id, period)
```

**Step definitions (hardcoded in app logic):**
1. Access confirmed for all accounts
2. All accounts reconciled as of close date
3. All client questions resolved
4. Jen review complete
5. Financials sent to client

Steps are displayed in order. Pipeline status is derived from the lowest incomplete step. Steps are not technically enforced as blocking — users may complete them out of order.

### questions
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
client_id   UUID REFERENCES clients(id)
period      TEXT NOT NULL
text        TEXT NOT NULL
status      TEXT DEFAULT 'open'  -- 'open' | 'resolved'
created_by  UUID REFERENCES users(id)
created_at  TIMESTAMPTZ DEFAULT now()
resolved_by UUID REFERENCES users(id)
resolved_at TIMESTAMPTZ
```

### account_notes
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
account_id  UUID REFERENCES accounts(id)
note_type   TEXT NOT NULL  -- 'type_specific' | 'user_note'
content     TEXT NOT NULL
created_by  UUID REFERENCES users(id)
created_at  TIMESTAMPTZ DEFAULT now()
updated_at  TIMESTAMPTZ DEFAULT now()
```

`type_specific` notes are seeded per account type at launch (see Section 7). Editable and hideable via panel edit.
`user_note` entries are freeform notes added by either user on a specific account.

### account_field_preferences
Per-user, per-account-type field visibility and order for panel edit feature.
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
user_id      UUID REFERENCES users(id)
account_type TEXT NOT NULL
field_key    TEXT NOT NULL
visible      BOOLEAN DEFAULT true
sort_order   INTEGER NOT NULL
UNIQUE(user_id, account_type, field_key)
```

### timeline_events
Append-only audit log. Never updated or deleted.
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
entity_type  TEXT NOT NULL  -- 'client'|'account'|'checklist'|'question'
entity_id    UUID NOT NULL
action       TEXT NOT NULL  -- e.g. 'checklist.step_2.completed', 'question.resolved'
performed_by UUID REFERENCES users(id)
timestamp    TIMESTAMPTZ DEFAULT now()
metadata     JSONB   -- old/new values, contextual detail
client_id    UUID REFERENCES clients(id)  -- denormalized for efficient queries
```

---

## 5. Feature Scope by Phase

### Phase 1 — MVP (contract deliverable)

#### Auth
- Login page (email + password)
- JWT via httpOnly cookie, 8-hour expiry
- No registration UI — users seeded at deploy
- No self-service password reset — contractor handles manually

#### Schedule Management
- App-level default schedule (Monthly seeded at launch)
- Schedules list in Settings: name, period type, client count
- Create / edit / archive schedules
- Clients inherit app default unless a custom schedule is explicitly assigned

#### Client Management
- Create, read, update, soft-archive clients
- Fields: name, email, schedule override (optional), notes
- Searchable by name in sidebar
- Filterable by pipeline status, schedule, overdue flag
- Archived clients hidden by default; toggleable to show
- No hard deletes anywhere in the application

#### Account Management
- Create, read, update, soft-archive accounts per client
- Fields: type (enum), institution name, location, bank URL, access method, rec-through date, close date
- Bank URL renders as a prominent "Open Portal" button on account views

#### Pipeline Status (computed, not stored)
Derived from current checklist period at query time:
- **Grey:** No checklist period for current period
- **Green:** All 5 steps complete
- **Blue:** Steps partially complete, not yet within warning window
- **Yellow:** Close date within warning window (configurable, default 7 days) + any step incomplete
- **Red:** Close date passed + any step incomplete

Warning window threshold is user-configurable in settings (integer days, default 7).

#### Checklist Tracking
- Current period auto-created on first access if not exists
- Each step: toggle complete/incomplete, shows completing user + timestamp
- Either user can complete any step
- On step completion: SES notification sent to other user (subject to their notification settings)
- Notification email: client name, step label, completed by, timestamp, deep link to client detail

#### Question Tracking
- Add questions per client scoped to current period
- Status toggle: open / resolved
- Resolved questions show resolver + timestamp
- Open question count shown as badge in sidebar and client detail header

#### Excel / CSV Import (Backfill)
- Accessible from Settings
- Accepts CSV or XLSX
- Column mapping UI: user maps uploaded columns to system fields
- Preview table before any write occurs
- Duplicate detection with skip/merge option
- Writes to staging snapshot first; user confirms before committing to production
- Import history log: who, when, record count, skipped rows with reasons
- **Testing requirement:** Must be validated against a copy of real data in staging environment before any production import. Staging is a separate deployment with its own Neon database branch.

#### Account Detail Page (full page)
- Breadcrumb: `[Client Name] > [Account Name]`
- Sections:
  - Account metadata (all fields, editable inline)
  - Bank portal button + access method
  - Type-specific notes panel (seeded content, user-configurable via panel edit)
  - User notes (freeform, per-author edit/delete, author + timestamp shown)
  - Account-scoped timeline (events for this account, links to related checklist/question records)

#### Panel Edit (Account Detail)
- "Edit Layout" toggle on account detail page
- Each field/section shown as a togglable row with drag handle for reorder
- Visibility and order stored in `account_field_preferences` per user per account type
- Changes apply to all accounts of that type for that user
- Jen and Katie can configure independently without affecting each other
- "Reset to defaults" option available

#### Global Timeline / Event Log
- Filter by: client (multiselect), account type, event type, date range
- Sort by: timestamp desc (default), client name
- Each row links to relevant entity page
- Paginated (20 per page)

#### Dashboard — Default View
- **Left sidebar:** Persistent, collapsible. Scrollable client list with search + filter bar. Each client: name, schedule badge, pipeline step indicator (n/5), open question badge, status color.
- **Main area:** Selected client detail
  - Client metadata header with edit button
  - Accounts table: type icon, institution, close date, rec-through date, access method, status pill. Rows clickable → account detail page.
  - Current period checklist: 5 steps, toggle, completing user, timestamp
  - Open questions list with add button, per-question status toggle

#### Kanban View (toggle)
- Columns: one per pipeline step (1–5) + Complete
- Client cards: name, schedule badge, open question count, days until/since close date (status colored)
- Cards not freely draggable — clicking navigates to client detail
- Persistent client sidebar visible

#### Navigation
- **Desktop:** Persistent left sidebar (client list) + top bar (breadcrumb, view switcher, settings, avatar/logout)
- **Mobile:** Sidebar as bottom sheet, view switcher in top bar
- **Breadcrumb:** `Dashboard` → `[Client Name]` → `[Account Name]`

#### Settings
- Notification email address per user
- Global notifications toggle
- Per-step notification toggles (steps 1–5)
- Warning window threshold (days)
- Schedule management
- Import tool

---

### Phase 2 — Post-launch (change orders, priced separately)

- Presigned S3 upload links for client document submission
- Per-client / per-step notification address overrides
- Email client integration (flag unread client emails per client record) — significant scope, requires OAuth
- CSV/JSON data export
- QBO or bank feed integration — scoped independently
- Additional users / role-based permissions
- Reporting dashboard
- Bulk period rollover
- Self-service password reset

---

## 6. UI/UX Direction

**Aesthetic:** Refined utilitarian. Internal tool for a detail-oriented CPA. Trustworthy, calm, precise. Not startup SaaS. Neutral dark sidebar, clean white/off-white content area, typography-forward, generous whitespace.

**Status color system (used consistently throughout):**
- 🟢 Green — complete / reconciled / resolved
- 🔵 Blue — in progress, on track
- 🟡 Yellow — open + close date within warning window
- 🔴 Red — overdue (close date passed, incomplete)
- ⚫ Grey — no data / not started

**Layout principles:**
- Two-pane default: persistent client sidebar + client detail main area
- Account detail is a full page — not a panel
- Kanban is a secondary toggle view
- No calendar view in MVP — upcoming closes surfaced as a sort option
- Timeline events link to relevant entity pages
- Panel edit: per-user, per-account-type field visibility + ordering

---

## 7. Type-Specific Seed Notes

Pre-populated at launch per account type. These are suggestions, not locked content — editable, reorderable, and hideable via panel edit. Intent: present a complete starting point and prompt Jen to approve or revise rather than build from scratch.

**Checking**
- Institution, account number (last 4), portal URL, opening hours
- Access method, login type (direct / OTP / client-managed)
- Rec-through date, close date
- Outstanding checks / pending transactions note field
- Overdraft protection linked: yes/no

**Savings**
- Institution, account number (last 4), portal URL
- Interest rate, compounding schedule
- Rec-through date, close date
- Transfer restriction notes (e.g. withdrawal limits)

**Loan**
- Institution, loan number, portal URL
- Loan type (auto / personal / business / SBA / other)
- Principal balance, interest rate, maturity date
- Payment frequency, next payment date
- Amortization schedule on file: yes/no
- Rec-through date, close date

**Investment**
- Institution, account number, portal URL
- Account subtype (brokerage / IRA / 401k / other)
- Custodian contact
- Last statement date, statement frequency
- Rec-through date, close date

**Credit Card**
- Institution, card nickname / last 4, portal URL
- Credit limit, statement close date
- Payment due date, autopay enrolled: yes/no
- Rec-through date, close date

**Mortgage**
- Lender, loan number, portal URL
- Property address
- Principal balance, interest rate, remaining term
- Escrow account: yes/no, escrow balance
- Next payment date
- Rec-through date, close date

---

## 8. Demo Scope (pre-contract)

Hardcoded React frontend. No backend, no auth, no persistence, no real data.

**Included:**
- Dashboard with ~8 fake clients in sidebar across multiple statuses
- One fully mocked client detail (accounts table, checklist with mixed completion, 2 open questions)
- One fully mocked account detail page (type-specific notes panel, user notes, account timeline)
- Kanban view with fake clients across all columns
- Functional navigation between views
- Responsive layout

**Excluded:**
- Data persistence
- Authentication
- Backend / API
- Notifications
- Global timeline
- Import flow

**Access:** Temp AWS credentials for demo environment. On contract execution + deposit receipt: real user accounts created, demo environment decommissioned.

---

## 9. Deployment & Ownership

**Contractor owns the codebase.** Client purchases access to a hosted instance as a service. No source code transfer.

**Included in retainer:**
- AWS + Neon infrastructure maintenance
- Bug fixes (no cap)
- Minor feature additions ≤ ~2 hours (one per month)
- Deployments and SSL/domain management

**Change orders required for:**
- New major features or workflow additions
- Data model structural changes
- External integrations
- Additional users
- Design overhauls

**Change order process:** Written scope + estimate before work begins. Work starts only after written client approval.

**Exit terms:**
- Either party cancels with 30 days written notice
- Contractor delivers full CSV data export within 7 business days of cancellation
- Client loses hosted access at end of notice period
- Contractor retains codebase; may reuse or resell

---

## 10. Pricing Summary

| Line item | Amount |
|---|---|
| Build fee (MVP) | $2,150 one-time |
| Monthly retainer | $100/month |
| Change orders | Scoped + quoted per request |

**Payment schedule:**
- 50% deposit ($1,075) on contract signing — work begins on receipt
- 50% ($1,075) on launch day
- Monthly retainer begins the calendar month following launch
- First monthly invoice issued 30 days after launch date

---

## 11. Open Questions

- [ ] Confirm quarterly period key convention (`YYYY-QN` vs other)
- [ ] Confirm SST vs SAM during implementation sprint
- [ ] Staging environment data agreement — Jen to provide a safe copy of Excel data for import validation before any production import is attempted

