'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Podcast.module.css'

export default function Podcast() {
  const textRef = useRef<HTMLSpanElement>(null)
  const [dividerWidth, setDividerWidth] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      if (textRef.current) {
        setDividerWidth(textRef.current.getBoundingClientRect().width)
      }
    }
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* Row 1: full-width image */}
        <div className={styles.imageRow}>
          <Image
            src="/images/home-podcast.png"
            alt="Ranking The Beatles Podcast featuring Dan Absher"
            width={1200}
            height={600}
            className={styles.podcastImg}
          />
        </div>

        {/* Row 2 col 1: heading + divider + body + button */}
        <div className={styles.content}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className={styles.h2}>
              <span className={styles.word1}>Ranking The</span><br />
              <span className={styles.word2} ref={textRef}>Beatles Podcast</span>
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/divider-blue.png"
              alt=""
              aria-hidden="true"
              className={styles.divider}
              style={dividerWidth ? { width: dividerWidth } : { visibility: 'hidden' }}
            />
          </div>
          <p className={styles.body}>
            Dan Absher recently appeared on the <strong>Ranking The Beatles</strong> podcast,
            joining a thoughtful conversation about the band&apos;s creative evolution and the
            deeper lessons hidden beneath their music. The episode reflects Dan&apos;s lifelong
            engagement with The Beatles not only as artists, but as a powerful case study in
            collaboration, communication, and sustained excellence.
          </p>
          <Link
            href="https://rankingthebeatles.com/?p=498"
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
            style={{ width: 'fit-content' }}
          >
            Listen to the Episode
          </Link>
        </div>

        {/* Row 2 col 2: quote */}
        <div className={styles.quoteCol}>
          <blockquote className={styles.quote}>
            <p>
              &ldquo;I think the book is really going to be enlightening for a lot of people, you know,
              Beatles fans and people who are not necessarily Beatles fans, but looking for gaining
              that knowledge and insight into running successful organizations.&rdquo;
            </p>
            <cite>— Jonathan Pretus, Host of Ranking The Beatles Podcast</cite>
          </blockquote>
        </div>

      </div>
    </section>
  )
}
