import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

const NAV_LINKS = [
  { label: 'Words of Wisdom', href: '/daily-words-of-wisdom' },
  { label: 'Books', href: '/books' },
  { label: 'Keynotes', href: '/keynotes' },
  { label: 'Book Dan', href: '/book-dan-absher' },
  { label: 'Join The Community', href: '/join-fab-four-community' },
  { label: 'Blog', href: '/blog' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Fab-Four-Academy/61579374107530/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/fab-four-academy/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@FabFourAcademy' },
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
            <p className={styles.tagline}>
              Leadership, harmony, and human-centered excellence — through the lens of The
              Beatles.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.social}>
            <p className={styles.socialLabel}>Follow Along</p>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2025 by Fab Four Academy</p>
        </div>
      </div>
    </footer>
  )
}
