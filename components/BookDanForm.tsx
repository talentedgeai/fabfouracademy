'use client'

import { useState, FormEvent } from 'react'
import styles from './BookDanForm.module.css'

type Status = 'idle' | 'pending' | 'success' | 'error'

export default function BookDanForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [organization, setOrganization] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventType, setEventType] = useState('')
  const [audience, setAudience] = useState('')
  const [sessionLength, setSessionLength] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'pending') return

    setStatus('pending')
    setErrorMessage('')

    const messageLines: string[] = []
    if (eventDate) messageLines.push(`Event date(s) & location: ${eventDate}`)
    if (eventType) messageLines.push(`Event type: ${eventType}`)
    if (audience) messageLines.push(`Audience: ${audience}`)
    if (sessionLength) messageLines.push(`Session length: ${sessionLength}`)
    if (details) messageLines.push(details)
    const message = messageLines.length ? messageLines.join('\n\n') : undefined

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'keynote',
          email,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          phone: phone || undefined,
          organization: organization || undefined,
          message,
          source: '/book-dan-absher',
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data?.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {status === 'success' ? (
          <div className={styles.thanks} role="status" aria-live="polite">
            <h3 className={styles.thanksTitle}>Thanks — your request is in.</h3>
            <p className={styles.thanksBody}>
              Dan reviews booking inquiries personally. Expect a reply within
              two business days.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">First Name</label>
                <input
                  className={styles.input}
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">Last Name</label>
                <input
                  className={styles.input}
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">Phone</label>
              <input
                className={styles.input}
                id="phone"
                name="phone"
                type="tel"
                placeholder="Include country code"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="organization">Organization / Event Host</label>
              <input
                className={styles.input}
                id="organization"
                name="organization"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="eventDate">Event Date(s) &amp; Location</label>
              <input
                className={styles.input}
                id="eventDate"
                name="eventDate"
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="eventType">Event Type</label>
              <select
                className={styles.select}
                id="eventType"
                name="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                disabled={status === 'pending'}
              >
                <option value="">Select event type</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="retreat">Retreat</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="audience">Audience Size &amp; Profile</label>
              <input
                className={styles.input}
                id="audience"
                name="audience"
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="sessionLength">Preferred Session Length</label>
              <select
                className={styles.select}
                id="sessionLength"
                name="sessionLength"
                value={sessionLength}
                onChange={(e) => setSessionLength(e.target.value)}
                disabled={status === 'pending'}
              >
                <option value="">Select session length</option>
                <option value="1hour">1 Hour</option>
                <option value="2hours">2 Hours</option>
                <option value="4hours">4 Hours</option>
                <option value="multiday">Multi-Day Retreat</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="details">Additional Details / Questions</label>
              <textarea
                className={styles.textarea}
                id="details"
                name="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                disabled={status === 'pending'}
              />
            </div>

            {status === 'error' && (
              <p className={styles.error} role="alert">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Submitting…' : 'Submit Booking Request'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
