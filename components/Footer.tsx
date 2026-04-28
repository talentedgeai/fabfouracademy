import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { label: 'Words of Wisdom', href: '/daily-words-of-wisdom' },
  { label: 'Books', href: '/dan-absher-books' },
  { label: 'Keynotes', href: '/dan-absher-keynote-speaker' },
  { label: 'Book Dan', href: '/book-dan-absher' },
  { label: 'Join The Community', href: '/join-fab-four-community' },
  { label: 'Blog', href: '/blog' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Fab-Four-Academy/61579374107530/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/fab-four-academy/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@FabFourAcademy',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>

          <div className={styles.brand}>
            <Image
              src="/logo.png"
              alt="Fab Four Academy"
              width={140}
              height={48}
              style={{ width: '140px', height: 'auto' }}
            />
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
<div className={styles.socialIcons}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className={styles.copyright}>© 2025 by Fab Four Academy</p>
          </div>

        </div>
      </div>
    </footer>
  )
}
