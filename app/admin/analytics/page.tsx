/**
 * Site traffic from Vercel Web Analytics (last 30 days), read through
 * lib/vercel-analytics.ts. Needs Web Analytics enabled on the Vercel project
 * and VERCEL_API_TOKEN / VERCEL_PROJECT_ID / VERCEL_TEAM_ID set.
 */

import { getBreakdown, getTotals, type AnalyticsRow } from '@/lib/vercel-analytics'
import styles from '../_components/adminPage.module.css'

export const dynamic = 'force-dynamic'

const DAYS = 30

function BarList({ title, rows, dim }: { title: string; rows: AnalyticsRow[]; dim: string }) {
  const max = Math.max(1, ...rows.map((r) => r.visitors))
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      {rows.length === 0 && <p className={styles.cardMeta}>No data yet.</p>}
      <ul className={styles.bars}>
        {rows.map((r, i) => (
          <li key={i} className={styles.barRow}>
            <span className={styles.barLabel} title={String(r[dim] ?? '')}>
              {String(r[dim] || '(direct)')}
            </span>
            <span className={styles.bar} style={{ width: `${(r.visitors / max) * 100}%` }} />
            <span className={styles.barCount}>{r.visitors.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function AdminAnalyticsPage() {
  const until = new Date()
  const since = new Date(until.getTime() - DAYS * 24 * 60 * 60 * 1000)
  const range = [since.toISOString(), until.toISOString()] as const

  const totals = await getTotals(...range)

  if (!totals.ok) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Website</p>
          <h1 className={styles.title}>Analytics</h1>
        </header>
        <p className={styles.notice}>{totals.message}</p>
        {totals.reason !== 'error' && (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>One-time setup</h2>
            <ol className={styles.steps}>
              <li>
                In Vercel, open the fabfouracademy project, go to Analytics and click Enable. Visits
                are counted from the next deploy onward.
              </li>
              <li>
                Create an access token at vercel.com/account/tokens, scoped to the team that owns
                the project.
              </li>
              <li>
                Add it as VERCEL_API_TOKEN (with VERCEL_PROJECT_ID and VERCEL_TEAM_ID) in the
                project&apos;s Environment Variables, and in .env.local for local work.
              </li>
            </ol>
          </section>
        )}
      </div>
    )
  }

  const [daily, pages, referrers, countries, devices] = await Promise.all([
    getBreakdown('day', ...range, 100),
    getBreakdown('requestPath', ...range),
    getBreakdown('referrerHostname', ...range),
    getBreakdown('country', ...range),
    getBreakdown('deviceType', ...range, 5),
  ])
  const rows = (r: typeof daily) => (r.ok ? r.data : [])
  const days = rows(daily)
  const maxDay = Math.max(1, ...days.map((d) => d.visitors))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Website</p>
        <h1 className={styles.title}>Analytics</h1>
        <p className={styles.lede}>Last {DAYS} days, from Vercel Web Analytics. Refreshes every 5 minutes.</p>
      </header>

      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Visitors</span>
          <span className={styles.statValue}>{totals.data.visitors.toLocaleString()}</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_blue}`}>
          <span className={styles.statLabel}>Page views</span>
          <span className={styles.statValue}>{totals.data.pageviews.toLocaleString()}</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Visitors per day</h2>
        {days.length === 0 && (
          <p className={styles.cardMeta}>
            No visits recorded yet. Counting starts once the site is deployed with the analytics
            script.
          </p>
        )}
        <div className={styles.chart}>
          {days.map((d) => (
            <div
              key={d.timestamp}
              className={styles.chartCol}
              style={{ height: `${(d.visitors / maxDay) * 100}%` }}
              title={`${d.timestamp?.slice(0, 10)}: ${d.visitors} visitors, ${d.pageviews} views`}
            />
          ))}
        </div>
        <div className={styles.chartAxis}>
          <span>{days[0]?.timestamp?.slice(0, 10)}</span>
          <span>peak {maxDay.toLocaleString()}</span>
          <span>{days.at(-1)?.timestamp?.slice(0, 10)}</span>
        </div>
      </section>

      <div className={styles.cards}>
        <BarList title="Top pages" rows={rows(pages)} dim="requestPath" />
        <BarList title="Referrers" rows={rows(referrers)} dim="referrerHostname" />
        <BarList title="Countries" rows={rows(countries)} dim="country" />
        <BarList title="Devices" rows={rows(devices)} dim="deviceType" />
      </div>
    </div>
  )
}
