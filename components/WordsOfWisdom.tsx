'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import PhotoStrip from './PhotoStrip'
import styles from './WordsOfWisdom.module.css'

export default function WordsOfWisdom() {
  const headerRef = useRef<HTMLSpanElement>(null)
  const [headerDivWidth, setHeaderDivWidth] = useState<number | null>(null)

  const cardRef = useRef<HTMLSpanElement>(null)
  const [cardDivWidth, setCardDivWidth] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      if (headerRef.current) setHeaderDivWidth(headerRef.current.getBoundingClientRect().width)
      if (cardRef.current)   setCardDivWidth(cardRef.current.getBoundingClientRect().width)
    }
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className={styles.h2}>
              Daily<br />
              <span ref={headerRef}>Words of Wisdom</span>
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/divider-yellow.png"
              alt=""
              aria-hidden="true"
              className={styles.headerDivider}
              style={headerDivWidth ? { width: headerDivWidth } : { visibility: 'hidden' }}
            />
          </div>
          <p className={styles.tagline}>One song. One insight. Every day.</p>
          <p className={styles.desc}>
            Each day, a single Beatles song becomes a starting point for reflection on
            creativity, collaboration, relationships, and life. These brief insights help
            you reconnect with the music you love and discover new meaning within it,
            one song at a time.
          </p>
        </div>
      </div>

      <PhotoStrip />

      <div className={`container ${styles.cardSection}`}>

        {/* Bottom-left decoration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home-daily.png"
          alt=""
          aria-hidden="true"
          className={styles.decorBottomLeft}
        />

        {/* Left: "Today's Words of Wisdom" heading + divider */}
        <div className={styles.wowLeft}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className={styles.wowHeading}>
              Today&apos;s<br />
              <span ref={cardRef}>Words of Wisdom</span>
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/divider-blue.png"
              alt=""
              aria-hidden="true"
              className={styles.wowDivider}
              style={cardDivWidth ? { width: cardDivWidth } : { visibility: 'hidden' }}
            />
          </div>
        </div>

        {/* Right: post card */}
        <div className={styles.postCard}>
          <div className={styles.postImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://static.wixstatic.com/media/6e1415_82e28dcd29c94ae296722998eb17b208~mv2.png"
              alt="I'll Get You"
              className={styles.postImage}
            />
          </div>
          <div className={styles.postContent}>
            <span className={styles.postDate}>April 28, 2026</span>
            <h4 className={styles.postTitle}>I&apos;ll Get You</h4>
            <p className={styles.postBody}>
              You can feel the infectious optimism in every note of this playful B-side to &quot;She Loves You.&quot;...
            </p>
            <Link
              href="/words-of-wisdom-content/ill-get-you"
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              Read Full Reflection
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
