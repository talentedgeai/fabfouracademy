'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './BooksHero.module.css'

export default function BooksHero() {
  const textRef = useRef<HTMLSpanElement>(null)
  const [dividerWidth, setDividerWidth] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      if (textRef.current) setDividerWidth(textRef.current.getBoundingClientRect().width)
    }
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 className={styles.h1}>
            The Wisdom of<br />
            <span ref={textRef}>The Beatles</span>
          </h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/divider-orange.png"
            alt=""
            aria-hidden="true"
            className={styles.divider}
            style={dividerWidth ? { width: dividerWidth } : { visibility: 'hidden' }}
          />
          <p className={styles.subtitle}>
            Be the first to be inspired by the most iconic band of our generation.
          </p>
        </div>

        <div className={styles.imageCol}>
          <Image
            src="/images/home-hero-book.png"
            alt="Fab Four Academy Books"
            width={500}
            height={620}
            className={styles.heroImg}
            priority
          />
        </div>
      </div>
    </section>
  )
}
