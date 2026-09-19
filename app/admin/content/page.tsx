/**
 * Read-only content overview: what the site and the daily email will publish.
 * Words of Wisdom and the monthly posts are edited in their Google Docs; blog
 * posts live in app/blog/posts.ts. The email picks its post by month + day, so
 * the calendar check flags upcoming dates with no matching post.
 */

import Link from 'next/link'
import { fetchWOWPosts } from '@/lib/google-doc-fetcher'
import { fetchMonthlyPosts } from '@/lib/monthly-theme-fetcher'
import { parsePostDate } from '@/lib/wow-utils'
import { BLOG_POSTS } from '@/app/blog/posts'
import styles from '../_components/adminPage.module.css'

export const dynamic = 'force-dynamic'

const LOOKAHEAD_DAYS = 30
const mdKey = (d: Date) => `${d.getMonth()}-${d.getDate()}`
const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default async function AdminContentPage() {
  const [wow, monthly] = await Promise.all([fetchWOWPosts(), fetchMonthlyPosts()])

  const byDay = new Map(wow.map((p) => [mdKey(parsePostDate(p.published)), p]))
  const today = new Date()
  const upcoming = Array.from({ length: LOOKAHEAD_DAYS }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    return { date: d, post: byDay.get(mdKey(d)) }
  })
  const gaps = upcoming.filter((u) => !u.post)

  const sortedWow = [...wow].sort(
    (a, b) => parsePostDate(a.published).getTime() - parsePostDate(b.published).getTime(),
  )

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Content</p>
        <h1 className={styles.title}>Posts</h1>
        <p className={styles.lede}>
          Read-only. Words of Wisdom and monthly posts are edited in their Google
          Docs and appear here within a minute.
        </p>
      </header>

      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Words of Wisdom</span>
          <span className={styles.statValue}>{wow.length}</span>
        </div>
        <div className={`${styles.stat} ${gaps.length ? styles.stat_orange : styles.stat_blue}`}>
          <span className={styles.statLabel}>Next {LOOKAHEAD_DAYS} days without a post</span>
          <span className={styles.statValue}>{gaps.length}</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_charcoal}`}>
          <span className={styles.statLabel}>Monthly posts</span>
          <span className={styles.statValue}>{monthly.length}</span>
        </div>
        <div className={`${styles.stat} ${styles.stat_charcoal}`}>
          <span className={styles.statLabel}>Blog posts</span>
          <span className={styles.statValue}>{BLOG_POSTS.length}</span>
        </div>
      </section>

      {gaps.length > 0 && (
        <p className={styles.notice}>
          No post is dated for: {gaps.map((g) => fmt(g.date)).join(', ')}. On those days
          the email falls back to the most recent earlier post, so subscribers get a repeat.
        </p>
      )}

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Upcoming daily emails</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Date</th><th>Post</th><th>Subtitle</th></tr>
            </thead>
            <tbody>
              {upcoming.slice(0, 14).map(({ date, post }) => (
                <tr key={date.toISOString()}>
                  <td>{fmt(date)}</td>
                  <td>
                    {post ? (
                      <Link href={`/words-of-wisdom-content/${post.slug}`} target="_blank">{post.title}</Link>
                    ) : (
                      <span className={`${styles.pill} ${styles.pillBad}`}>No post</span>
                    )}
                  </td>
                  <td className={styles.muted}>{post?.subtitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>All Words of Wisdom ({wow.length})</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr><th>Date</th><th>Title</th><th>Series</th><th>Image</th><th>Song</th></tr>
            </thead>
            <tbody>
              {sortedWow.map((p) => (
                <tr key={p.slug}>
                  <td>{p.published}</td>
                  <td><Link href={`/words-of-wisdom-content/${p.slug}`} target="_blank">{p.title}</Link></td>
                  <td className={styles.muted}>{p.series}</td>
                  <td>{p.imageUrl ? '✓' : <span className={`${styles.pill} ${styles.pillBad}`}>Missing</span>}</td>
                  <td className={styles.muted}>{p.songUrl ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className={styles.cards}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Monthly posts ({monthly.length})</h2>
          <ul className={styles.bars}>
            {monthly.map((m) => (
              <li key={m.slug}>
                <Link href={`/attitude-perspective/${m.slug}`} target="_blank">{m.month}: {m.title}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Blog posts ({BLOG_POSTS.length})</h2>
          <ul className={styles.bars}>
            {BLOG_POSTS.map((b) => (
              <li key={b.slug}>
                <Link href={b.href} target="_blank">{b.title}</Link>{' '}
                <span className={styles.muted}>· {b.category}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
