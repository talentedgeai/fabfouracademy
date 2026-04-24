'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'

const SPEAKING_ITEMS = [
  { label: 'Keynotes', href: '/keynotes' },
  { label: 'Book Dan', href: '/book-dan-absher' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [speakingOpen, setSpeakingOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const speakingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (speakingRef.current && !speakingRef.current.contains(e.target as Node)) {
        setSpeakingOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <Link href="/daily-words-of-wisdom" className={styles.link}>
            Words of Wisdom
          </Link>
          <Link href="/books" className={styles.link}>
            Books
          </Link>

          <div className={styles.dropdown} ref={speakingRef}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setSpeakingOpen(!speakingOpen)}
              aria-expanded={speakingOpen}
            >
              Speaking
              <svg
                className={`${styles.chevron} ${speakingOpen ? styles.chevronOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {speakingOpen && (
              <div className={styles.dropdownMenu}>
                {SPEAKING_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.dropdownItem}
                    onClick={() => setSpeakingOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/join-fab-four-community" className="btn btn-primary">
            Join the Community
          </Link>
        </div>
      </div>
    </nav>
  )
}
