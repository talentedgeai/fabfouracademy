'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './MeetDan.module.css'

export default function MeetDan() {
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
        <div className={styles.content}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className={styles.h2}>
              <span className={styles.word1}>Meet</span><br />
              <span className={styles.word2} ref={textRef}>Dan Absher</span>
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
            Dan Absher is a business leader, educator, and author with more than three decades
            of executive experience. A graduate of Stanford University and Notre Dame Law
            School, he spent thirty-two years as CEO of Absher Construction, leading teams
            through growth, complexity, and change.
          </p>
          <p className={styles.body}>
            He is the founder of The Fab Four Academy, where he teaches leadership and teamwork
            through the lens of The Beatles&apos; remarkable story: connecting culture, collaboration,
            and sustained excellence. Dan lives in the Pacific Northwest with his wife, Daria,
            and their dog, Ringo.
          </p>

          <Link href="/dan-absher-keynote-speaker" className="btn btn-primary" style={{ width: 'fit-content' }}>
            Read Full Bio
          </Link>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.portraitContainer}>
            <Image
              src="/images/Dan-Absher.png"
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
