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
        />

        <div className={styles.faqList}>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What will I get when I join the Fab Four Community?</h3>
            <p className={styles.answer}>
              When you join, you&apos;ll receive the Daily Words of Wisdom email every morning — a short, Beatles-inspired message designed to start your day with purpose and positivity. You&apos;ll also be the first to know about new books, workshops, and events from Fab Four Academy, and you&apos;ll be part of a growing community of Beatles fans who are passionate about leadership, creativity, and living well.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What is the Daily Words of Wisdom email?</h3>
            <p className={styles.answer}>
              The Daily Words of Wisdom email is a short, inspiring message delivered to your inbox each morning. Each edition features a meaningful quote from The Beatles, a brief reflection on what that quote means for your life or leadership, and a simple action or question to carry with you through the day. It&apos;s the kind of thing you can read in two minutes but think about all day long.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>Is the Fab Four Community free to join?</h3>
            <p className={styles.answer}>
              Yes — it&apos;s completely free! Just sign up with your name and email and you&apos;ll be subscribed to the Daily Words of Wisdom. As a bonus, the first 100 people to join will receive a free digital copy of Dan Absher&apos;s book <em>Daily Words of Wisdom</em> when it launches in Summer 2026.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>Do I need to be a Beatles fan to get value from this?</h3>
            <p className={styles.answer}>
              Not at all. The Daily Words of Wisdom draws on the timeless themes of The Beatles&apos; music and journey — creativity, collaboration, resilience, purpose, joy — that resonate with anyone who cares about living and leading well. But don&apos;t be surprised if you walk away humming a Beatles song or two.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
