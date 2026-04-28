import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './WOWRecent.module.css'

const RECENT = [
  {
    date: 'May 31',
    title: 'End of the Line',
    teaser:
      'There is something quietly extraordinary about the circumstances surrounding this song\'s music video...',
    href: 'https://www.fabfouracademy.com/words-of-wisdom-content/end-of-the-line',
  },
  {
    date: 'May 30',
    title: 'Waterfalls',
    teaser:
      'Caring about someone and being able to protect them from their own choices are two very different things...',
    href: 'https://www.fabfouracademy.com/words-of-wisdom-content/waterfalls',
  },
  {
    date: 'May 29',
    title: "Isn't it a Pity?",
    teaser:
      "Perhaps no other song in George's catalog carries quite this quality of sorrow: not the sharp ache of a specific hurt, but the diffuse, aching bewilderment of watching people consistently fail to love each other well...",
    href: "https://www.fabfouracademy.com/words-of-wisdom-content/isn't-it-a-pity?",
  },
]

export default function WOWRecent() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Recent Words "
          line2="of Wisdom"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        <div className={styles.grid}>
          {RECENT.map((post) => (
            <div key={post.href} className={styles.card}>
              <span className={styles.date}>{post.date}</span>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.teaser}>{post.teaser}</p>
              <Link
                href={post.href}
                className={styles.readMore}
                target="_blank"
                rel="noopener"
              >
                Read Full Reflection →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
