import Link from 'next/link'
import HeadingDivider from './HeadingDivider'
import styles from './BooksPraise.module.css'

const QUOTES = [
  {
    text: 'I think the book is really going to be enlightening for a lot of people, you know, Beatles fans and people who are not necessarily Beatles fans, but looking for gaining that knowledge and insight into running successful organizations.',
    source: 'Jonathan Pretus, Host of Ranking The Beatles Podcast',
  },
  {
    text: 'Absher masterfully intertwines the story of the iconic band with practical lessons for creating and sustaining successful teams and organizations.',
    source: "Readers' Favorite",
  },
  {
    text: 'An unusually immersive account — one that does not seek to radically reinvent Beatles-inspired leadership but to celebrate, marvel at, and honor it.',
    source: "PW's Booklife",
  },
  {
    text: "Absher offers a leadership philosophy based on what the Beatles did right — and what they did wrong. A fun, innovative management guide, based on the story of the world's most popular band.",
    source: 'Kirkus',
  },
]

export default function BooksPraise() {
  return (
    <>
      {/* ── Praise ──────────────────────────────── */}
      <section className={styles.section}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <HeadingDivider word1="Early " word2="Praise" />
          </div>
          <div className={styles.grid}>
            {QUOTES.map((q) => (
              <blockquote key={q.source} className={styles.card}>
                <span className={styles.mark}>&ldquo;</span>
                <p className={styles.text}>{q.text}</p>
                <cite className={styles.source}>— {q.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community CTA ───────────────────────── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <HeadingDivider word1="Come Together with " word2="The Fab Four Community" variant="on-dark" />
          <p className={styles.ctaBody}>
            Join the Fab Four Community to get exclusive previews and early-bird offers.
          </p>
          <Link href="/join-fab-four-community" className="btn btn-yellow">
            Join the Community
          </Link>
        </div>
      </section>
    </>
  )
}
