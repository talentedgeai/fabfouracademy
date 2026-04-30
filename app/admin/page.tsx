/**
 * Admin dashboard — at-a-glance view of the CRM.
 *
 * Patterned after aio-website/src/app/admin/page.tsx but trimmed to the data
 * fab-four actually has today: people, inquiries, email_sends. No revenue,
 * no MRR, no Stripe — those land in Phase 3.
 *
 * Stats:
 *   - Total people
 *   - Active subscribers (people.ok_to_contact = true)
 *   - Inquiries last 7 days (with breakdown by type)
 *   - Daily WoW emails sent last 7 days
 *
 * Activity feed merges the most recent inquiries and email sends.
 */

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

const PIPELINE_STAGES = [
  { id: 'new_lead',       label: 'New' },
  { id: 'contacted',      label: 'Contacted' },
  { id: 'discovery_call', label: 'Discovery' },
  { id: 'proposal',       label: 'Proposal' },
  { id: 'won',            label: 'Won' },
  { id: 'lost',           label: 'Lost' },
] as const

const TYPE_LABEL: Record<string, string> = {
  newsletter:   'Newsletter',
  keynote:      'Keynote',
  consultation: 'Consultation',
  general:      'General',
}

function relTime(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const s = Math.max(1, Math.round((now - then) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 30) return `${d}d ago`
  const mo = Math.round(d / 30)
  return `${mo}mo ago`
}

export default async function AdminDashboardPage() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    peopleCount,
    subscriberCount,
    inquiries7d,
    typeCounts,
    sends7d,
    recentInquiries,
    recentSends,
  ] = await Promise.all([
    supabase.from('people').select('id', { count: 'exact', head: true }),
    supabase
      .from('people')
      .select('id', { count: 'exact', head: true })
      .eq('ok_to_contact', true),
    supabase
      .from('inquiries')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo),
    supabase.rpc('get_inquiry_counts'),
    supabase
      .from('email_sends')
      .select('id', { count: 'exact', head: true })
      .eq('campaign', 'daily_wow')
      .eq('status', 'sent')
      .gte('created_at', sevenDaysAgo),
    supabase
      .from('inquiries')
      .select(
        'id, type, status, source, created_at, person_id, people:person_id(name, email)',
      )
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('email_sends')
      .select('id, email, campaign, reference, status, created_at')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const total = peopleCount.count ?? 0
  const subscribers = subscriberCount.count ?? 0
  const inquiriesWeek = inquiries7d.count ?? 0
  const sendsWeek = sends7d.count ?? 0

  // Type counts: rows look like { type, status, count }. Aggregate by type.
  type TypeStatusRow = { type: string; status: string; count: number }
  const typeMap = new Map<string, number>()
  const stageMap = new Map<string, number>()
  for (const row of (typeCounts.data ?? []) as TypeStatusRow[]) {
    typeMap.set(row.type, (typeMap.get(row.type) ?? 0) + Number(row.count))
    stageMap.set(row.status, (stageMap.get(row.status) ?? 0) + Number(row.count))
  }
  const types = Array.from(typeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
  const totalInquiries = Array.from(typeMap.values()).reduce((a, b) => a + b, 0)

  const stages = PIPELINE_STAGES.map((s) => ({
    id: s.id,
    label: s.label,
    count: stageMap.get(s.id) ?? 0,
  }))
  const stagesMax = Math.max(1, ...stages.map((s) => s.count))

  type RecentInquiry = {
    id: string
    type: string
    status: string
    source: string | null
    created_at: string
    person_id: string
    people: { name: string | null; email: string } | null
  }
  type RecentSend = {
    id: string
    email: string
    campaign: string
    reference: string | null
    status: string
    created_at: string
  }

  type ActivityItem =
    | { kind: 'inquiry'; at: string; data: RecentInquiry }
    | { kind: 'send';    at: string; data: RecentSend }

  const activity: ActivityItem[] = [
    ...((recentInquiries.data ?? []) as unknown as RecentInquiry[]).map(
      (i) => ({ kind: 'inquiry' as const, at: i.created_at, data: i }),
    ),
    ...((recentSends.data ?? []) as RecentSend[]).map(
      (s) => ({ kind: 'send' as const, at: s.created_at, data: s }),
    ),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 12)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Dashboard</p>
        <h1 className={styles.title}>Fab Four CRM</h1>
        <p className={styles.lede}>
          People, inquiries, and the daily-email loop at a glance.
        </p>
      </header>

      {/* ── Stat cards ─────────────────────────────────────── */}
      <section className={styles.stats}>
        <StatCard label="People" value={total} href="/admin/people" />
        <StatCard
          label="Active subscribers"
          value={subscribers}
          href="/admin/newsletter"
          sub={`${total - subscribers} opted out`}
        />
        <StatCard
          label="Inquiries · 7d"
          value={inquiriesWeek}
          href="/admin/inquiries"
        />
        <StatCard
          label="Daily emails · 7d"
          value={sendsWeek}
          sub="status = sent"
        />
      </section>

      {/* ── Two-column body ────────────────────────────────── */}
      <section className={styles.cards}>
        {/* Inquiries by type */}
        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Inquiries by type</h2>
            <span className={styles.cardMeta}>
              {totalInquiries} total
            </span>
          </header>
          {types.length === 0 ? (
            <p className={styles.empty}>No inquiries yet.</p>
          ) : (
            <ul className={styles.bars}>
              {types.map(([type, count]) => (
                <li key={type} className={styles.barRow}>
                  <Link
                    href={`/admin/inquiries?type=${type}`}
                    className={styles.barLabel}
                  >
                    {TYPE_LABEL[type] ?? type}
                  </Link>
                  <span
                    className={`${styles.bar} ${styles[`bar_${type}`] ?? ''}`}
                    style={{
                      width: `${
                        (count / Math.max(1, totalInquiries)) * 100
                      }%`,
                    }}
                    aria-hidden="true"
                  />
                  <span className={styles.barCount}>{count}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        {/* Pipeline by stage */}
        <article className={styles.card}>
          <header className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Pipeline by stage</h2>
            <span className={styles.cardMeta}>across all types</span>
          </header>
          <ul className={styles.bars}>
            {stages.map((s) => (
              <li key={s.id} className={styles.barRow}>
                <Link
                  href={`/admin/inquiries?status=${s.id}`}
                  className={styles.barLabel}
                >
                  {s.label}
                </Link>
                <span
                  className={`${styles.bar} ${styles[`stage_${s.id}`] ?? ''}`}
                  style={{ width: `${(s.count / stagesMax) * 100}%` }}
                  aria-hidden="true"
                />
                <span className={styles.barCount}>{s.count}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ── Activity feed ──────────────────────────────────── */}
      <section className={styles.card}>
        <header className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Recent activity</h2>
          <span className={styles.cardMeta}>{activity.length} items</span>
        </header>
        {activity.length === 0 ? (
          <p className={styles.empty}>Nothing yet.</p>
        ) : (
          <ul className={styles.activity}>
            {activity.map((item) => (
              <li key={`${item.kind}-${item.data.id}`} className={styles.activityRow}>
                <span className={`${styles.dot} ${styles[`dot_${item.kind}`]}`} aria-hidden="true" />
                <div className={styles.activityBody}>
                  {item.kind === 'inquiry' ? (
                    <>
                      <span className={styles.activityKind}>
                        {TYPE_LABEL[item.data.type] ?? item.data.type}
                      </span>
                      {' '}from{' '}
                      <span className={styles.activityWho}>
                        {item.data.people?.name || item.data.people?.email || 'unknown'}
                      </span>
                      {item.data.source && (
                        <span className={styles.activityMeta}> · {item.data.source}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className={styles.activityKind}>Email</span>{' '}
                      <span className={styles.activityWho}>{item.data.email}</span>
                      <span className={styles.activityMeta}>
                        {' '}· {item.data.campaign}
                        {item.data.reference ? ` / ${item.data.reference}` : ''}
                        {' '}· {item.data.status}
                      </span>
                    </>
                  )}
                </div>
                <time
                  className={styles.activityTime}
                  dateTime={item.at}
                  title={new Date(item.at).toLocaleString()}
                >
                  {relTime(item.at)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function StatCard({
  label,
  value,
  href,
  sub,
}: {
  label: string
  value: number
  href?: string
  sub?: string
}) {
  const inner = (
    <>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value.toLocaleString()}</span>
      {sub && <span className={styles.statSub}>{sub}</span>}
    </>
  )
  if (href) {
    return (
      <Link href={href} className={`${styles.stat} ${styles.statLink}`}>
        {inner}
      </Link>
    )
  }
  return <div className={styles.stat}>{inner}</div>
}
