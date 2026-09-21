'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ExportCsvButton from './ExportCsvButton'
import styles from './page.module.css'

export type PersonListRow = {
  id: string
  email: string
  name: string | null
  phone: string | null
  favorite_song: string | null
  company: string | null
  role: string | null
  source_site: string
  ok_to_contact: boolean
  created_at: string
  last_activity: string
  inquiry_types: string[]
}

type Detail = {
  person: PersonListRow & { updated_at: string }
  favoriteSong: string | null
  inquiries: { id: string; type: string; subject: string | null; message: string | null; source: string | null; status: string; created_at: string }[]
  sends: { id: string; campaign: string; reference: string; status: string; created_at: string; delivered_at: string | null; first_opened_at: string | null; first_clicked_at: string | null }[]
  sendCount: number
  activity: { id: string; action: string; details: unknown; created_at: string }[]
}

const TYPE_LABEL: Record<string, string> = {
  newsletter:   'Newsletter',
  keynote:      'Keynote',
  consultation: 'Consultation',
  general:      'General',
}

function relTime(iso: string): string {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d < 30) return `${d}d ago`
  return `${Math.round(d / 30)}mo ago`
}

const day = (iso: string) => new Date(iso).toLocaleDateString()

export default function PeopleTable({ people }: { people: PersonListRow[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return people
    return people.filter((p) =>
      [p.name, p.email, p.company, p.role].some((v) => v?.toLowerCase().includes(q)),
    )
  }, [people, query])

  useEffect(() => {
    if (!openId) return
    setDetail(null)
    setError('')
    fetch(`/api/admin/people/${openId}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error ?? 'Could not load this person.')
        setDetail(json)
      })
      .catch((e: Error) => setError(e.message))
  }, [openId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const setConsent = async (ok: boolean) => {
    if (!detail) return
    setBusy(true)
    const res = await fetch(`/api/admin/people/${detail.person.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok_to_contact: ok }),
    })
    if (res.ok) {
      setDetail({ ...detail, person: { ...detail.person, ok_to_contact: ok } })
      router.refresh()
    } else setError('Could not update this person.')
    setBusy(false)
  }

  const remove = async () => {
    if (!detail) return
    const label = detail.person.name || detail.person.email
    if (!window.confirm(`Delete ${label} permanently? This also deletes their inquiries and email history, and cannot be undone.`)) return
    setBusy(true)
    const res = await fetch(`/api/admin/people/${detail.person.id}`, { method: 'DELETE' })
    if (res.ok) {
      setOpenId(null)
      router.refresh()
    } else setError('Could not delete this person.')
    setBusy(false)
  }

  return (
    <>
      <div className={styles.toolbar}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, company…"
          aria-label="Search people"
          className={styles.search}
        />
        <ExportCsvButton
          rows={visible.map((p) => ({
            ...p,
            inquiry_types: p.inquiry_types.join('; '),
            ok_to_contact: p.ok_to_contact ? 'yes' : 'no',
          }))}
          headers={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'favorite_song', label: 'Favorite Beatles song' },
            { key: 'company', label: 'Company' },
            { key: 'role', label: 'Role' },
            { key: 'inquiry_types', label: 'Tags' },
            { key: 'source_site', label: 'Source' },
            { key: 'ok_to_contact', label: 'Subscribed' },
            { key: 'created_at', label: 'First seen' },
          ]}
          filename={`fab-four-people-${new Date().toISOString().slice(0, 10)}.csv`}
        />
      </div>

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
                  {query ? `Nobody matches "${query}".` : 'Nothing matches this filter yet.'}
                </td>
              </tr>
            )}
            {visible.map((p) => (
              <tr
                key={p.id}
                onClick={() => setOpenId(p.id)}
                className={`${styles.rowClickable} ${openId === p.id ? styles.rowOpen : ''}`}
              >
                <td className={styles.cellName}>
                  <button type="button" className={styles.rowButton} onClick={() => setOpenId(p.id)}>
                    {p.name || '-'}
                  </button>
                </td>
                <td className={styles.cellEmail}>{p.email}</td>
                <td className={styles.cellCompany}>
                  {p.company || '-'}
                  {p.role && <div className={styles.cellRole}>{p.role}</div>}
                </td>
                <td>
                  <div className={styles.tags}>
                    {p.inquiry_types.map((t) => (
                      <span key={t} className={`${styles.tag} ${styles[`tag_${t}`] ?? ''}`}>
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
                  {day(p.created_at)}
                </td>
                <td>
                  <span className={`${styles.pill} ${p.ok_to_contact ? styles.pillIn : styles.pillOut}`}>
                    {p.ok_to_contact ? '✓ in' : '✕ out'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openId && (
        <>
          <div className={styles.scrim} onClick={() => setOpenId(null)} />
          <aside className={styles.shelf} aria-label="Person details">
            <button type="button" className={styles.shelfClose} onClick={() => setOpenId(null)} aria-label="Close">
              ✕
            </button>
            {error && <p className={styles.shelfError}>{error}</p>}
            {!detail && !error && <p className={styles.cellMuted}>Loading…</p>}
            {detail && (
              <>
                <header className={styles.shelfHeader}>
                  <h2 className={styles.shelfName}>{detail.person.name || detail.person.email}</h2>
                  <a href={`mailto:${detail.person.email}`} className={styles.cellEmail}>
                    {detail.person.email}
                  </a>
                  <span className={`${styles.pill} ${detail.person.ok_to_contact ? styles.pillIn : styles.pillOut}`}>
                    {detail.person.ok_to_contact ? '✓ subscribed' : '✕ unsubscribed'}
                  </span>
                </header>

                <dl className={styles.facts}>
                  <dt>Favorite Beatles song</dt>
                  <dd>{detail.favoriteSong || 'Not on record'}</dd>
                  <dt>Company</dt>
                  <dd>{detail.person.company || '-'}</dd>
                  <dt>Role</dt>
                  <dd>{detail.person.role || '-'}</dd>
                  <dt>Phone</dt>
                  <dd>{detail.person.phone || '-'}</dd>
                  <dt>Source</dt>
                  <dd>{detail.person.source_site}</dd>
                  <dt>First seen</dt>
                  <dd>{new Date(detail.person.created_at).toLocaleString()}</dd>
                </dl>

                <section className={styles.shelfSection}>
                  <h3>Forms submitted ({detail.inquiries.length})</h3>
                  {detail.inquiries.map((i) => (
                    <div key={i.id} className={styles.shelfItem}>
                      <strong>{TYPE_LABEL[i.type] ?? i.type}</strong> · {day(i.created_at)} · {i.status}
                      {i.subject && <div>{i.subject}</div>}
                      {i.message && <div className={styles.shelfMessage}>{i.message}</div>}
                    </div>
                  ))}
                </section>

                <section className={styles.shelfSection}>
                  <h3>Emails sent ({detail.sendCount.toLocaleString()})</h3>
                  {detail.sends.length === 0 && <p className={styles.cellMuted}>None yet.</p>}
                  {detail.sends.map((s) => (
                    <div key={s.id} className={styles.shelfItem}>
                      {day(s.created_at)} · {s.reference}
                      <span className={styles.cellMuted}>
                        {' '}
                        {s.first_clicked_at ? 'clicked' : s.first_opened_at ? 'opened' : s.delivered_at ? 'delivered' : s.status}
                      </span>
                    </div>
                  ))}
                  {detail.sendCount > detail.sends.length && (
                    <p className={styles.cellMuted}>Showing the latest {detail.sends.length}.</p>
                  )}
                </section>

                {detail.activity.length > 0 && (
                  <section className={styles.shelfSection}>
                    <h3>Activity</h3>
                    {detail.activity.map((a) => (
                      <div key={a.id} className={styles.shelfItem}>
                        {day(a.created_at)} · {a.action}
                      </div>
                    ))}
                  </section>
                )}

                <footer className={styles.shelfActions}>
                  <button type="button" disabled={busy} onClick={() => setConsent(!detail.person.ok_to_contact)} className={styles.shelfButton}>
                    {detail.person.ok_to_contact ? 'Unsubscribe from emails' : 'Resubscribe'}
                  </button>
                  <button type="button" disabled={busy} onClick={remove} className={`${styles.shelfButton} ${styles.shelfDanger}`}>
                    Delete permanently
                  </button>
                </footer>
              </>
            )}
          </aside>
        </>
      )}
    </>
  )
}
