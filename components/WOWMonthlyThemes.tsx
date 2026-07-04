'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { MonthlyPost } from '@/app/attitude-perspective/posts'
import styles from './WOWMonthlyThemes.module.css'

const GAP = 24

export default function WOWMonthlyThemes({ posts }: { posts: MonthlyPost[] }) {
  const THEMES = posts.slice(-12).map((p) => ({
    month: p.month.replace(/\s+\d{4}$/, ''),
    theme: p.boxTitle ?? p.subtitle,
    description: p.boxTitle
      ? p.subtitle
      : (p.intro[0] && p.intro[0].length > 200 ? p.intro[0].slice(0, 200) + '…' : (p.intro[0] ?? '')),
    href: `/attitude-perspective/${p.slug}`,
    youtubeId: p.youtubeId,
  }))

  /** On load, scroll so the current month is the first visible card. */
  function getInitialIndex(vc: number): number {
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })
    const idx = THEMES.findIndex(t => t.month === currentMonth)
    const target = idx === -1 ? THEMES.length - vc : idx
    return Math.min(Math.max(0, target), Math.max(0, THEMES.length - vc))
  }
  const [index, setIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(360)
  const [visibleCount, setVisibleCount] = useState(3)
  const viewportRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    if (!viewportRef.current) return
    const w = viewportRef.current.clientWidth
    const vc = w < 640 ? 1 : 2
    setItemWidth((w - (vc - 1) * GAP) / vc)
    setVisibleCount(vc)
    setIndex(getInitialIndex(vc))
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
                {/* 16:9 YouTube embed */}
                <div className={styles.videoWrap}>
                  <iframe
                    src={`https://www.youtube.com/embed/${t.youtubeId}`}
                    title={t.theme}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoFrame}
                  />
                </div>

                <div className={styles.cardBody}>
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
