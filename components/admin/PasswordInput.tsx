'use client'

import { useState } from 'react'
import styles from './PasswordInput.module.css'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>

// Password field with an eye button to reveal what was typed. Use this for
// every password input in the admin.
export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false)

  return (
    <span className={styles.wrap}>
      <input {...props} type={visible ? 'text' : 'password'} className={styles.input} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        className={styles.toggle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
          {visible && <path d="M4 4l16 16" />}
        </svg>
      </button>
    </span>
  )
}
