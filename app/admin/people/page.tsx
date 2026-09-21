/**
 * People: master person index.
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
import PeopleTable from './PeopleTable'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

type SearchParams = {
  filter?: 'all' | 'subscribers' | 'leads' | 'opted_out'
}

type PersonRow = {
  id: string
  email: string
  name: string | null
  phone: string | null
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
  message: string | null
  created_at: string
}

type PersonView = PersonRow & {
  favorite_song: string | null  // only used by the CSV export
  inquiry_types: Set<string>
  pipeline_inquiries: number  // any inquiry that's not type=newsletter
  last_activity: string
}

const SONG_PREFIX = 'Favorite Beatles song:'

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
      .select('id, email, name, phone, company, role, source_site, ok_to_contact, created_at, updated_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('inquiries')
      .select('id, person_id, type, status, source, message, created_at'),
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
    // The signup form stores the song as a line in the inquiry message.
    const songLine = ins
      .flatMap((i) => (i.message ?? '').split('\n'))
      .find((l) => l.startsWith(SONG_PREFIX))
    return {
      ...p,
      favorite_song: songLine ? songLine.slice(SONG_PREFIX.length).trim() : null,
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

      <PeopleTable
        people={visible.map((p) => ({ ...p, inquiry_types: Array.from(p.inquiry_types) }))}
      />
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
