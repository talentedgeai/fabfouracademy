import DynamicHeading from './DynamicHeading'
import styles from './WOWHero.module.css'

export default function WOWHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Wisdom</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Daily Words of "
          line2="Wisdom"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />
        <p className={styles.subtitle}>
          Beatles-inspired insights delivered to your inbox every morning.
        </p>
      </div>
    </section>
  )
}
