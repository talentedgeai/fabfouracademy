import Image from 'next/image'
import DynamicHeading from './DynamicHeading'
import styles from './KeynotesTopics.module.css'

const PILLARS_BULLETS = [
  'The Train: Right People, Right Seats — How assembling complementary talents and creating clearly defined roles establishes the foundation for exceptional performance.',
  'Catalytic Vision — How a compelling purpose energizes teams and propels them toward greatness, especially when broken down into achievable interim goals.',
  'Esprit de Corps — How setting aside egos, fostering friendly competition, and maintaining a sense of humor creates the team spirit essential for sustained excellence.',
  'The Magical Mystery — How to cultivate the synergy and serendipity that transforms good teams into legendary ones, creating something greater than the sum of its parts.',
]

export default function KeynotesTopics() {
  return (
    <>
      {/* ── Topic 1: From Passion to Purpose ───── */}
      <section className={styles.topicSection}>
        <div className={`container ${styles.topicInner}`}>
          <div className={styles.topicContent}>
            <span className={styles.eyebrow}>90-Minute Keynote</span>
            <DynamicHeading
              line1="From Passion "
              line2="to Purpose"
              dividerSrc="/images/divider-blue.png"
              line1Color="#000000"
              line2Color="#000000"
            />
            <p className={styles.body}>
              What if the passion that&apos;s lived in the background of your life could become the centerpiece of your legacy?
            </p>
            <p className={styles.body}>
              In this 90-minute session, Dan Absher shares the inspiring story of how his lifelong love for The Beatles evolved into Fab Four Academy. What began as a personal writing project gradually blossomed into something more — transforming into a book, a workshop, a community, and a meaningful collaboration with his brother and two daughters.
            </p>
            <p className={styles.body}>
              This session is about starting small, following what lights you up, and creating something that reflects not only who you are but also what truly matters to you.
            </p>
          </div>

          <div className={styles.topicImageWrap}>
            <Image
              src="/images/keynotes.png"
              alt="Keynote session — From Passion to Purpose"
              width={520}
              height={380}
              className={styles.topicImg}
            />
          </div>
        </div>
      </section>

      {/* ── Topic 2: The Fab Four Pillars of Excellence ───── */}
      <section className={`${styles.topicSection} ${styles.topicSectionAlt}`}>
        <div className={`container ${styles.topicInner} ${styles.topicInnerReverse}`}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitContainer}>
              <Image
                src="/images/Dan-Absher.png"
                alt="Dan Absher — Fab Four Pillars of Excellence keynote"
                fill
                className={styles.portrait}
              />
            </div>
          </div>

          <div className={styles.topicContent}>
            <span className={styles.eyebrow}>90-Minute Keynote · 4-Hour Workshop · Multi-Day Retreat</span>
            <DynamicHeading
              line1="The Fab Four Pillars "
              line2="of Excellence"
              dividerSrc="/images/divider-blue.png"
              line1Color="#000000"
              line2Color="#000000"
            />
            <p className={styles.body}>
              Have you ever wondered what made The Beatles more than just a great band? It wasn&apos;t just the music — it was their chemistry, trust, and shared vision. In this session, based on Dan Absher&apos;s book <em>Fab Four Pillars of Impact</em>, he reveals the four key truths that fueled the band&apos;s success:
            </p>
            <ul className={styles.bullets}>
              {PILLARS_BULLETS.map((b) => (
                <li key={b} className={styles.bullet}>{b}</li>
              ))}
            </ul>
            <p className={styles.body}>
              This keynote is packed with Beatles stories and real-world takeaways for today&apos;s teams.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
