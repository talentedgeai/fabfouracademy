import Link from 'next/link'
import styles from './CTABanner.module.css'

export default function CTABanner() {
  return (
    <section className={styles.banner}>
      <div className={`container ${styles.inner}`}>
        <h2 className={styles.heading}>Come Together with The Fab Four Community</h2>
        <p className={styles.sub}>
          Get Beatles-inspired insights delivered to your inbox every morning. Join fans
          around the world discovering leadership, creativity, and life — one song at a time.
        </p>
        <Link href="/join-fab-four-community" className="btn btn-primary">
          Join the Community — It&apos;s Free
        </Link>
      </div>
    </section>
  )
}
