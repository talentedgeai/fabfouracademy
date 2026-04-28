import DynamicHeading from './DynamicHeading'
import styles from './BookDanHero.module.css'

export default function BookDanHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Book Dan</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Book Dan"
          line2="Absher"
          dividerSrc="/images/divider-blue.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />
        <p className={styles.subtitle}>
          For your next conference, workshop, or retreat — reserve your date with Dan Absher.
        </p>
      </div>
    </section>
  )
}
