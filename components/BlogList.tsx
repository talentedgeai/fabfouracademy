'use client'

import { useState } from 'react'
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

        {/* Category tags */}
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
            <article key={post.title} className={styles.card}>
              <span className={styles.category}>{post.category}</span>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.readMore}
              >
                Read More →
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
