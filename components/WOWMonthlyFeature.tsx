import Link from 'next/link'
import styles from './WOWMonthlyFeature.module.css'

const THIS_MONTH = {
  label: 'Monthly Deep Dive',
  month: 'April 2026',
  title: 'Transformational Lessons from The Beatles: New Beginnings and Hope',
  subtitle:
    'A Month of Strategic Renewal, Leadership Transitions, and Beatles Wisdom for Sustainable Growth',
  youtubeId: 'KQetemT1sWc',
  href: '/attitude-perspective/april-2026',
}

export default function WOWMonthlyFeature() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.grid}>

          {/* Left: YouTube video */}
          <div className={styles.videoCol}>
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${THIS_MONTH.youtubeId}`}
                title="Monthly Deep Dive video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              />
            </div>
          </div>

          {/* Right: text + button */}
          <div className={styles.textCol}>
            <span className={styles.month}>{THIS_MONTH.month}</span>
            <h2 className={styles.title}>{THIS_MONTH.title}</h2>
            <p className={styles.subtitle}>{THIS_MONTH.subtitle}</p>
            <Link href={THIS_MONTH.href} className="btn btn-primary" style={{ width: 'fit-content' }}>
              Read Full Article
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
