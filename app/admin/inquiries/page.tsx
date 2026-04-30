import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

interface InquiryRow {
  id: string
  type: string
  status: string
  subject: string | null
  message: string | null
  source: string | null
  source_site: string
  created_at: string
  person_id: string
  person_name: string | null
  person_email: string
  person_phone: string | null
  person_company: string | null
  person_role: string | null
}

const SONG_RE = /favorite beatles song:\s*(.+)$/im

function extractSong(message: string | null): string | null {
  if (!message) return null
  const m = message.match(SONG_RE)
  if (!m) return null
  const raw = m[1].trim().replace(/[.,;]+$/, '')
  return raw || null
}

function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b[\p{L}']/gu, (c) => c.toUpperCase())
}

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string }>
}) {
  const sp = await searchParams

  const { data, error } = await supabase.rpc('get_inquiries', {
    p_type: sp.type || null,
    p_status: sp.status || null,
    p_source_site: null,
    p_limit: 500,
    p_offset: 0,
  })

  const inquiries = ((data ?? []) as InquiryRow[])

  // Beatles song mix — extracted from the message field on every inquiry
  // that carries a "Favorite Beatles song: …" line.
  const songCounts = new Map<string, number>()
  for (const i of inquiries) {
    const song = extractSong(i.message)
    if (song) {
      const key = titleCase(song)
      songCounts.set(key, (songCounts.get(key) ?? 0) + 1)
    }
  }
  const songs = Array.from(songCounts.entries())
    .map(([song, count]) => ({ song, count }))
    .sort((a, b) => b.count - a.count || a.song.localeCompare(b.song))
    .slice(0, 12)
  const totalSongVotes = Array.from(songCounts.values()).reduce((a, b) => a + b, 0)
  const maxSongCount = songs[0]?.count ?? 1

  return (
    <main className={styles.page}>
      <div className={styles.bar}>
        <Link href="/" className={styles.barLink}>← Home</Link>
        <span className={styles.barTitle}>Fab Four Admin</span>
      </div>

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Inquiries</h1>
          <p className={styles.count}>{inquiries.length} rows</p>
        </div>
        <a href="/admin/inquiries/export" className={`btn btn-white ${styles.exportBtn}`}>
          Export CSV
        </a>
      </header>

      {error && (
        <div className={styles.error}>RPC error: {error.message}</div>
      )}

      <form className={styles.filters} method="get">
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Type</span>
          <select name="type" defaultValue={sp.type ?? ''}>
            <option value="">All types</option>
            <option value="newsletter">Newsletter</option>
            <option value="keynote">Keynote</option>
            <option value="consultation">Consultation</option>
            <option value="general">General</option>
          </select>
        </label>
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Status</span>
          <select name="status" defaultValue={sp.status ?? ''}>
            <option value="">All statuses</option>
            <option value="new_lead">New lead</option>
            <option value="contacted">Contacted</option>
            <option value="discovery_call">Discovery call</option>
            <option value="proposal">Proposal</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary">Apply</button>
        {(sp.type || sp.status) && (
          <a href="/admin/inquiries" className={styles.clearLink}>Clear</a>
        )}
      </form>

      {songs.length > 0 && (
        <section className={styles.songSection}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Favorite Beatles songs</h2>
            <span className={styles.sectionMeta}>
              {totalSongVotes} {totalSongVotes === 1 ? 'vote' : 'votes'} · top {songs.length}
            </span>
          </header>
          <ul className={styles.songList}>
            {songs.map(({ song, count }) => (
              <li key={song} className={styles.songItem}>
                <span className={styles.songName}>{song}</span>
                <span
                  className={styles.songBar}
                  style={{ width: `${(count / maxSongCount) * 100}%` }}
                  aria-hidden="true"
                />
                <span className={styles.songCount}>{count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>All inquiries</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>When</th>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Source</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.empty}>No inquiries match these filters.</td>
                </tr>
              )}
              {inquiries.map((i) => {
                const dt = new Date(i.created_at)
                return (
                  <tr key={i.id}>
                    <td className={styles.cellDate}>
                      <div>{dt.toLocaleDateString()}</div>
                      <div className={styles.cellTime}>{dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                    <td>{i.person_name || '—'}</td>
                    <td><a href={`mailto:${i.person_email}`} className={styles.cellEmail}>{i.person_email}</a></td>
                    <td><span className={`${styles.badge} ${styles[`badge_${i.type}`] || ''}`}>{i.type}</span></td>
                    <td>{i.status}</td>
                    <td className={styles.cellSource}>{i.source || '—'}</td>
                    <td className={styles.cellMessage}>{i.message || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
