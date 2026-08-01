import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import { getTodaysPost } from '@/lib/wow-utils'
import styles from './WOWPageHero.module.css'

export default async function WOWPageHero() {
  const post = await getTodaysPost()
  if (!post) return null

  const teaserSource = post.subtitle || post.content[0] || ''
  const teaser = teaserSource.length > 160
    ? teaserSource.slice(0, 160) + '…'
    : teaserSource

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        <DynamicHeading
          line1="Today's Words of "
          line2="Wisdom"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        <div className={styles.postCard}>
          <div className={styles.postImageCol}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postContentCol}>
            <span className={styles.dateBadge}>{post.published}</span>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postTeaser}>{teaser}</p>
            <Link href={`/words-of-wisdom-content/${post.slug}`} className="btn btn-primary" style={{ width: 'fit-content' }}>
              Read Full Reflection
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
