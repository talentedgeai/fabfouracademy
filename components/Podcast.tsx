import Image from 'next/image'
import Link from 'next/link'
import styles from './Podcast.module.css'

export default function Podcast() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className="eyebrow">Featured Appearance</span>
          <h3 className={styles.h3}>Ranking The Beatles Podcast</h3>
          <p className={styles.body}>
            Dan Absher recently appeared on the <strong>Ranking The Beatles</strong> podcast,
            joining a thoughtful conversation about the band's creative evolution and the
            deeper lessons hidden beneath their music. The episode reflects Dan's lifelong
            engagement with The Beatles not only as artists, but as a powerful case study in
            collaboration, communication, and sustained excellence.
          </p>

          <blockquote className={styles.quote}>
            <p>
              "I think the book is really going to be enlightening for a lot of people, you know,
              Beatles fans and people who are not necessarily Beatles fans, but looking for gaining
              that knowledge and insight into running successful organizations."
            </p>
            <cite>— Jonathan Pretus, Host of Ranking The Beatles Podcast</cite>
          </blockquote>

          <Link
            href="https://rankingthebeatles.com/?p=498"
            className="btn btn-blue"
            target="_blank"
            rel="noopener"
          >
            Listen to the Episode
          </Link>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/home-podcast.png"
              alt="Ranking The Beatles Podcast featuring Dan Absher"
              fill
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
