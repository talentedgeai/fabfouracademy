'use client'

import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './KeynotesPraise.module.css'

const QUOTES = [
  {
    text: "Dan Absher's Beatles class is more than a nostalgic journey — it's a masterclass in leadership and insight. Through the lens of Lennon and McCartney, you learn to 'take a sad song and make it better,' turning challenges into harmony and collaboration into something that truly helps you 'come together' as a team.",
    source: 'John VanNewkirk, CheckSum',
  },
  {
    text: "I was fortunate to attend one of Dan Absher's presentations about The Beatles. It is compelling, entertaining, and stimulating for any business leader wishing to think ahead in a creative, imaginative way. Absher's presentations are lively and interactive with real take home value both personally and for my business.",
    source: 'John Oppenheimer, Founder/Chairman of Columbia Hospitality',
  },
  {
    text: "Dan Absher recently presented to my YPO forum his Beatles team-building workshop called 'Fab Forum'. Going into it, I was only mildly interested. All I can say is that I spent hours riveted as Dan brought to life the bandmembers' personalities, the music, and how their interpersonal relationships and passions drove their musical and strategic business decisions, making The Beatles the best-selling band of all time. Fantastic.",
    source: 'David Lippes, Chairman of Brook Health',
  },
]

// Double the array so the CSS marquee loop is seamless
const DOUBLED = [...QUOTES, ...QUOTES]

export default function KeynotesPraise() {
  return (
    <>
      {/* ── Testimonials ──────────────────────── */}
      <section className={styles.section}>
        <div className={`container ${styles.header}`}>
          <DynamicHeading
            line1="What Participants "
            line2="Say"
            dividerSrc="/images/divider-white.png"
            line1Color="#ffffff"
            line2Color="#ffffff"
            centered
            singleLine
          />
        </div>

        <div className={styles.sliderWrap}>
          <div className={styles.sliderTrack}>
            {DOUBLED.map((q, i) => (
              <blockquote key={i} className={styles.sliderCard}>
                <span className={styles.mark}>&ldquo;</span>
                <p className={styles.text}>{q.text}</p>
                <cite className={styles.source}>— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <DynamicHeading
            line1="Make Your Next Event "
            line2="Memorable"
            dividerSrc="/images/divider-white.png"
            line1Color="#ffffff"
            line2Color="#ffffff"
            centered
            singleLine
          />
          <p className={styles.ctaBody}>
            Bring Beatles-style insight to your team, enhancing collaboration, energizing culture, and inspiring next-level performance.
          </p>
          <Link href="/book-dan-absher" className="btn btn-primary">
            Inquire About Availability
          </Link>
        </div>
      </section>
    </>
  )
}
