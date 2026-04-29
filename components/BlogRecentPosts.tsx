import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/app/blog/posts'
import styles from './BlogRecentPosts.module.css'

type Props = {
  posts: BlogPost[]
}

export default function BlogRecentPosts({ posts }: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Recent Posts</h2>
          <Link href="/blog" className={styles.ctaLink}>View All Posts →</Link>
        </div>
        <div className={styles.grid}>
          {posts.map((post) => (
            <Link key={post.slug} href={post.href} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <span className={styles.category}>{post.category}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
