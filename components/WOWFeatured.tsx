import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './WOWFeatured.module.css'

export default function WOWFeatured() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Today's Words "
          line2="of Wisdom"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        <div className={styles.card}>
          <span className={styles.badge}>May 30, 2026</span>
          <h2 className={styles.title}>End of the Line</h2>
          <p className={styles.teaser}>
            There is something quietly extraordinary about the circumstances surrounding this song&apos;s music video...
          </p>
          <Link
            href="https://www.fabfouracademy.com/words-of-wisdom-content/end-of-the-line"
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
          >
            Read Full Reflection
          </Link>
        </div>
      </div>
    </section>
  )
}
