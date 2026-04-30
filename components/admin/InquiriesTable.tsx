/**
 * Client wrapper around the inquiry table on /admin/inquiries.
 *
 * The page is server-rendered for filtering speed and SEO-of-internal-tools
 * reasons; this component just adds the "click row → open detail panel"
 * interaction and refreshes the route data after edits.
 */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import InquiryDetail from './InquiryDetail'
import styles from './InquiriesTable.module.css'

export type InquiryRow = {
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

const STATUS_LABEL: Record<string, string> = {
  new_lead:       'New',
  contacted:      'Contacted',
  discovery_call: 'Discovery',
  proposal:       'Proposal',
  won:            'Won',
  lost:           'Lost',
}

export default function InquiriesTable({ rows }: { rows: InquiryRow[] }) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <>
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
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No inquiries match these filters.
                </td>
              </tr>
            )}
            {rows.map((i) => {
              const dt = new Date(i.created_at)
              return (
                <tr
                  key={i.id}
                  className={styles.row}
                  onClick={() => setSelectedId(i.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedId(i.id)
                    }
                  }}
                >
                  <td className={styles.cellDate}>
                    <div>{dt.toLocaleDateString()}</div>
                    <div className={styles.cellTime}>
                      {dt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td>{i.person_name || '—'}</td>
                  <td>
                    <a
                      href={`mailto:${i.person_email}`}
                      onClick={(e) => e.stopPropagation()}
                      className={styles.cellEmail}
                    >
                      {i.person_email}
                    </a>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        styles[`badge_${i.type}`] || ''
                      }`}
                    >
                      {i.type}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.stage} ${styles[`stage_${i.status}`] || ''}`}>
                      {STATUS_LABEL[i.status] ?? i.status}
                    </span>
                  </td>
                  <td className={styles.cellSource}>{i.source || '—'}</td>
                  <td className={styles.cellMessage}>{i.message || '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedId && (
        <InquiryDetail
          inquiryId={selectedId}
          onClose={() => setSelectedId(null)}
          onChanged={() => router.refresh()}
        />
      )}
    </>
  )
}
