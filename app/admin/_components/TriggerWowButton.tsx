'use client'

import { useState } from 'react'
import styles from './TriggerWowButton.module.css'

type Result = {
  ok: boolean
  post?: { slug: string; title: string }
  total?: number
  sent?: number
  skipped?: number
  failed?: number
  reason?: string
}

export default function TriggerWowButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<Result | null>(null)

  async function handleClick() {
    setStatus('loading')
    setResult(null)
    try {
      const res = await fetch('/api/admin/trigger-wow', { method: 'POST' })
      const data: Result = await res.json()
      setResult(data)
      setStatus(data.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
      setResult({ ok: false, reason: 'network_error' })
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.btn}
        onClick={handleClick}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send Today\'s WoW Now'}
      </button>

      {result && (
        <p className={status === 'done' ? styles.success : styles.errorMsg}>
          {result.ok
            ? `Sent ${result.sent} · Skipped ${result.skipped} · Failed ${result.failed} — "${result.post?.title}"`
            : `Failed: ${result.reason}`}
        </p>
      )}
    </div>
  )
}
