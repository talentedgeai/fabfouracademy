'use client'

import { useState } from 'react'
import styles from './TriggerWowButton.module.css'

type ResultLine = { email: string; ok: boolean; reason?: string; message?: string }

type Result = {
  ok: boolean
  post?: { slug: string; title: string }
  total?: number
  sent?: number
  failed?: number
  reason?: string
  results?: ResultLine[]
}

/**
 * Secondary button that calls /api/admin/trigger-wow-test.
 * Sends today's Words of Wisdom to a fixed test list (see route file) so we
 * can validate sender + rendering without touching the real broadcast.
 */
export default function TriggerWowTestButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<Result | null>(null)

  async function handleClick() {
    setStatus('loading')
    setResult(null)
    try {
      const res = await fetch('/api/admin/trigger-wow-test', { method: 'POST' })
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
        style={{ background: '#2d7a2d' }}
        onClick={handleClick}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending test…' : 'Send Test (me + Anh)'}
      </button>

      {result && (
        <p className={status === 'done' ? styles.success : styles.errorMsg}>
          {result.ok
            ? `Test sent ${result.sent}/${result.total} — "${result.post?.title}"`
            : `Test failed: ${result.reason ?? 'see results'}${
                result.results
                  ? ' — ' +
                    result.results
                      .map((r) =>
                        r.ok
                          ? `${r.email}:ok`
                          : `${r.email}: ${r.reason ?? 'fail'}${r.message ? ` (${r.message})` : ''}`,
                      )
                      .join(' · ')
                  : ''
              }`}
        </p>
      )}
    </div>
  )
}
