import Image from 'next/image'
import Link from 'next/link'
import HeadingDivider from './HeadingDivider'
import styles from './WhatDanBrings.module.css'

export default function WhatDanBrings() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.imageWrap}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/home-what-dan-brings.jpeg"
              alt="Dan Absher presenting"
              fill
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.content}>
          <HeadingDivider word1="What Dan " word2="Absher Brings" variant="on-dark" />
          <p className={styles.body}>
            Dan Absher brings a rare combination of executive leadership, teaching experience,
            and cultural insight. His work bridges business and storytelling, using the
            universally familiar journey of The Beatles to make leadership lessons memorable,
            practical, and deeply human.
          </p>
          <p className={styles.body}>
            Rather than offering abstract theory, Dan's approach helps teams see themselves
            more clearly and work together more effectively.
          </p>

          <blockquote className={styles.quote}>
            "Packed with Beatles insight, playlists, and practical tools, this book offers a
            thoughtful blueprint for teams and organizations seeking lasting excellence."
          </blockquote>

          <div className={styles.ctas}>
            <Link
              href="https://www.fabfouracademy.com/_files/ugd/39abad_74b6f9a398804fc5b5cc827383ae6cd2.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Download Press Kit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
