/**
 * Newsletter subscribers — every person with a newsletter inquiry, deduped
 * to one row per person (newest inquiry wins). Filter by opted-in / opted-out
 * / all. CSV export and per-row consent toggle.
 *
 * Patterned after aio-website/src/app/admin/newsletter/page.tsx, simplified
 * for fab-four's leaner schema (no orders / memberships joins).
 */

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ExportCsvButton from './_components/ExportCsvButton'
import SubscriberRowActions from './_components/SubscriberRowActions'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type SearchParams = { filter?: 'all' | 'opted_in' | 'opted_out' }

type RawRow = {
  source: string | null
  source_site: string
  created_at: string
  people: {
    id: string
    email: string
    name: string | null
    company: string | null
    ok_to_contact: boolean
  } | null
}

type Subscriber = {
  person_id: string
  email: string
  name: string | null
  company: string | null
  ok_to_contact: boolean
  source: string | null
  source_site: string
  signed_up_at: string
}

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const filter = sp.filter ?? 'opted_in'

  // Pull every newsletter inquiry with its joined person, newest first.
  const { data, error } = await supabase
    .from('inquiries')
    .select(
      'source, source_site, created_at, people:person_id(id, email, name, company, ok_to_contact)',
    )
    .eq('type', 'newsletter')
    .order('created_at', { ascending: false })

  const rows = (data ?? []) as unknown as RawRow[]

  // Dedupe by person_id — keep the newest inquiry per person.
  const byPerson = new Map<string, Subscriber>()
  for (const r of rows) {
    if (!r.people) continue
    if (byPerson.has(r.people.id)) continue
    byPerson.set(r.people.id, {
      person_id: r.people.id,
      email: r.people.email,
      name: r.people.name,
      company: r.people.company,
      ok_to_contact: r.people.ok_to_contact,
      source: r.source,
      source_site: r.source_site,
      signed_up_at: r.created_at,
    })
  }
  const all = Array.from(byPerson.values())

  const optedIn  = all.filter((s) => s.ok_to_contact)
  const optedOut = all.filter((s) => !s.ok_to_contact)

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const last30 = optedIn.filter(
    (s) => new Date(s.signed_up_at).getTime() >= thirtyDaysAgo,
  ).length

  const visible =
    filter === 'opted_out'
      ? optedOut
      : filter === 'all'
        ? all
        : optedIn

  // CSV rows — what we'd hand to ConvertKit/Beehiiv/Mailchimp on import.
  const csvRows = visible.map((s) => ({
    email: s.email,
    name: s.name ?? '',
    company: s.company ?? '',
    consent: s.ok_to_contact ? 'opted_in' : 'opted_out',
    source: s.source ?? '',
    source_site: s.source_site,
    signed_up_at: s.signed_up_at,
  }))

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Newsletter</p>
          <h1 className={styles.title}>Subscribers</h1>
          <p className={styles.lede}>
            Everyone who&apos;s signed up for the daily Words of Wisdom email,
            with consent state and the page they came from.
          </p>
        </div>
        <ExportCsvButton
          rows={csvRows}
          headers={[
            { key: 'email',         label: 'Email' },
            { key: 'name',          label: 'Name' },
            { key: 'company',       label: 'Company' },
            { key: 'consent',       label: 'Consent' },
            { key: 'source',        label: 'Source' },
            { key: 'source_site',   label: 'Source site' },
            { key: 'signed_up_at',  label: 'Signed up at' },
          ]}
          filename={`fab-four-subscribers-${filter}-${new Date().toISOString().slice(0, 10)}.csv`}
        />
      </header>

      {error && (
        <div className={styles.error}>Query error: {error.message}</div>
      )}

      <section className={styles.stats}>
        <Stat label="Total" value={all.length} />
        <Stat label="Opted in" value={optedIn.length} accent="blue" />
        <Stat label="Opted out" value={optedOut.length} accent="orange" />
        <Stat label="Joined · 30d" value={last30} />
      </section>

      <nav className={styles.tabs}>
        <Tab href="/admin/newsletter?filter=opted_in"  active={filter === 'opted_in'}>
          Opted in <span className={styles.tabCount}>{optedIn.length}</span>
        </Tab>
        <Tab href="/admin/newsletter?filter=opted_out" active={filter === 'opted_out'}>
          Opted out <span className={styles.tabCount}>{optedOut.length}</span>
        </Tab>
        <Tab href="/admin/newsletter?filter=all"       active={filter === 'all'}>
          All <span className={styles.tabCount}>{all.length}</span>
        </Tab>
      </nav>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Signed up</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Source</th>
              <th>Consent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  Nothing matches this filter yet.
                </td>
              </tr>
            )}
            {visible.map((s) => {
              const dt = new Date(s.signed_up_at)
              return (
                <tr key={s.person_id}>
                  <td className={styles.cellDate}>
                    <div>{dt.toLocaleDateString()}</div>
                    <div className={styles.cellTime}>
                      {dt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td>{s.name || '—'}</td>
                  <td>
                    <a href={`mailto:${s.email}`} className={styles.cellEmail}>
                      {s.email}
                    </a>
                  </td>
                  <td className={styles.cellMuted}>{s.company || '—'}</td>
                  <td className={styles.cellMuted}>{s.source || '—'}</td>
                  <td>
                    <span
                      className={`${styles.pill} ${
                        s.ok_to_contact ? styles.pillIn : styles.pillOut
                      }`}
                    >
                      {s.ok_to_contact ? 'Opted in' : 'Opted out'}
                    </span>
                  </td>
                  <td>
                    <SubscriberRowActions
                      personId={s.person_id}
                      okToContact={s.ok_to_contact}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: 'blue' | 'orange'
}) {
  return (
    <div className={`${styles.stat} ${accent ? styles[`stat_${accent}`] : ''}`}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value.toLocaleString()}</span>
    </div>
  )
}

function Tab({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`${styles.tab} ${active ? styles.tabActive : ''}`}
    >
      {children}
    </Link>
  )
}
