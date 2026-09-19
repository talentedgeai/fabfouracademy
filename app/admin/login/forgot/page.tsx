'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) setSent(true)
    else setError('Something went wrong. Try again.')
    setBusy(false)
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} className={styles.card}>
        <span className={styles.brand}>FAB FOUR ADMIN</span>
        <h1 className={styles.heading}>Forgot password</h1>
        {sent ? (
          <p className={styles.note}>
            If {email} is an admin account, a reset link is on its way. It works once and expires
            in an hour.
          </p>
        ) : (
          <>
            <label className={styles.label}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
                className={styles.input}
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={busy} className={styles.submit}>
              {busy ? 'Sending…' : 'Email me a reset link'}
            </button>
          </>
        )}
        <Link href="/admin/login" className={styles.link}>
          Back to sign in
        </Link>
      </form>
    </div>
  )
}
