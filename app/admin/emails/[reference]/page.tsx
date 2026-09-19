/**
 * One send, per recipient: status plus delivery / open / click timestamps.
 * A send is identified by campaign + reference + UTC date (?date=YYYY-MM-DD).
 */

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from '../../_components/adminPage.module.css'

export const dynamic = 'force-dynamic'

type SendRow = {
  id: string
  email: string
  status: string
  created_at: string
  delivered_at: string | null
  first_opened_at: string | null
  open_count: number
  first_clicked_at: string | null
  click_count: number
  metadata: { reason?: string } | null
}

const time = (iso: string | null) =>
  iso ? new Date(iso).toISOString().slice(11, 16) : ''

export default async function AdminEmailSendPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>
  searchParams: Promise<{ date?: string; campaign?: string }>
}) {
  const { reference } = await params
  const { date, campaign = 'daily_wow' } = await searchParams
  const slug = decodeURIComponent(reference)

  let query = supabase
    .from('email_sends')
    .select('id, email, status, created_at, delivered_at, first_opened_at, open_count, first_clicked_at, click_count, metadata')
    .eq('campaign', campaign)
    .eq('reference', slug)
    .order('email')
    .limit(2000)
  if (date) {
    const next = new Date(`${date}T00:00:00Z`)
    next.setUTCDate(next.getUTCDate() + 1)
    query = query.gte('created_at', `${date}T00:00:00Z`).lt('created_at', next.toISOString())
  }
  const { data, error } = await query
  const rows = (data ?? []) as SendRow[]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/admin/emails" className={styles.back}>← Campaign log</Link>
        <p className={styles.eyebrow}>{campaign}{date ? ` · ${date}` : ''}</p>
        <h1 className={styles.title}>{slug}</h1>
        <p className={styles.lede}>{rows.length} recipients. Times are UTC.</p>
      </header>

      {error && <p className={styles.notice}>Could not load sends: {error.message}</p>}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Status</th>
              <th>Sent</th>
              <th>Delivered</th>
              <th>First open</th>
              <th className={styles.num}>Opens</th>
              <th>First click</th>
              <th className={styles.num}>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={8} className={styles.empty}>No sends found.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.email}</td>
                <td>
                  <span
                    className={`${styles.pill} ${
                      r.status === 'sent' ? styles.pillGood : styles.pillBad
                    }`}
                    title={r.metadata?.reason}
                  >
                    {r.status}
                  </span>
                </td>
                <td>{time(r.created_at)}</td>
                <td>{time(r.delivered_at)}</td>
                <td>{time(r.first_opened_at)}</td>
                <td className={styles.num}>{r.open_count || ''}</td>
                <td>{time(r.first_clicked_at)}</td>
                <td className={styles.num}>{r.click_count || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
