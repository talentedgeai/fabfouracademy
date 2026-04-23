import Image from 'next/image'
import Link from 'next/link'
import HeadingDivider from './HeadingDivider'
import styles from './MeetDan.module.css'

export default function MeetDan() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <HeadingDivider word1="Meet " word2="Dan Absher" />
          <p className={styles.body}>
            Dan Absher is a business leader, educator, and author with more than three decades
            of executive experience. A graduate of Stanford University and Notre Dame Law
            School, he spent thirty-two years as CEO of Absher Construction, leading teams
            through growth, complexity, and change.
          </p>
          <p className={styles.body}>
            He is the founder of The Fab Four Academy, where he teaches leadership and teamwork
            through the lens of The Beatles' remarkable story: connecting culture, collaboration,
            and sustained excellence. Dan lives in the Pacific Northwest with his wife, Daria,
            and their dog, Ringo.
          </p>
          <Link href="/dan-absher-keynote-speaker" className="btn btn-blue">
            Read Full Bio
          </Link>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.portraitContainer}>
            <Image
              src="/images/Dan-Absher.jpg"
              alt="Dan Absher, founder of Fab Four Academy"
              fill
              className={styles.portrait}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
