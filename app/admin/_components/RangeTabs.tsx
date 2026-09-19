/**
 * 7 days / 30 days / All time switch shared by /admin/emails and
 * /admin/analytics. The choice lives in the URL (?range=) so the server page
 * reads it and links stay shareable.
 */

import Link from 'next/link'
import styles from './adminPage.module.css'

export type Range = '7d' | '30d' | 'all'

const RANGES: { key: Range; label: string }[] = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: 'all', label: 'All time' },
]

export function parseRange(value: string | undefined): Range {
  return value === '7d' || value === 'all' ? value : '30d'
}

// Start of the range, or null for all time.
export function rangeStart(range: Range): Date | null {
  if (range === 'all') return null
  return new Date(Date.now() - (range === '7d' ? 7 : 30) * 24 * 60 * 60 * 1000)
}

export const rangeLabel = (range: Range) => RANGES.find((r) => r.key === range)!.label.toLowerCase()

export default function RangeTabs({ path, active }: { path: string; active: Range }) {
  return (
    <nav className={styles.tabs} aria-label="Date range">
      {RANGES.map((r) => (
        <Link
          key={r.key}
          href={`${path}?range=${r.key}`}
          className={`${styles.tab} ${r.key === active ? styles.tabActive : ''}`}
          aria-current={r.key === active ? 'page' : undefined}
        >
          {r.label}
        </Link>
      ))}
    </nav>
  )
}
