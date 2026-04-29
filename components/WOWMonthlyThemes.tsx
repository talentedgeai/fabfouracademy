'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { MONTHLY_POSTS } from '@/app/attitude-perspective/posts'
import styles from './WOWMonthlyThemes.module.css'

// Automatically derived from MONTHLY_POSTS — add a new post there and it appears here
const THEMES = MONTHLY_POSTS.map((p) => ({
  month: p.month,
  theme: p.subtitle,
  description: p.intro[0].length > 200 ? p.intro[0].slice(0, 200) + '…' : p.intro[0],
  href: `/attitude-perspective/${p.slug}`,
}))

const GAP = 24

export default function WOWMonthlyThemes() {
  const [index, setIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(360)
  const [visibleCount, setVisibleCount] = useState(3)
  const viewportRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    if (!viewportRef.current) return
    const w = viewportRef.current.clientWidth
    const vc = w < 640 ? 1 : w < 900 ? 2 : 3
    setItemWidth((w - (vc - 1) * GAP) / vc)
    setVisibleCount(vc)
    setIndex(0)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const maxIndex = THEMES.length - visibleCount

  return (
    <section className={styles.section}>
      <div className={`container ${styles.sliderArea}`}>

        {/* Prev arrow */}
        <button
          className={styles.arrow}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Viewport */}
        <div className={styles.viewport} ref={viewportRef}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * (itemWidth + GAP)}px)` }}
          >
            {THEMES.map((t) => (
              <div
                key={t.month}
                className={styles.card}
                style={{ width: itemWidth }}
              >
                <span className={styles.monthBadge}>{t.month}</span>
                <h3 className={styles.themeName}>{t.theme}</h3>
                <p className={styles.description}>{t.description}</p>
                <Link
                  href={t.href}
                  className={styles.link}
                  {...(t.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  Full Post →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          className={styles.arrow}
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          disabled={index === maxIndex}
          aria-label="Next"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

      </div>
    </section>
  )
}
