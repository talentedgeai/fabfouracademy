'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Words of Wisdom', href: '/daily-words-of-wisdom' },
  { label: 'Books', href: '/books' },
  { label: 'Keynotes', href: '/keynotes' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Fab Four Academy"
            width={140}
            height={48}
            style={{ width: '140px', height: 'auto' }}
            priority
          />
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.links} ${open ? styles.open : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
          <Link href="/book-dan-absher" className="btn btn-primary">
            Book Dan
          </Link>
        </div>
      </div>
    </nav>
  )
}
