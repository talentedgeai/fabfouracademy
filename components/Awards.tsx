import Image from 'next/image'
import styles from './Awards.module.css'

export default function Awards() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.eyebrow}>Award-Winning</span>
        <h2 className={styles.h2}>Recognized for Excellence</h2>
        <p className={styles.intro}>
          The Fab Four Pillars of Impact is a Silver Winner in the Nonfiction Book Awards,
          presented by the Nonfiction Authors Association.
        </p>
        <div className={styles.imgWrap}>
          <Image
            src="/images/award-nonfiction-silver.webp"
            alt="Nonfiction Book Awards Silver Winner — The Fab Four Pillars of Impact"
            width={470}
            height={394}
            className={styles.img}
          />
        </div>
      </div>
    </section>
  )
}
