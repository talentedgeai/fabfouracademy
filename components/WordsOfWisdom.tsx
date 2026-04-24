import Link from 'next/link'
import Image from 'next/image'
import PhotoStrip from './PhotoStrip'
import styles from './WordsOfWisdom.module.css'

export default function WordsOfWisdom() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <h2 className={styles.h2}>Daily Words of Wisdom</h2>
          <p className={styles.tagline}>One song. One insight. Every day.</p>
          <p className={styles.desc}>
            Each day, a single Beatles song becomes a starting point for reflection on
            creativity, collaboration, relationships, and life. These brief insights help
            you reconnect with the music you love and discover new meaning within it,
            one song at a time.
          </p>
        </div>
      </div>

      <PhotoStrip />

      <div className={`container ${styles.cardSection}`}>

        {/* "Today's Words of Wisdom" label */}
        <h3 className={styles.todayHeading}>
          <span className={styles.todayOrange}>Today&apos;s </span>
          <span className={styles.todayBlue}>Words of Wisdom</span>
        </h3>

        {/* Amber card */}
        <div className={styles.card}>
          <div className={styles.cardLeft}>
            <span className={styles.cardDate}>April 24</span>
            <h4 className={styles.cardTitle}>End of the Line</h4>
            <p className={styles.cardBody}>
              There is something quietly extraordinary about the circumstances surrounding this
              song&apos;s music video — a meditation on endings, legacy, and the quiet grace of
              arriving somewhere worth being.
            </p>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.cardImageWrap}>
              <Image
                src="/images/home-carousel-1.webp"
                alt="Song artwork"
                fill
                className={styles.cardImage}
              />
            </div>
            <Link
              href="https://www.fabfouracademy.com/words-of-wisdom-content/end-of-the-line"
              className={styles.cardBtn}
              target="_blank"
              rel="noopener"
            >
              Read Full Reflection
              <span className={styles.cardBtnArrow}>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
