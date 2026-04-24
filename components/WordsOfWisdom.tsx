'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PhotoStrip from './PhotoStrip'
import styles from './WordsOfWisdom.module.css'

export default function WordsOfWisdom() {
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
        <div className={styles.header}>
          <h2 className={styles.h2}>Daily Words of Wisdom</h2>
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

        {/* Left: "Today's Words of Wisdom" heading + divider */}
        <div className={styles.wowLeft}>
          <h3 className={styles.wowHeading}>
            Today&apos;s<br />
            <span ref={textRef}>Words of Wisdom</span>
          </h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/divider-blue.png"
            alt=""
            aria-hidden="true"
            className={styles.wowDivider}
            style={dividerWidth ? { width: dividerWidth } : { visibility: 'hidden' }}
          />
        </div>

        {/* Right: post card */}
        <div className={styles.postCard}>
          <div className={styles.postImageWrap}>
            <Image
              src="/images/wow-forgive-me.png"
              alt="(Forgive Me) My Little Flower Princess"
              fill
              className={styles.postImage}
            />
          </div>
          <div className={styles.postContent}>
            <h4 className={styles.postTitle}>(Forgive Me) My Little Flower Princess</h4>
            <p className={styles.postBody}>
              John poured his devotion into this song for Yoko, released posthumously in 1984...
            </p>
            <Link
              href="https://www.fabfouracademy.com/words-of-wisdom-content/end-of-the-line"
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
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
