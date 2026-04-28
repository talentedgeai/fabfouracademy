import DynamicHeading from './DynamicHeading'
import styles from './JoinHero.module.css'

export default function JoinHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Community</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Join The Fab Four"
          line2="Community"
          dividerSrc="/images/divider-yellow.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
        />
        <p className={styles.subtitle}>
          Beatles-inspired insights delivered to your inbox
        </p>
      </div>
    </section>
  )
}
