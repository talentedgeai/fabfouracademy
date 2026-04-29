'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import PhotoStrip from './PhotoStrip'
import { getTodaysPost } from '@/lib/wow-utils'
import styles from './WordsOfWisdom.module.css'

// Resolved at module init (server-side during SSR, client on first load)
const todaysPost = getTodaysPost()

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

  const post = todaysPost
  const teaser = post
    ? post.content[0].length > 160
      ? post.content[0].slice(0, 160) + '…'
      : post.content[0]
    : ''

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
        {post && (
          <div className={styles.postCard}>
            <div className={styles.postImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                className={styles.postImage}
              />
            </div>
            <div className={styles.postContent}>
              <span className={styles.postDate}>{post.published}</span>
              <h4 className={styles.postTitle}>{post.title}</h4>
              <p className={styles.postBody}>{teaser}</p>
              <Link
                href={`/words-of-wisdom-content/${post.slug}`}
                className="btn btn-primary"
                style={{ width: 'fit-content' }}
              >
                Read Full Reflection
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
