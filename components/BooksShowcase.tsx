import Image from 'next/image'
import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './BooksShowcase.module.css'

const PILLARS_BULLETS = [
  'Right people, right seats',
  'Catalytic vision',
  'Esprit de corps',
  '"Magical mystery" of synergy and serendipity',
]

const WISDOM_BULLETS = [
  'A powerful quote from The Beatles',
  'A meaningful lesson learned from their quote',
  'A reflection question to deepen your understanding',
  'A practical challenge to encourage personal growth and purposeful living',
]

export default function BooksShowcase() {
  return (
    <>
      {/* ── Book 1: Fab Four Pillars of Impact ───── */}
      <section className={styles.bookSection}>
        <div className={`container ${styles.bookInner}`}>
          <div className={styles.bookContent}>
            <span className={styles.releaseBadge}>Release Date: February 3, 2026</span>
            <DynamicHeading
              line1="Fab Four "
              line2="Pillars of Impact"
              dividerSrc="/images/divider-blue.png"
              line1Color="#000000"
              line2Color="#000000"
            />
            <p className={styles.body}>
              What if the secret formula for organizational excellence has been hiding in plain
              sight for over sixty years, embedded in the remarkable story of the most successful
              musical group of all time? Dan Absher, longtime CEO, coach, and educator, presents
              The Beatles as the ultimate case study for building exceptional teams. Drawing from
              The Beatles&apos; meteoric rise and infamous breakup, Absher identifies four
              transformative pillars of enduring excellence:
            </p>
            <ul className={styles.bullets}>
              {PILLARS_BULLETS.map((b) => (
                <li key={b} className={styles.bullet}>{b}</li>
              ))}
            </ul>
            <div className={styles.ctas}>
              <Link href="/the-fab-four-pillars-of-impact" className="btn btn-primary">
                Book Details
              </Link>
              <Link
                href="https://www.amazon.com/s?k=fab+four+pillars+of+impact"
                className="btn btn-blue"
                target="_blank"
                rel="noopener"
              >
                Order Now on Amazon
              </Link>
            </div>
          </div>

          <div className={styles.bookImageWrap}>
            <Image
              src="/images/books-Fab-Four-Pillars-of-Impact.png"
              alt="Fab Four Pillars of Impact book cover"
              width={400}
              height={520}
              className={styles.bookImg}
            />
          </div>
        </div>
      </section>

      {/* ── Book 2: Daily Words of Wisdom ─────────── */}
      <section className={`${styles.bookSection} ${styles.bookSectionAlt}`}>
        <div className={`container ${styles.bookInner}`}>
          <div className={styles.bookImageWrap}>
            <Image
              src="/images/books-Daily-Words-of-Wisdom.png"
              alt="Daily Words of Wisdom book cover"
              width={400}
              height={520}
              className={styles.bookImg}
            />
          </div>

          <div className={styles.bookContent}>
            <span className={styles.releaseBadge}>Release Date: Summer 2026</span>
            <DynamicHeading
              line1="Daily "
              line2="Words of Wisdom"
              dividerSrc="/images/divider-blue.png"
              line1Color="#000000"
              line2Color="#000000"
            />
            <p className={styles.body}>
              The Daily Words of Wisdom book offers 365 days of carefully crafted insights for
              self growth. Each day includes:
            </p>
            <ul className={styles.bullets}>
              {WISDOM_BULLETS.map((b) => (
                <li key={b} className={styles.bullet}>{b}</li>
              ))}
            </ul>
            <p className={styles.note}>
              The first 100 people to{' '}
              <Link href="/join-fab-four-community" className={styles.noteLink}>
                sign up for the community
              </Link>
              {' '}will get a free digital copy. This book is your daily companion to inspire
              reflection, action, and meaningful change throughout the year.
            </p>
            <div className={styles.ctas}>
              <Link href="/join-fab-four-community" className="btn btn-primary">
                Join The Community
              </Link>
              <Link
                href="https://www.facebook.com/fabfouracademy/"
                className="btn btn-blue"
                target="_blank"
                rel="noopener"
              >
                Follow the Journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
