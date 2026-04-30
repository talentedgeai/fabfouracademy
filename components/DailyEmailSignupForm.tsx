/**
 * Minimal free-tier signup form. Email + first name only — anything more is
 * friction. Posts to /api/contacts (type=newsletter) and shows an inline
 * thank-you state on success.
 *
 * Reached from the "Click here" callout on /join-fab-four-community.
 */

'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import styles from './DailyEmailSignupForm.module.css'

type Status = 'idle' | 'pending' | 'success' | 'error'

export default function DailyEmailSignupForm() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'pending') return

    setStatus('pending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email,
          first_name: firstName || undefined,
          source: '/daily-email-signup',
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
        <header className={styles.header}>
          <span className="eyebrow">Free, always</span>
          <h1 className={styles.heading}>Daily Words of Wisdom, in your inbox</h1>
          <p className={styles.lede}>
            One short reflection from Dan, framed by The Beatles, every morning.
            Built around the daily loop — read it on your phone with your
            coffee, take one small thing into the day.
          </p>
        </header>

        <div className={styles.card}>
          {status === 'success' ? (
            <div className={styles.thanks} role="status" aria-live="polite">
              <h2 className={styles.thanksTitle}>You&apos;re in.</h2>
              <p className={styles.thanksBody}>
                Thanks for subscribing. Tomorrow morning your first daily Words
                of Wisdom will land in your inbox.
              </p>
              <p className={styles.thanksBody}>
                Whenever you change your mind about Membership,{' '}
                <Link href="/join-fab-four-community" className={styles.link}>
                  the door is open →
                </Link>
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">
                  First name <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  className={styles.input}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.input}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>

              {status === 'error' && (
                <p className={styles.error} role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'pending' || !email}
              >
                {status === 'pending' ? 'Subscribing…' : 'Send me the daily'}
              </button>

              <p className={styles.fineprint}>
                One email a day. Unsubscribe in one click. We never share your
                address.
              </p>
            </form>
          )}
        </div>

        <p className={styles.upsell}>
          Looking for the full archive, masterclasses, and a signed copy of{' '}
          <em>The Fab Four Pillars of Impact</em>?{' '}
          <Link href="/join-fab-four-community" className={styles.link}>
            See Member &amp; Founding tiers →
          </Link>
        </p>
      </div>
    </section>
  )
}
