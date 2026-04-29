import Link from 'next/link'
import { getMonthlyPostForDate, getTodaysMonthlyPost } from '@/lib/wow-utils'
import styles from './WOWMonthlyFeature.module.css'

/**
 * Pass `published` (e.g. "April 28, 2026") from the daily WOW post to show
 * the matching monthly theme. Omit to show the current month's theme.
 */
export default function WOWMonthlyFeature({ published }: { published?: string }) {
  const monthly = published
    ? getMonthlyPostForDate(published)
    : getTodaysMonthlyPost()

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
