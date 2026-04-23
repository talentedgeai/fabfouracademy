import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.decorLeft} aria-hidden="true">
        <Image src="/images/decor-left-1.png" alt="" width={100} height={260} />
        <Image src="/images/decor-left-2.png" alt="" width={80} height={180} />
      </div>
      <div className={styles.decorRight} aria-hidden="true">
        <Image src="/images/decor-right-1.png" alt="" width={100} height={260} />
        <Image src="/images/decor-right-2.png" alt="" width={80} height={180} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className="eyebrow">New Release · February 2026</span>

          <div className={styles.titleWrap}>
            <h1 className={styles.h1}>
              The Fab Four<br />Pillars of Impact
            </h1>
            <div className={styles.yellowBrush} aria-hidden="true">
              <Image
                src="/images/home-hero-yellowbrush.png"
                alt=""
                fill
                style={{ objectFit: 'fill' }}
              />
            </div>
          </div>

          <p className={styles.subtitle}>
            Seeing the Beatles — Their Music — Their Business — More Clearly
          </p>
          <p className={styles.body}>
            What if the music you've loved for years still has more to teach you? Dan Absher
            explores The Beatles not just as legendary musicians, but as four human beings
            learning how to work, create, and evolve together.
          </p>

          <div className={styles.ctas}>
            <Link
              href="https://www.amazon.com/s?k=fab+four+pillars+of+impact"
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Get the Book
            </Link>
            <Link href="/the-fab-four-pillars-of-impact" className="btn btn-blue">
              Learn More
            </Link>
          </div>

          <div className={styles.qrRow}>
            <Image src="/images/home-hero-QR.png" alt="QR code to get the book" width={64} height={64} />
            <span className={styles.qrLabel}>Scan to get the book</span>
          </div>
        </div>

        <div className={styles.bookWrap}>
          <div className={styles.bookContainer}>
            <Image
              src="/images/home-hero-book.png"
              alt="The Fab Four Pillars of Impact — book cover"
              fill
              className={styles.bookImg}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
