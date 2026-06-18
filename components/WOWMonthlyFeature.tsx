import Link from 'next/link'
import { fetchMonthlyPosts } from '@/lib/monthly-theme-fetcher'
import { parsePostDate } from '@/lib/wow-utils'
import styles from './WOWMonthlyFeature.module.css'

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

export default async function WOWMonthlyFeature({ published }: { published?: string }) {
  const posts = await fetchMonthlyPosts()

  const targetDate = published ? parsePostDate(published) : new Date()
  const monthYear = `${MONTH_NAMES[targetDate.getMonth()]} ${targetDate.getFullYear()}`

  let monthly = posts.find(p => p.month === monthYear && p.youtubeId) ?? null

  if (!monthly) {
    const sorted = [...posts].sort(
      (a, b) => parsePostDate(b.month).getTime() - parsePostDate(a.month).getTime()
    )
    monthly = sorted.find(p => Boolean(p.youtubeId)) ?? sorted[0] ?? null
  }

  if (!monthly) return null

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.grid}>

          {/* Left: YouTube video */}
          <div className={styles.videoCol}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${monthly.youtubeId}`}
                title="Monthly theme video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              />
            </div>
          </div>

          {/* Right: text + button */}
          <div className={styles.textCol}>
            <span className={styles.month}>{monthly.month}</span>
            <h2 className={styles.title}>{monthly.title}</h2>
            <p className={styles.subtitle}>{monthly.subtitle}</p>
            <Link href={`/attitude-perspective/${monthly.slug}`} className="btn btn-primary" style={{ width: 'fit-content' }}>
              Read Full Article
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
