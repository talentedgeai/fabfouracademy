'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BLOG_POSTS, CATEGORIES, type BlogCategory } from '@/app/blog/posts'
import styles from './BlogList.module.css'

export default function BlogList() {
  const [active, setActive] = useState<'All' | BlogCategory>('All')

  const filtered = active === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === active)

  return (
    <section className={styles.section}>
      <div className="container">

        {/* Category filter tabs */}
        <div className={styles.tags}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tag} ${active === cat ? styles.tagActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className={styles.grid}>
          {filtered.map((post) => (
            <a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              {/* 16:9 cover image */}
              <div className={styles.imageWrap}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>

              {/* Card body */}
              <div className={styles.body}>
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
