-- ============================================================
-- Fab Four Academy: Normalized Database Schema
-- Migration: 001_normalized_schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard)
--
-- Adapted verbatim from aio-website/supabase/001_normalized_schema.sql.
-- Tweaks:
--   - source_site default = 'fabfouracademy.com'
--   - inquiries.type check does NOT include 'memberships' (Phase 3 adds it)
--
-- Schema:
--   people (contacts) → inquiries (form submissions)
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- CORE TABLE: people
-- One row per unique email address. Shared across all sites.
-- ────────────────────────────────────────────────────────────
create table if not exists public.people (
  id             uuid primary key default gen_random_uuid(),
  email          text not null unique,
  name           text,
  phone          text,
  company        text,
  role           text,
  source_site    text default 'fabfouracademy.com',
  ok_to_contact  boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Auto-update updated_at on any change
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_people_updated_at on public.people;
create trigger set_people_updated_at
  before update on public.people
  for each row
  execute function public.handle_updated_at();

-- ────────────────────────────────────────────────────────────
-- FORM TABLE: inquiries
-- All form submissions (general, keynote, consultation, newsletter)
-- ────────────────────────────────────────────────────────────
create table if not exists public.inquiries (
  id              uuid primary key default gen_random_uuid(),
  person_id       uuid not null references public.people(id) on delete cascade,
  type            text not null default 'general'
                    check (type in ('general', 'keynote', 'consultation', 'newsletter')),
  subject         text,
  message         text,
  source          text,
  source_site     text default 'fabfouracademy.com',
  status          text not null default 'new_lead'
                    check (status in ('new_lead', 'contacted', 'discovery_call', 'proposal', 'won', 'lost')),
  created_at      timestamptz not null default now()
);

create index if not exists idx_inquiries_person on public.inquiries (person_id);
create index if not exists idx_inquiries_type   on public.inquiries (type);
create index if not exists idx_inquiries_status on public.inquiries (status);
create index if not exists idx_inquiries_source on public.inquiries (source_site);

-- ────────────────────────────────────────────────────────────
-- ACTIVITY LOG: tracks CRM actions
-- ────────────────────────────────────────────────────────────
create table if not exists public.activity_log (
  id              uuid primary key default gen_random_uuid(),
  inquiry_id      uuid references public.inquiries(id) on delete cascade,
  person_id       uuid references public.people(id) on delete cascade,
  action          text not null,
  details         jsonb default '{}',
  created_at      timestamptz not null default now()
);

create index if not exists idx_activity_inquiry on public.activity_log (inquiry_id);
create index if not exists idx_activity_person  on public.activity_log (person_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.people enable row level security;
alter table public.inquiries enable row level security;
alter table public.activity_log enable row level security;

-- Anon can insert people and inquiries (needed by RPC submit functions)
drop policy if exists "Anon can insert people" on public.people;
create policy "Anon can insert people"
  on public.people for insert
  with check (true);

drop policy if exists "Anon can insert inquiries" on public.inquiries;
create policy "Anon can insert inquiries"
  on public.inquiries for insert
  with check (true);

-- ============================================================
-- RPC FUNCTIONS: Frontend form submissions
-- security definer = runs with table owner privileges
-- ============================================================

-- General inquiry / contact form
create or replace function public.submit_inquiry(
  p_name         text,
  p_email        text,
  p_type         text default 'general',
  p_phone        text default null,
  p_company      text default null,
  p_role         text default null,
  p_subject      text default null,
  p_message      text default null,
  p_source       text default null,
  p_source_site  text default 'fabfouracademy.com'
)
returns uuid
language plpgsql security definer
as $$
declare
  v_person_id uuid;
  v_inquiry_id uuid;
begin
  -- Upsert person on email conflict
  insert into public.people (email, name, phone, company, role, source_site)
  values (lower(trim(p_email)), trim(p_name), p_phone, p_company, p_role, p_source_site)
  on conflict (email) do update set
    name = coalesce(nullif(trim(p_name), ''), public.people.name),
    phone = coalesce(p_phone, public.people.phone),
    company = coalesce(p_company, public.people.company),
    role = coalesce(p_role, public.people.role),
    updated_at = now()
  returning id into v_person_id;

  -- Insert inquiry
  insert into public.inquiries (person_id, type, subject, message, source, source_site)
  values (v_person_id, p_type, p_subject, p_message, p_source, p_source_site)
  returning id into v_inquiry_id;

  return v_inquiry_id;
end;
$$;

-- Newsletter signup
create or replace function public.submit_newsletter(
  p_email        text,
  p_name         text default null,
  p_source       text default 'footer',
  p_source_site  text default 'fabfouracademy.com'
)
returns uuid
language plpgsql security definer
as $$
declare
  v_person_id uuid;
  v_inquiry_id uuid;
begin
  insert into public.people (email, name, source_site)
  values (lower(trim(p_email)), trim(p_name), p_source_site)
  on conflict (email) do update set
    name = coalesce(nullif(trim(p_name), ''), public.people.name),
    updated_at = now()
  returning id into v_person_id;

  insert into public.inquiries (person_id, type, source, source_site)
  values (v_person_id, 'newsletter', p_source, p_source_site)
  returning id into v_inquiry_id;

  return v_inquiry_id;
end;
$$;

-- ============================================================
-- RPC FUNCTIONS: Admin dashboard
-- ============================================================

-- Paginated list of inquiries with person info
create or replace function public.get_inquiries(
  p_type        text default null,
  p_status      text default null,
  p_source_site text default null,
  p_limit       int  default 50,
  p_offset      int  default 0
)
returns table (
  id               uuid,
  type             text,
  status           text,
  subject          text,
  message          text,
  source           text,
  source_site      text,
  created_at       timestamptz,
  person_id        uuid,
  person_name      text,
  person_email     text,
  person_phone     text,
  person_company   text,
  person_role      text
)
language plpgsql security definer
as $$
begin
  return query
  select
    i.id,
    i.type,
    i.status,
    i.subject,
    i.message,
    i.source,
    i.source_site,
    i.created_at,
    p.id        as person_id,
    p.name      as person_name,
    p.email     as person_email,
    p.phone     as person_phone,
    p.company   as person_company,
    p.role      as person_role
  from public.inquiries i
  join public.people p on p.id = i.person_id
  where (p_type is null or i.type = p_type)
    and (p_status is null or i.status = p_status)
    and (p_source_site is null or i.source_site = p_source_site)
  order by i.created_at desc
  limit p_limit
  offset p_offset;
end;
$$;

-- Full details for a single inquiry
create or replace function public.get_inquiry_detail(
  p_inquiry_id uuid
)
returns table (
  id               uuid,
  type             text,
  status           text,
  subject          text,
  message          text,
  source           text,
  source_site      text,
  created_at       timestamptz,
  person_id        uuid,
  person_name      text,
  person_email     text,
  person_phone     text,
  person_company   text,
  person_role      text,
  person_ok_to_contact boolean,
  person_source_site text
)
language plpgsql security definer
as $$
begin
  return query
  select
    i.id,
    i.type,
    i.status,
    i.subject,
    i.message,
    i.source,
    i.source_site,
    i.created_at,
    p.id             as person_id,
    p.name           as person_name,
    p.email          as person_email,
    p.phone          as person_phone,
    p.company        as person_company,
    p.role           as person_role,
    p.ok_to_contact  as person_ok_to_contact,
    p.source_site    as person_source_site
  from public.inquiries i
  join public.people p on p.id = i.person_id
  where i.id = p_inquiry_id;
end;
$$;

-- Change inquiry status
create or replace function public.update_inquiry_status(
  p_inquiry_id uuid,
  p_status     text
)
returns uuid
language plpgsql security definer
as $$
begin
  if p_status not in ('new_lead', 'contacted', 'discovery_call', 'proposal', 'won', 'lost') then
    raise exception 'Invalid status: %', p_status;
  end if;

  update public.inquiries
  set status = p_status
  where id = p_inquiry_id;

  return p_inquiry_id;
end;
$$;

-- Summary counts by type and status
create or replace function public.get_inquiry_counts()
returns table (
  type   text,
  status text,
  count  bigint
)
language plpgsql security definer
as $$
begin
  return query
  select i.type, i.status, count(*)::bigint
  from public.inquiries i
  group by i.type, i.status
  order by i.type, i.status;
end;
$$;

-- Edit a person's information
create or replace function public.update_person(
  p_person_id    uuid,
  p_name         text default null,
  p_email        text default null,
  p_phone        text default null,
  p_company      text default null,
  p_role         text default null
)
returns uuid
language plpgsql security definer
as $$
begin
  update public.people
  set
    name    = coalesce(p_name, name),
    email   = coalesce(lower(trim(p_email)), email),
    phone   = coalesce(p_phone, phone),
    company = coalesce(p_company, company),
    role    = coalesce(p_role, role)
  where id = p_person_id;

  return p_person_id;
end;
$$;

-- ============================================================
-- GRANTS
-- ============================================================
grant insert on public.people to anon;
grant insert on public.inquiries to anon;
grant execute on function public.submit_inquiry to anon;
grant execute on function public.submit_newsletter to anon;
grant execute on function public.get_inquiries to anon;
grant execute on function public.get_inquiry_detail to anon;
grant execute on function public.update_inquiry_status to anon;
grant execute on function public.get_inquiry_counts to anon;
grant execute on function public.update_person to anon;
