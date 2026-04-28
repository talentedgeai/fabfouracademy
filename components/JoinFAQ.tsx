import DynamicHeading from './DynamicHeading'
import styles from './JoinFAQ.module.css'

export default function JoinFAQ() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Frequently Asked "
          line2="Questions"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          singleLine
        />

        <div className={styles.faqList}>

          <details className={styles.faqItem}>
            <summary className={styles.question}>What will I get when I join the Fab Four Community?</summary>
            <div className={styles.faqAnswer}>
              <p className={styles.answer}>When you join, you&apos;ll receive the <strong>Daily Words of Wisdom</strong> email every morning — featuring Beatles-inspired insights to start your day. You&apos;ll also get <strong>early access</strong> to book releases, new workshop announcements, and occasional <strong>special offers</strong> from Fab Four Academy.</p>
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.question}>What is the Daily Words of Wisdom email?</summary>
            <div className={styles.faqAnswer}>
              <p className={styles.answer}>The <strong>Daily Words of Wisdom</strong> email is a short, inspiring message delivered to your inbox every morning. Each email features a Beatles song, a behind-the-scenes story about its creation, and a powerful life or leadership insight. You&apos;ll also get a personal affirmation and a reflection question to carry with you through the day.</p>
              <p className={styles.answer}>Think of it as your daily dose of Beatles-inspired clarity, creativity, and connection.</p>
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.question}>Is the Fab Four Community free to join?</summary>
            <div className={styles.faqAnswer}>
              <p className={styles.answer}>Yes — it&apos;s completely free! Just sign up with your name, email, and favorite Beatles song to get started. Once you subscribe, you&apos;ll receive the <em>Daily Words of Wisdom</em> in your inbox every morning, along with updates on book releases, upcoming workshops, and exclusive special offers.</p>
            </div>
          </details>

          <details className={styles.faqItem}>
            <summary className={styles.question}>Do I need to be a Beatles fan to get value from this?</summary>
            <div className={styles.faqAnswer}>
              <p className={styles.answer}>Not at all. But don&apos;t be surprised if you walk away humming a Beatles song.</p>
              <p className={styles.answer}>Fab Four Academy uses the story and music of The Beatles as a lens to explore life, leadership, teamwork, and creativity. Whether you&apos;re a fan or not, you&apos;ll leave with fresh insights and practical takeaways.</p>
            </div>
          </details>

        </div>
      </div>
    </section>
  )
}
