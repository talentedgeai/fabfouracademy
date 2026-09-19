'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase-browser'
import PasswordInput from '@/components/admin/PasswordInput'
import styles from './page.module.css'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const supabase = createBrowserClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (signInError) {
      setError(signInError.message)
      setBusy(false)
      return
    }
    if (data.user?.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut()
      setError('This account is not an admin.')
      setBusy(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <div className={styles.wrap}>
      <form onSubmit={onSubmit} className={styles.card}>
        <span className={styles.brand}>FAB FOUR ADMIN</span>
        <h1 className={styles.heading}>Sign in</h1>
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
        <label className={styles.label}>
          Password
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={busy} className={styles.submit}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link href="/admin/login/forgot" className={styles.link}>
          Forgot password?
        </Link>
      </form>
    </div>
  )
}
