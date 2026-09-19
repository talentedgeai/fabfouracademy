'use client'

import { useState } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import PasswordInput from '@/components/admin/PasswordInput'
import styles from '../_components/adminPage.module.css'

export default function AdminAccountPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const { error } = await createBrowserClient().auth.updateUser({ password })
    setMessage(error ? error.message : 'Password changed.')
    if (!error) setPassword('')
    setBusy(false)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Account</p>
        <h1 className={styles.title}>Change password</h1>
        <p className={styles.lede}>Replace the first-time password you were given.</p>
      </header>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          New password
          <PasswordInput
            id="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>
        {message && <p className={styles.cardMeta}>{message}</p>}
        <button type="submit" disabled={busy} className={styles.button}>
          {busy ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </div>
  )
}
