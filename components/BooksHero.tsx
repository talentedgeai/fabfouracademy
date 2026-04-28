import DynamicHeading from './DynamicHeading'
import styles from './BooksHero.module.css'

export default function BooksHero() {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">Books</span>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="The Wisdom of "
          line2="The Beatles"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />
        <p className={styles.subtitle}>
          Be the first to be inspired by the most iconic band of our generation.
        </p>
      </div>
    </section>
  )
}
