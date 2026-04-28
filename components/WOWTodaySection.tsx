'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './WOWTodaySection.module.css'

const TODAY_POST = {
  date: 'April 28, 2026',
  title: "I'll Get You",
  teaser:
    'You can feel the infectious optimism in every note of this playful B-side to "She Loves You."...',
  imageUrl:
    'https://static.wixstatic.com/media/6e1415_82e28dcd29c94ae296722998eb17b208~mv2.png',
  imageAlt: "I'll Get You – The Beatles",
  href: '/words-of-wisdom-content/ill-get-you',
}

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
              src={TODAY_POST.imageUrl}
              alt={TODAY_POST.imageAlt}
              className={styles.cardImage}
            />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.dateBadge}>{TODAY_POST.date}</span>
            <h3 className={styles.cardTitle}>{TODAY_POST.title}</h3>
            <p className={styles.cardTeaser}>{TODAY_POST.teaser}</p>
            <Link
              href={TODAY_POST.href}
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
