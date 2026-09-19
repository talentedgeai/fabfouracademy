'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase-browser'
import PasswordInput from '@/components/admin/PasswordInput'
import styles from '../page.module.css'

function ResetForm() {
  const router = useRouter()
  const tokenHash = useSearchParams().get('token_hash')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // The token is only spent on submit, so mail scanners that prefetch the
  // link do not use it up.
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const supabase = createBrowserClient()
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type: 'recovery',
      token_hash: tokenHash ?? '',
    })
    if (verifyError) {
      setError('This reset link is invalid or has expired. Ask for a new one.')
      setBusy(false)
      return
    }
    const { error: updateError } = await supabase.auth.updateUser({ password })
    if (updateError) {
      setError(updateError.message)
      setBusy(false)
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className={styles.card}>
      <span className={styles.brand}>FAB FOUR ADMIN</span>
      <h1 className={styles.heading}>Choose a new password</h1>
      <label className={styles.label}>
        New password
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" disabled={busy} className={styles.submit}>
        {busy ? 'Saving…' : 'Save password and sign in'}
      </button>
      <Link href="/admin/login/forgot" className={styles.link}>
        Send a new reset link
      </Link>
    </form>
  )
}

export default function AdminResetPasswordPage() {
  return (
    <div className={styles.wrap}>
      <Suspense>
        <ResetForm />
      </Suspense>
    </div>
  )
}
