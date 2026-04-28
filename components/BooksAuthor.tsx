import Image from 'next/image'
import DynamicHeading from './DynamicHeading'
import styles from './BooksAuthor.module.css'

export default function BooksAuthor() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <DynamicHeading
            line1="About "
            line2="the Author"
            dividerSrc="/images/divider-blue.png"
            line1Color="#CF4B27"
            line2Color="#000000"
          />
          <p className={styles.body}>
            Dan Absher is a business leader, coach, author, and professional speaker with over
            32 years of experience leading his family&apos;s construction company. But the real
            leadership lessons that shaped his success didn&apos;t come from boardrooms or
            business textbooks — they came from four lads from Liverpool.
          </p>
          <p className={styles.body}>
            The Beatles taught Dan more about teamwork, creativity, and reinvention than any
            business school ever could. Their extraordinary story inspired him to write{' '}
            <em>Daily Words of Wisdom</em> and <em>Fab Four Pillars of Excellence</em>, books
            that blend their timeless lessons with real-world insights. Dan&apos;s mission? To
            help others unlock their potential and lead with the same passion, purpose, and
            unity that defined The Beatles.
          </p>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.portraitContainer}>
            <Image
              src="/images/Dan-Absher.png"
              alt="Dan Absher, author and founder of Fab Four Academy"
              fill
              className={styles.portrait}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
