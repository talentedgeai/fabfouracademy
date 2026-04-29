'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { getTodaysPost } from '@/lib/wow-utils'
import styles from './WOWTodaySection.module.css'

// Resolved at module init time (server-side during SSR, or on first client load)
const post = getTodaysPost()

export default function WOWTodaySection() {
  const headingRef = useRef<HTMLSpanElement>(null)
  const [dividerWidth, setDividerWidth] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      if (headingRef.current) {
        setDividerWidth(headingRef.current.getBoundingClientRect().width)
      }
    }
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  if (!post) return null

  const teaser = post.content[0].length > 160
    ? post.content[0].slice(0, 160) + '…'
    : post.content[0]

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* Decorative Beatles photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home-daily.png"
          alt=""
          aria-hidden="true"
          className={styles.decor}
        />

        {/* Left: heading + divider */}
        <div className={styles.left}>
          <div className={styles.headingWrap}>
            <h2 className={styles.heading}>
              Today&apos;s<br />
              <span ref={headingRef}>Words of Wisdom</span>
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
        </div>

        {/* Right: post card */}
        <div className={styles.card}>
          <div className={styles.cardImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.imageAlt}
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.dateBadge}>{post.published}</span>
            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardTeaser}>{teaser}</p>
            <Link
              href={`/words-of-wisdom-content/${post.slug}`}
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
