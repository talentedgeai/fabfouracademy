import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import { getRecentPosts } from '@/lib/wow-utils'
import styles from './WOWRecent.module.css'

export default function WOWRecent() {
  const posts = getRecentPosts(3)
  if (posts.length === 0) return null

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
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/words-of-wisdom-content/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <span className={styles.date}>{post.published}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.teaser}>{post.content[0]}</p>
                <span className={styles.readMore}>Read Full Reflection →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
