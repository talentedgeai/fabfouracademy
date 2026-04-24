import Link from 'next/link'
import PhotoStrip from './PhotoStrip'
import styles from './WordsOfWisdom.module.css'

export default function WordsOfWisdom() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="eyebrow">Daily Reflection</span>
          <h2 className={styles.h2}>Daily Words of Wisdom</h2>
          <p className={styles.tagline}>One song. One insight. Every day.</p>
          <p className={styles.desc}>
            Each day, a single Beatles song becomes a starting point for reflection on
            creativity, collaboration, relationships, and life. These brief insights help
            you reconnect with the music you love and discover new meaning within it —
            one song at a time.
          </p>
        </div>
      </div>

      <PhotoStrip />

      <div className={`container ${styles.inner}`}>

        <div className={styles.card}>
          <span className={styles.badge}>Today&apos;s Reflection</span>
          <h4 className={styles.cardTitle}>End of the Line</h4>
          <div className={styles.cardRule} />
          <p className={styles.cardBody}>
            There is something quietly extraordinary about the circumstances surrounding this
            song's music video — a meditation on endings, legacy, and the quiet grace of
            arriving somewhere worth being.
          </p>
          <Link
            href="https://www.fabfouracademy.com/words-of-wisdom-content/end-of-the-line"
            className="btn btn-blue"
            target="_blank"
            rel="noopener"
          >
            Read Full Reflection
          </Link>
        </div>

        <div className={styles.ctas}>
          <Link href="/daily-words-of-wisdom" className="btn btn-primary">
            Explore All Reflections
          </Link>
          <Link href="/join-fab-four-community" className="btn btn-yellow">
            Get Daily Wisdom by Email
          </Link>
        </div>
      </div>
    </section>
  )
}
