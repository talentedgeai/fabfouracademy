import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './WOWCTA.module.css'

export default function WOWCTA() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Come Together with"
          line2="The Fab Four Community"
          dividerSrc="/images/divider-white.png"
          line1Color="#ffffff"
          line2Color="#ffffff"
          centered
        />
        <p className={styles.body}>
          Get your daily dose of Beatles-inspired wisdom, straight to your inbox.
        </p>
        <Link href="/join-fab-four-community" className="btn btn-yellow">
          Join the Community
        </Link>
      </div>
    </section>
  )
}
