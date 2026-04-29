import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import { getTodaysPost } from '@/lib/wow-utils'
import styles from './WOWFeatured.module.css'

export default function WOWFeatured() {
  const post = getTodaysPost()
  if (!post) return null

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Today's Words "
          line2="of Wisdom"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        <div className={styles.card}>
          <span className={styles.badge}>{post.published}</span>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.teaser}>{post.content[0].slice(0, 160)}…</p>
          <Link
            href={`/words-of-wisdom-content/${post.slug}`}
            className="btn btn-primary"
          >
            Read Full Reflection
          </Link>
        </div>
      </div>
    </section>
  )
}
