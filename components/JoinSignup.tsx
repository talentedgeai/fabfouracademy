'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import styles from './JoinSignup.module.css'

const BENEFITS = [
  { text: 'Beatles-inspired insights delivered to your inbox', img: '/images/point1.png' },
  { text: 'Connect with Beatles fans around the world', img: '/images/point2.png' },
  { text: 'Early access to books and workshops', img: '/images/point3.png' },
  { text: 'One great song to start your day!', img: '/images/point4.png' },
]

type Status = 'idle' | 'pending' | 'success' | 'error'

interface JoinSignupProps {
  source?: string
  heading?: string
  subheading?: string
}

export default function JoinSignup({
  source = '/join-fab-four-community',
  heading,
  subheading,
}: JoinSignupProps = {}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [favoriteSong, setFavoriteSong] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'pending') return

    if (!consent) {
      setStatus('error')
      setErrorMessage('Please confirm you agree to receive daily emails.')
      return
    }

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
          last_name: lastName || undefined,
          phone: phone || undefined,
          favorite_song: favoriteSong || undefined,
          source,
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
      <div className="container">
        {(heading || subheading) && (
          <div className={styles.headingBlock}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            {subheading && <p className={styles.subheading}>{subheading}</p>}
          </div>
        )}
      </div>
      <div className={`container ${styles.inner}`}>

        {/* ── Left: benefits with images ─────────── */}
        <ul className={styles.benefits}>
          {BENEFITS.map((b) => (
            <li key={b.text} className={styles.benefit}>
              <div className={styles.benefitImg}>
                <Image
                  src={b.img}
                  alt=""
                  aria-hidden="true"
                  fill
                  className={styles.img}
                />
              </div>
              <span className={styles.benefitText}>{b.text}</span>
            </li>
          ))}
        </ul>

        {/* ── Right: sign-up form ────────────────── */}
        <div className={styles.formSide}>
          {status === 'success' ? (
            <div className={styles.thanks} role="status" aria-live="polite">
              <h3 className={styles.thanksTitle}>You&apos;re in.</h3>
              <p className={styles.thanksBody}>
                Thanks for joining the Fab Four community. Check your inbox for
                tomorrow&apos;s Words of Wisdom.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="joinFirstName">First Name</label>
                  <input
                    className={styles.input}
                    id="joinFirstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={status === 'pending'}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="joinLastName">Last Name</label>
                  <input
                    className={styles.input}
                    id="joinLastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={status === 'pending'}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="joinEmail">Email</label>
                <input
                  className={styles.input}
                  id="joinEmail"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="joinPhone">Phone</label>
                <input
                  className={styles.input}
                  id="joinPhone"
                  name="phone"
                  type="tel"
                  placeholder="Include country code"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="favoriteSong">Favorite Beatles Song</label>
                <input
                  className={styles.input}
                  id="favoriteSong"
                  name="favoriteSong"
                  type="text"
                  value={favoriteSong}
                  onChange={(e) => setFavoriteSong(e.target.value)}
                  disabled={status === 'pending'}
                />
              </div>

              <div className={styles.checkboxRow}>
                <input
                  className={styles.checkbox}
                  id="joinConsent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === 'pending'}
                />
                <label className={styles.checkboxLabel} htmlFor="joinConsent">
                  I agree to receive daily emails from Fab Four Academy
                </label>
              </div>

              {status === 'error' && (
                <p className={styles.error} role="alert">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'pending'}
              >
                {status === 'pending' ? 'Subscribing…' : 'Subscribe Now'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
