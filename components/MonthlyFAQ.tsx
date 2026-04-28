'use client'

import { useState } from 'react'
import styles from './MonthlyFAQ.module.css'

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.faqItem}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
      </button>
      <div className={`${styles.body} ${open ? styles.bodyOpen : ''}`}>
        <div className={styles.bodyInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function MonthlyFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={styles.faqList}>
      {items.map((item, i) => (
        <FAQItem key={i} question={item.q} answer={item.a} />
      ))}
    </div>
  )
}
