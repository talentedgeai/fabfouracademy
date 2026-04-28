import Image from 'next/image'
import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './KeynotesAbout.module.css'

export default function KeynotesAbout() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <DynamicHeading
            line1="About "
            line2="Dan Absher"
            dividerSrc="/images/divider-blue.png"
            line1Color="#000000"
            line2Color="#000000"
          />
          <p className={styles.body}>
            Dan Absher is a business leader, coach, author, and professional speaker with over 32 years of experience leading his family&apos;s construction company. His passion for The Beatles began at age five when he watched their groundbreaking debut on <em>The Ed Sullivan Show</em>. Over the years, Dan has developed a deep understanding of their journey and has seamlessly integrated their lessons with the principles of excellence he&apos;s learned from business and sports.
          </p>
          <p className={styles.body}>
            This unique combination of insights has inspired Dan&apos;s Beatles-infused speaking engagements, which have resonated with audiences ranging from YPO and EO chapters to college classrooms, corporate retreats, and community groups. His seminars offer powerful leadership lessons rooted in the timeless wisdom of The Beatles.
          </p>
          <p className={styles.note}>
            Dan only accepts one keynote speech per month. To ensure availability, get in touch early and reserve your date for an unforgettable experience.
          </p>
          <Link href="/book-dan-absher" className="btn btn-primary" style={{ width: 'fit-content' }}>
            Book Dan Now
          </Link>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.portraitContainer}>
            <Image
              src="/images/Dan-Absher.png"
              alt="Dan Absher, keynote speaker"
              fill
              className={styles.portrait}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
