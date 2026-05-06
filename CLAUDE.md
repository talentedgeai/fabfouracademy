# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Style

Do not make any changes until you have 95% confidence in what you need to build. Ask follow-up questions until you reach that confidence.

For all requests, only analyze the files mentioned. Do not explore the entire repo.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
```

There are no lint or test scripts configured.

## Architecture

**Stack:** Next.js 15 App Router, React 19, TypeScript 5, Supabase (PostgreSQL), Resend (email), deployed to Vercel.

### Route Structure

- **Public pages** — `/blog`, `/books`, `/daily-words-of-wisdom`, `/daily-email-signup`, `/join-fab-four-community`, `/sign-in`, etc.
- **Admin dashboard** — `/admin`, `/admin/inquiries`, `/admin/people`, `/admin/newsletter` — gated by HTTP Basic Auth in middleware
- **API routes** — `/api/contacts` (public form), `/api/admin/contacts/[id]` (CRUD), `/api/unsubscribe`, `/api/cron/daily-wow`, `/api/cron/admin-daily-wow`, `/api/dev/send-test-wow`

### Auth Model

Admin routes (`/admin/*` and `/api/admin/*`) are protected by HTTP Basic Auth in [middleware.ts](middleware.ts) using the `ADMIN_PASSWORD` env var. There is no user session — it's a single shared password.

### Supabase Clients

Two clients in `lib/`:
- **Public client** — uses `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, browser-safe, respects RLS
- **Secret client** — uses `SUPABASE_URL` + `SUPABASE_SECRET_KEY`, server-only, bypasses RLS for admin operations

Always use the secret client in API routes that need full table access; use the public client in client components.

### Email System

Daily "Words of Wisdom" emails are sent via Resend. React-Email templates live in [emails/](emails/). Two Vercel cron jobs trigger the sends (defined in [vercel.json](vercel.json)): subscriber broadcast at 11:00 UTC, admin copy at 13:00 UTC. Cron routes require a `Bearer` token matching `CRON_SECRET`. Unsubscribe tokens are UUID columns on the `people` table.

### Database

Supabase PostgreSQL with migrations in [supabase/migrations/](supabase/migrations/). Key tables: `people` (subscribers, `ok_to_contact`, `unsubscribe_token`), `email_sends` (delivery tracking), inquiry tables. RPC function `get_inquiry_detail()` used in admin.

### Styling

CSS Modules (`*.module.css`) per route/component. No Tailwind. Remote images allowed from `static.wixstatic.com` (configured in [next.config.ts](next.config.ts)).

## Environment Variables

```
SUPABASE_URL                           # Server-side Supabase URL
SUPABASE_SECRET_KEY                    # Server-side service role key (bypasses RLS)
NEXT_PUBLIC_SUPABASE_URL               # Browser-safe Supabase URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY   # Browser-safe anon key
RESEND_API_KEY                         # Resend email delivery
EMAIL_FROM                             # Sender address
ADMIN_EMAILS                           # Comma-separated admin email list
ADMIN_PASSWORD                         # HTTP Basic Auth password for /admin
CRON_SECRET                            # Vercel Cron bearer token
SITE_URL                               # Production domain (https://fabfouracademy.com)
```

See [.env.local copy.example](.env.local%20copy.example) for a template.
