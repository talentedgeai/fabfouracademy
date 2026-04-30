-- ============================================================
-- Fab Four Academy: Email infrastructure
-- Migration: 002_email_infra
--
-- Adds:
--   - people.unsubscribe_token  — opaque per-person token used in email
--                                  unsubscribe links. UUID, default new value.
--   - email_sends                 — append-only log of every send. Backs the
--                                  daily-cron idempotency check (one daily_wow
--                                  per person per post slug) and gives an
--                                  audit trail for bounce / complaint webhooks.
--
-- Idempotent — safe to re-run.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- people.unsubscribe_token
-- ────────────────────────────────────────────────────────────
alter table public.people
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

-- Backfill any rows the default missed (defensive — should be a no-op).
update public.people
  set unsubscribe_token = gen_random_uuid()
  where unsubscribe_token is null;

create unique index if not exists idx_people_unsubscribe_token
  on public.people (unsubscribe_token);

-- ────────────────────────────────────────────────────────────
-- email_sends: every email we dispatch is logged here.
--   campaign  — 'daily_wow' | 'inquiry_notify' | 'welcome' | …
--   reference — campaign-specific id (e.g. WoW post slug, inquiry uuid)
--   status    — 'sent' on success; webhook handlers later flip to bounced /
--               complained / unsubscribed.
-- ────────────────────────────────────────────────────────────
create table if not exists public.email_sends (
  id          uuid primary key default gen_random_uuid(),
  person_id   uuid not null references public.people(id) on delete cascade,
  email       text not null,
  campaign    text not null,
  reference   text,
  resend_id   text,
  status      text not null default 'sent'
                check (status in ('sent','failed','bounced','complained','unsubscribed')),
  metadata    jsonb default '{}',
  created_at  timestamptz not null default now()
);

-- Idempotency: at most one daily_wow send per person per post.
-- Partial index — other campaigns can record many sends per (person, reference).
create unique index if not exists idx_email_sends_daily_wow_unique
  on public.email_sends (person_id, campaign, reference)
  where campaign = 'daily_wow';

create index if not exists idx_email_sends_person
  on public.email_sends (person_id);

create index if not exists idx_email_sends_campaign
  on public.email_sends (campaign, created_at desc);

-- ────────────────────────────────────────────────────────────
-- RLS — service role only; client never touches this table.
-- ────────────────────────────────────────────────────────────
alter table public.email_sends enable row level security;
