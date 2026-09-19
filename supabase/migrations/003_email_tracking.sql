-- ============================================================
-- Fab Four Academy: Email tracking
-- Migration: 003_email_tracking
--
-- Adds:
--   - email_sends tracking columns, written by the Resend webhook
--     (/api/webhooks/resend) via record_email_event().
--   - record_email_event(): one atomic update per webhook event; a bounce or
--     spam complaint also sets people.ok_to_contact = false.
--   - email_campaign_stats: per-send rollup for /admin/emails. Grouped by send
--     date as well as reference because WoW slugs repeat year over year.
--
-- Idempotent. Safe to re-run.
-- ============================================================

alter table public.email_sends
  add column if not exists delivered_at     timestamptz,
  add column if not exists first_opened_at  timestamptz,
  add column if not exists open_count       integer not null default 0,
  add column if not exists first_clicked_at timestamptz,
  add column if not exists click_count      integer not null default 0,
  add column if not exists bounced_at       timestamptz,
  add column if not exists complained_at    timestamptz;

create index if not exists idx_email_sends_resend_id
  on public.email_sends (resend_id);

create or replace function public.record_email_event(
  p_resend_id text,
  p_type      text,
  p_at        timestamptz
) returns void
language plpgsql
as $$
declare
  v_person uuid;
begin
  update public.email_sends set
    delivered_at     = case when p_type = 'email.delivered'  then coalesce(delivered_at, p_at)     else delivered_at end,
    first_opened_at  = case when p_type = 'email.opened'     then coalesce(first_opened_at, p_at)  else first_opened_at end,
    open_count       = open_count  + (p_type = 'email.opened')::int,
    first_clicked_at = case when p_type = 'email.clicked'    then coalesce(first_clicked_at, p_at) else first_clicked_at end,
    click_count      = click_count + (p_type = 'email.clicked')::int,
    bounced_at       = case when p_type = 'email.bounced'    then coalesce(bounced_at, p_at)       else bounced_at end,
    complained_at    = case when p_type = 'email.complained' then coalesce(complained_at, p_at)    else complained_at end,
    status           = case
                         when p_type = 'email.bounced'    then 'bounced'
                         when p_type = 'email.complained' then 'complained'
                         else status
                       end
  where resend_id = p_resend_id
  returning person_id into v_person;

  if v_person is not null and p_type in ('email.bounced', 'email.complained') then
    update public.people set ok_to_contact = false where id = v_person;
  end if;
end;
$$;

revoke execute on function public.record_email_event(text, text, timestamptz) from public, anon, authenticated;

create or replace view public.email_campaign_stats
with (security_invoker = true) as
select
  campaign,
  reference,
  (created_at at time zone 'UTC')::date                 as send_date,
  count(*)                                               as recipients,
  count(*) filter (where status = 'failed')              as failed,
  count(*) filter (where delivered_at is not null)       as delivered,
  count(*) filter (where first_opened_at is not null)    as opened,
  count(*) filter (where first_clicked_at is not null)   as clicked,
  count(*) filter (where bounced_at is not null)         as bounced,
  count(*) filter (where complained_at is not null)      as complained
from public.email_sends
group by campaign, reference, (created_at at time zone 'UTC')::date;

revoke all on public.email_campaign_stats from anon, authenticated;
