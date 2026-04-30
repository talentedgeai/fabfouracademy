/**
 * Slide-in detail panel for /admin/inquiries.
 *
 * Adapted from aio-website/src/components/admin/contact-detail.tsx, simplified
 * to match the data fab-four actually has (no orders/memberships/affiliates,
 * no activity log timeline yet — those land in Phase 3).
 *
 * Mounted by InquiriesTable (client wrapper around the existing server-rendered
 * inquiries page). Calls /api/contacts/[id] for fetch + PATCH.
 */

'use client'

import { useEffect, useState } from 'react'
import styles from './InquiryDetail.module.css'

type InquiryDetail = {
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
  person_ok_to_contact?: boolean
}

const STATUSES = [
  { id: 'new_lead',       label: 'New lead' },
  { id: 'contacted',      label: 'Contacted' },
  { id: 'discovery_call', label: 'Discovery call' },
  { id: 'proposal',       label: 'Proposal' },
  { id: 'won',            label: 'Won' },
  { id: 'lost',           label: 'Lost' },
]

export default function InquiryDetail({
  inquiryId,
  onClose,
  onChanged,
}: {
  inquiryId: string
  onClose: () => void
  onChanged?: () => void
}) {
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Editable copies of person fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  // Load
  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/admin/contacts/${inquiryId}`, {
          cache: 'no-store',
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed to load inquiry')
        if (cancelled) return
        const i = json.inquiry as InquiryDetail
        setInquiry(i)
        setName(i.person_name ?? '')
        setEmail(i.person_email ?? '')
        setPhone(i.person_phone ?? '')
        setCompany(i.person_company ?? '')
        setRole(i.person_role ?? '')
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Failed to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [inquiryId])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function patch(payload: Record<string, unknown>) {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/contacts/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Update failed')
      if (json.inquiry) setInquiry(json.inquiry as InquiryDetail)
      onChanged?.()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleStatusChange(next: string) {
    if (!inquiry || next === inquiry.status) return
    await patch({ status: next })
  }

  async function handleSavePerson() {
    if (!inquiry) return
    await patch({
      person: {
        name:    name.trim()    || null,
        email:   email.trim()   || null,
        phone:   phone.trim()   || null,
        company: company.trim() || null,
        role:    role.trim()    || null,
      },
    })
  }

  async function handleDelete() {
    if (!confirm('Delete this inquiry permanently?')) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/contacts/${inquiryId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json?.error || 'Delete failed')
      }
      onChanged?.()
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
      setSaving(false)
    }
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <aside className={styles.panel} role="dialog" aria-label="Inquiry detail">
        <header className={styles.header}>
          <p className={styles.kicker}>
            {inquiry
              ? `${inquiry.type.toUpperCase()} · ${new Date(inquiry.created_at).toLocaleString()}`
              : 'Loading…'}
          </p>
          <h2 className={styles.title}>
            {inquiry?.person_name || inquiry?.person_email || 'Inquiry'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.close}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        {loading && <p className={styles.loading}>Loading…</p>}

        {error && <p className={styles.error}>{error}</p>}

        {inquiry && !loading && (
          <div className={styles.body}>
            {/* Status */}
            <section className={styles.section}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.select}
                value={inquiry.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={saving}
              >
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </section>

            {/* Person */}
            <section className={styles.section}>
              <h3 className={styles.subhead}>Person</h3>
              <div className={styles.fields}>
                <Field label="Name" value={name} onChange={setName} disabled={saving} />
                <Field label="Email" value={email} onChange={setEmail} type="email" disabled={saving} />
                <Field label="Phone" value={phone} onChange={setPhone} type="tel" disabled={saving} />
                <Field label="Company" value={company} onChange={setCompany} disabled={saving} />
                <Field label="Role" value={role} onChange={setRole} disabled={saving} />
              </div>
              <button
                type="button"
                onClick={handleSavePerson}
                className={`btn btn-primary ${styles.saveBtn}`}
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save person'}
              </button>
            </section>

            {/* Inquiry meta */}
            <section className={styles.section}>
              <h3 className={styles.subhead}>Inquiry</h3>
              {inquiry.subject && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Subject</span>
                  <span className={styles.metaValue}>{inquiry.subject}</span>
                </div>
              )}
              {inquiry.message && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Message</span>
                  <pre className={styles.message}>{inquiry.message}</pre>
                </div>
              )}
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Source</span>
                <span className={styles.metaValue}>
                  {inquiry.source || '—'}
                </span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Source site</span>
                <span className={styles.metaValue}>{inquiry.source_site}</span>
              </div>
            </section>

            {/* Actions */}
            <section className={styles.actions}>
              <a
                href={`mailto:${inquiry.person_email}`}
                className="btn btn-white"
              >
                Reply via mail
              </a>
              <button
                type="button"
                onClick={handleDelete}
                className={styles.deleteBtn}
                disabled={saving}
              >
                Delete inquiry
              </button>
            </section>
          </div>
        )}
      </aside>
    </>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  disabled?: boolean
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        className={styles.fieldInput}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </label>
  )
}
