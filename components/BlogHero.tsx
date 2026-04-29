import DynamicHeading from './DynamicHeading'
import styles from './BlogHero.module.css'

export default function BlogHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Blog</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="The Beatles "
          line2="Blog"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />
      </div>
    </section>
  )
}
