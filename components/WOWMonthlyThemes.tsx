import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './WOWMonthlyThemes.module.css'

const THEMES = [
  {
    month: 'June',
    theme: 'Come Together Journey',
    description:
      'The Beatles understood something transformative: extraordinary achievement happens when the right people come together in the right roles. From John inviting Paul despite the threat to his own leadership, to finding their perfect producer in George Martin, their story proves that chemistry trumps individual brilliance.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/june-2025',
  },
  {
    month: 'July',
    theme: 'Magical Mystery Tour',
    description:
      "The Beatles' \"Magical Mystery Tour\" wasn't just a title — it captured the magic that happens when everything aligns, when individual efforts combine into something far greater. It's that feeling of flow, synchronicity, and unexpected breakthroughs.",
    href: 'https://www.fabfouracademy.com/attitude-perspective/july-2025',
  },
  {
    month: 'August',
    theme: 'Storytelling Journey',
    description:
      'The Beatles understood something powerful: the best life lessons come wrapped in stories that stick with us long after the music fades. Their songs are full of memorable characters whose journeys reflect the ups and downs we all go through.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/august-2025',
  },
  {
    month: 'September',
    theme: 'Attitude & Perspective Journey',
    description:
      'The Beatles generated over $1 billion in revenue and influenced millions worldwide, but the most valuable lessons from The Beatles aren\'t about music. When John Lennon penned "Rain" during the revolutionary Revolver sessions, he captured a profound leadership truth: perspective, not circumstances, determines success.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/september-2025',
  },
  {
    month: 'October',
    theme: 'Imagine Revolution',
    description:
      'The Beatles\' "Imagine" wasn\'t just a song. It was a call to conscious leadership. When John Lennon asked us to envision a world without artificial divisions, he demonstrated something profound: transformation begins with imagination, then manifests through principled action.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/october-2025',
  },
  {
    month: 'November',
    theme: 'Nostalgia and Gratitude',
    description:
      'The Beatles\' "In My Life" wasn\'t just nostalgia. It was strategic memory management. When John cataloged the people and places that shaped him, he demonstrated something profound: organizational memory and authentic appreciation create competitive advantage.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/november-2025',
  },
  {
    month: 'December',
    theme: 'Faith and Spirituality',
    description:
      "The Beatles' \"My Sweet Lord\" wasn't just a devotional hit. It was authentic spiritual seeking that resonated globally. When George integrated faith with professional excellence, he demonstrated something profound: purpose and performance aren't competing priorities but complementary practices.",
    href: 'https://www.fabfouracademy.com/attitude-perspective/december-2025',
  },
  {
    month: 'January',
    theme: 'New Beginnings and Renewal',
    description:
      "When George escaped a tense business meeting in 1969 and retreated to Eric's garden, he created space for breakthrough. That afternoon produced \"Here Comes the Sun,\" teaching us that renewal doesn't require perfect conditions. The Beatles mastered fresh starts during difficult transitions.",
    href: 'https://www.fabfouracademy.com/attitude-perspective/january-2026',
  },
  {
    month: 'February',
    theme: 'Silly Love Songs',
    description:
      'When Paul defended "Silly Love Songs" in 1976, asking critics "What\'s wrong with that?" he was championing authentic connection in a world increasingly comfortable with cynical detachment. Throughout February, we\'ll explore how their wisdom about love and partnerships provides actionable frameworks for leaders.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/february-2026',
  },
  {
    month: 'March',
    theme: 'Mental Health Lessons',
    description:
      'When John Lennon admitted "Help! I need somebody" in 1965, he shattered expectations for rock stars by choosing vulnerability over invincibility. That radical honesty revealed how The Beatles understood that acknowledging struggle doesn\'t diminish strength — it creates the foundation for sustainable success.',
    href: 'https://www.fabfouracademy.com/attitude-perspective/march-2026',
  },
  {
    month: 'April',
    theme: 'New Beginnings Lessons',
    description:
      "When George Harrison walked out of a contentious business meeting in 1969 and into Eric Clapton's garden, he discovered the strategic power of renewal. The song he wrote that afternoon, \"Here Comes the Sun,\" would become The Beatles' most-streamed track and a masterclass in navigating transitions.",
    href: 'https://www.fabfouracademy.com/attitude-perspective/april-2026',
  },
]

export default function WOWMonthlyThemes() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Monthly Journey "
          line2="Themes"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        <div className={styles.grid}>
          {THEMES.map((t) => (
            <div key={t.month} className={styles.card}>
              <span className={styles.monthBadge}>{t.month}</span>
              <h3 className={styles.themeName}>{t.theme}</h3>
              <p className={styles.description}>{t.description}</p>
              <Link
                href={t.href}
                className={styles.link}
                target="_blank"
                rel="noopener"
              >
                Full Post →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
