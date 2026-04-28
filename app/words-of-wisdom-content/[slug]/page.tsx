import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import WOWCTA from '@/components/WOWCTA'
import Footer from '@/components/Footer'
import { POSTS, getPostBySlug } from '../posts'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Daily Words of Wisdom | Fab Four Academy`,
    description: post.subtitle,
  }
}

export default async function WOWPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main>
      {/* ── Hero ───────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.series}>{post.series}</span>
          <span className={styles.published}>{post.published}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.subtitle}>{post.subtitle}</p>
        </div>
      </section>

      {/* ── Featured Image ─────────────────────── */}
      <div className={styles.imageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.imageAlt}
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

          <div className={styles.challengeBox}>
            <span className={styles.challengeLabel}>Daily Challenge</span>
            <p className={styles.challengeText}>{post.dailyChallenge}</p>
          </div>

          <div className={styles.reflectionBox}>
            <span className={styles.reflectionLabel}>Reflection Questions</span>
            <p className={styles.reflectionText}>{post.reflectionQuestions}</p>
          </div>

          <div className={styles.backLink}>
            <Link href="/daily-words-of-wisdom" className={styles.back}>
              ← Back to Daily Words of Wisdom
            </Link>
          </div>

        </div>
      </article>
      </main>
      <WOWCTA />
      <Footer />
    </>
  )
}
