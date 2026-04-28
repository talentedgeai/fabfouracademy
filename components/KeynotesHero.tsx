import DynamicHeading from './DynamicHeading'
import styles from './KeynotesHero.module.css'

export default function KeynotesHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Keynotes</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Keynotes That Build "
          line2="Stronger Teams"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />
        <p className={styles.subtitle}>
          Dan Absher infuses your event with the iconic energy of The Beatles. If you&apos;re looking for a keynote speaker, motivational speaker, business speaker, or guest speaker who will captivate and engage your audience, Dan can help bring your event to life.
        </p>
      </div>
    </section>
  )
}
