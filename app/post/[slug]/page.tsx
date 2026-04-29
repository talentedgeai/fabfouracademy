import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogRecentPosts from '@/components/BlogRecentPosts'
import { BLOG_POSTS, getBlogPostBySlug, getRecentPosts } from '@/app/blog/posts'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog | Fab Four Academy`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const recent = getRecentPosts(slug, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ───────────────────────────────── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
          </div>
        </section>

        {/* ── Featured Image ─────────────────────── */}
        <div className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className={styles.featuredImg}
          />
        </div>

        {/* ── Content ────────────────────────────── */}
        <article className={styles.article}>
          <div className={`container ${styles.articleInner}`}>
            <div className={styles.content}>
              {post.content.map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.backLink}>
              <Link href="/blog" className={styles.back}>
                ← Back to Blog
              </Link>
            </div>
          </div>
        </article>

        {/* ── Recent Posts ───────────────────────── */}
        {recent.length > 0 && <BlogRecentPosts posts={recent} />}
      </main>
      <Footer />
    </>
  )
}
