'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BLOG_POSTS, CATEGORIES, type BlogCategory } from '@/app/blog/posts'
import styles from './BlogList.module.css'

const PAGE_SIZE = 9

export default function BlogList() {
  const [active, setActive] = useState<'All' | BlogCategory>('All')
  const [page, setPage] = useState(1)

  const filtered = active === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((p) => p.category === active)

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleCategory(cat: 'All' | BlogCategory) {
    setActive(cat)
    setPage(1)
  }

  return (
    <section className={styles.section}>
      <div className="container">

        {/* Category filter tabs */}
        <div className={styles.tags}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tag} ${active === cat ? styles.tagActive : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className={styles.grid}>
          {paginated.map((post) => (
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
                {active === 'All' && (
                  <span className={styles.cardCategory}>{post.category}</span>
                )}
                <h2 className={styles.title}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(n)}
                aria-label={`Page ${n}`}
              >
                {n}
              </button>
            ))}
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
