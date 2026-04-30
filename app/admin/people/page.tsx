/**
 * People — master person index.
 *
 * Patterned after aio-website/src/app/admin/people/page.tsx, with the
 * commerce aggregation (orders / memberships / spending) stripped out
 * because fab-four hasn't built those tables yet. Comes back in Phase 3.
 *
 * Joins each person to their inquiries to surface inquiry-type tags and the
 * most recent activity timestamp.
 */

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type SearchParams = {
  filter?: 'all' | 'subscribers' | 'leads' | 'opted_out'
}

type PersonRow = {
  id: string
  email: string
  name: string | null
  company: string | null
  role: string | null
  source_site: string
  ok_to_contact: boolean
  created_at: string
  updated_at: string
}

type InquiryRow = {
  id: string
  person_id: string
  type: string
  status: string
  source: string | null
  created_at: string
}

type PersonView = PersonRow & {
  inquiry_types: Set<string>
  pipeline_inquiries: number  // any inquiry that's not type=newsletter
  last_activity: string
}

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

export default async function AdminPeoplePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const filter = sp.filter ?? 'all'

  const [peopleRes, inquiriesRes] = await Promise.all([
    supabase
      .from('people')
      .select('id, email, name, company, role, source_site, ok_to_contact, created_at, updated_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('inquiries')
      .select('id, person_id, type, status, source, created_at'),
  ])

  const peopleRows  = (peopleRes.data    ?? []) as PersonRow[]
  const inquiryRows = (inquiriesRes.data ?? []) as InquiryRow[]

  // Index inquiries by person
  const byPerson = new Map<string, InquiryRow[]>()
  for (const i of inquiryRows) {
    const arr = byPerson.get(i.person_id) ?? []
    arr.push(i)
    byPerson.set(i.person_id, arr)
  }

  const enriched: PersonView[] = peopleRows.map((p) => {
    const ins = byPerson.get(p.id) ?? []
    const inquiryTypes = new Set(ins.map((i) => i.type))
    const pipeline = ins.filter((i) => i.type !== 'newsletter').length
    const latestInquiryAt = ins.reduce<string>(
      (acc, i) => (i.created_at > acc ? i.created_at : acc),
      '',
    )
    const lastActivity = [p.created_at, p.updated_at, latestInquiryAt]
      .filter(Boolean)
      .sort()
      .reverse()[0] ?? p.created_at
    return {
      ...p,
      inquiry_types: inquiryTypes,
      pipeline_inquiries: pipeline,
      last_activity: lastActivity,
    }
  })

  enriched.sort(
    (a, b) =>
      new Date(b.last_activity).getTime() -
      new Date(a.last_activity).getTime(),
  )

  // Filter
  const subscribersCount = enriched.filter(
    (p) => p.inquiry_types.has('newsletter') && p.ok_to_contact,
  ).length
  const leadsCount = enriched.filter((p) => p.pipeline_inquiries > 0).length
  const optedOutCount = enriched.filter((p) => !p.ok_to_contact).length

  const visible = enriched.filter((p) => {
    if (filter === 'subscribers') return p.inquiry_types.has('newsletter') && p.ok_to_contact
    if (filter === 'leads') return p.pipeline_inquiries > 0
    if (filter === 'opted_out') return !p.ok_to_contact
    return true
  })

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>People</p>
        <h1 className={styles.title}>Everyone in the CRM</h1>
        <p className={styles.lede}>
          Every person who&apos;s submitted a form, signed up for the daily
          email, or been imported. Phase 3 adds order and membership
          aggregation to this view.
        </p>
      </header>

      <section className={styles.stats}>
        <Stat label="People" value={enriched.length} />
        <Stat label="Subscribers" value={subscribersCount} accent="blue" />
        <Stat label="Leads" value={leadsCount} accent="orange" />
        <Stat label="Opted out" value={optedOutCount} />
      </section>

      <nav className={styles.tabs}>
        <Tab href="/admin/people"                      active={filter === 'all'}>
          All <span className={styles.tabCount}>{enriched.length}</span>
        </Tab>
        <Tab href="/admin/people?filter=subscribers"   active={filter === 'subscribers'}>
          Subscribers <span className={styles.tabCount}>{subscribersCount}</span>
        </Tab>
        <Tab href="/admin/people?filter=leads"         active={filter === 'leads'}>
          Leads <span className={styles.tabCount}>{leadsCount}</span>
        </Tab>
        <Tab href="/admin/people?filter=opted_out"     active={filter === 'opted_out'}>
          Opted out <span className={styles.tabCount}>{optedOutCount}</span>
        </Tab>
      </nav>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company / Role</th>
              <th>Tags</th>
              <th>Source</th>
              <th>Last activity</th>
              <th>First seen</th>
              <th>Consent</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.empty}>
                  Nothing matches this filter yet.
                </td>
              </tr>
            )}
            {visible.map((p) => (
              <tr key={p.id}>
                <td className={styles.cellName}>{p.name || '—'}</td>
                <td>
                  <a href={`mailto:${p.email}`} className={styles.cellEmail}>
                    {p.email}
                  </a>
                </td>
                <td className={styles.cellCompany}>
                  {p.company || '—'}
                  {p.role && <div className={styles.cellRole}>{p.role}</div>}
                </td>
                <td>
                  <div className={styles.tags}>
                    {Array.from(p.inquiry_types).map((t) => (
                      <span
                        key={t}
                        className={`${styles.tag} ${styles[`tag_${t}`] ?? ''}`}
                      >
                        {TYPE_LABEL[t] ?? t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className={styles.cellMuted}>{p.source_site}</td>
                <td className={styles.cellTime} title={new Date(p.last_activity).toLocaleString()}>
                  {relTime(p.last_activity)}
                </td>
                <td className={styles.cellTime} title={new Date(p.created_at).toLocaleString()}>
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
                <td>
                  <span
                    className={`${styles.pill} ${
                      p.ok_to_contact ? styles.pillIn : styles.pillOut
                    }`}
                  >
                    {p.ok_to_contact ? '✓ in' : '✕ out'}
                  </span>
                </td>
              </tr>
            ))}
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
