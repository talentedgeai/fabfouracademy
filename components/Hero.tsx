import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'


export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        {/* Left: text content */}
        <div className={styles.content}>
          <h1 className={styles.h1}>
            The Fab Four<br />
            <span className={styles.h1Line2}>
              Pillars of Impact
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/divider.png" alt="" aria-hidden="true" className={styles.divider} />
            </span>
          </h1>

          <p className={styles.subtitle}>
            Seeing the Beatles — Their Music — Their Business — More Clearly
          </p>
          <p className={styles.body}>
            What if the music you&apos;ve loved for years still has more to teach you? In{' '}
            <em>The Fab Four Pillars of Impact</em>, Dan Absher explores The Beatles not just
            as legendary musicians, but as four human beings learning how to work, create, and
            evolve together. Drawing on a lifetime of listening and deep study, the book reveals
            the dynamics beneath the songs — the trust, tension, vision, and creativity that
            shaped the music we still return to today. This is a book for Beatles fans who want
            to go beyond trivia and rediscover the music with deeper understanding, perspective,
            and meaning.
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
        </div>

        {/* Right: hero image + QR */}
        <div className={styles.imageCol}>
          <div className={styles.heroImgContainer}>
            <Image
              src="/images/home-hero.png"
              alt="The Fab Four Pillars of Impact"
              width={600}
              height={800}
              className={styles.heroImg}
              priority
            />
          </div>
          <div className={styles.qrRow}>
            <Image src="/images/home-hero-QR.png" alt="QR code to get the book" width={56} height={56} />
            <span className={styles.qrLabel}>Scan to get the book</span>
          </div>
        </div>
      </div>
    </section>
  )
}
