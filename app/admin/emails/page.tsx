/**
 * Email campaign log: one row per send (campaign + post + UTC send date),
 * read from the email_campaign_stats view (migration 003). Delivery, open and
 * click numbers are filled in by the Resend webhook.
 */

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { fetchWOWPosts } from '@/lib/google-doc-fetcher'
import RangeTabs, { parseRange, rangeLabel, rangeStart } from '../_components/RangeTabs'
import styles from '../_components/adminPage.module.css'

export const dynamic = 'force-dynamic'

type CampaignRow = {
  campaign: string
  reference: string | null
  send_date: string
  recipients: number
  failed: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
  complained: number
}

const pct = (n: number, of: number) => (of > 0 ? `${Math.round((n / of) * 100)}%` : '-')

export default async function AdminEmailsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const range = parseRange((await searchParams).range)
  const since = rangeStart(range)

  let query = supabase
    .from('email_campaign_stats')
    .select('*')
    .order('send_date', { ascending: false })
    .limit(2000)
  if (since) query = query.gte('send_date', since.toISOString().slice(0, 10))

  const [{ data, error }, posts] = await Promise.all([query, fetchWOWPosts()])

  const rows = (data ?? []) as CampaignRow[]
  const titles = new Map(posts.map((p) => [p.slug, p.title]))
  const sum = (k: keyof CampaignRow) => rows.reduce((t, r) => t + Number(r[k]), 0)
  const sent = sum('recipients') - sum('failed')
  const tracked = sum('delivered') > 0

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Email</p>
        <h1 className={styles.title}>Campaign log</h1>
        <p className={styles.lede}>
          Every email send, newest first. Opens are approximate because Apple Mail
          pre-loads images; clicks are the number to trust.
        </p>
      </header>

      {error && (
        <p className={styles.notice}>
          Could not load campaign stats ({error.message}). If the view is missing, apply{' '}
          <code>supabase/migrations/003_email_tracking.sql</code>.
        </p>
      )}
      {!error && !tracked && (
        <p className={styles.notice}>
          No delivery events recorded yet. Tracking starts once the Resend webhook is
          pointed at <code>/api/webhooks/resend</code>; earlier sends will stay blank.
        </p>
      )}

      <RangeTabs path="/admin/emails" active={range} />

      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Sent, {rangeLabel(range)}</span>
          <span className={styles.statValue}>{sent.toLocaleString()}</span>
          <span className={styles.statSub}>{sum('failed')} failed</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_blue}`}>
          <span className={styles.statLabel}>Delivered</span>
          <span className={styles.statValue}>{pct(sum('delivered'), sent)}</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_charcoal}`}>
          <span className={styles.statLabel}>Opened / clicked</span>
          <span className={styles.statValue}>
            {pct(sum('opened'), sum('delivered'))} / {pct(sum('clicked'), sum('delivered'))}
          </span>
          <span className={styles.statSub}>of delivered</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_orange}`}>
          <span className={styles.statLabel}>Bounced / complained</span>
          <span className={styles.statValue}>
            {sum('bounced')} / {sum('complained')}
          </span>
          <span className={styles.statSub}>auto-unsubscribed</span>
        </div>
      </section>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date (UTC)</th>
              <th>Email</th>
              <th>Campaign</th>
              <th className={styles.num}>Recipients</th>
              <th className={styles.num}>Failed</th>
              <th className={styles.num}>Delivered</th>
              <th className={styles.num}>Opened</th>
              <th className={styles.num}>Clicked</th>
              <th className={styles.num}>Bounced</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className={styles.empty}>No sends in this period.</td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={`${r.campaign}-${r.reference}-${r.send_date}`}>
                <td>{r.send_date}</td>
                <td>
                  <Link
                    href={`/admin/emails/${encodeURIComponent(r.reference ?? '-')}?date=${r.send_date}&campaign=${r.campaign}`}
                  >
                    {titles.get(r.reference ?? '') ?? r.reference ?? '(no reference)'}
                  </Link>
                </td>
                <td className={styles.muted}>{r.campaign}</td>
                <td className={styles.num}>{r.recipients}</td>
                <td className={styles.num}>{r.failed || ''}</td>
                <td className={styles.num}>{r.delivered ? `${r.delivered} (${pct(r.delivered, r.recipients - r.failed)})` : ''}</td>
                <td className={styles.num}>{r.opened ? `${r.opened} (${pct(r.opened, r.delivered)})` : ''}</td>
                <td className={styles.num}>{r.clicked ? `${r.clicked} (${pct(r.clicked, r.delivered)})` : ''}</td>
                <td className={styles.num}>{r.bounced + r.complained || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
