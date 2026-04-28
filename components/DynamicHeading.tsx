'use client'

import { useRef, useEffect, useState } from 'react'
import styles from './DynamicHeading.module.css'

interface Props {
  line1: string
  line2: string
  dividerSrc: string
  line1Color?: string
  line2Color?: string
  fontSize?: number
  centered?: boolean
  tag?: 'h1' | 'h2' | 'h3'
  /** Render line1 + line2 on a single line; divider width matches full heading */
  singleLine?: boolean
  /** marginTop applied to the divider image; default '-12px' */
  dividerSpacing?: string
}

export default function DynamicHeading({
  line1,
  line2,
  dividerSrc,
  line1Color = '#CF4B27',
  line2Color = '#000000',
  fontSize = 48,
  centered = false,
  tag = 'h2',
  singleLine = false,
  dividerSpacing = '-12px',
}: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const [dividerWidth, setDividerWidth] = useState<number | null>(null)

  useEffect(() => {
    function measure() {
      const target = singleLine ? headingRef.current : line2Ref.current
      if (target) setDividerWidth(target.getBoundingClientRect().width)
    }
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [singleLine])

  const Tag = tag

  return (
    <div className={centered ? styles.centered : styles.left}>
      <Tag
        ref={headingRef}
        style={{
          fontFamily: "'Roboto', Arial, Helvetica, sans-serif",
          fontSize,
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        <span style={{ color: line1Color }}>{line1}</span>
        {!singleLine && <br />}
        <span ref={line2Ref} style={{ color: line2Color }}>{line2}</span>
      </Tag>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dividerSrc}
        alt=""
        aria-hidden="true"
        style={{
          display: 'block',
          height: 'auto',
          marginTop: dividerSpacing,
          ...(centered ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
          ...(dividerWidth ? { width: dividerWidth } : { visibility: 'hidden' }),
        }}
      />
    </div>
  )
}
