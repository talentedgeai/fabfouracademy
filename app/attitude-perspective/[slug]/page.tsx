import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import WOWFeatured from '@/components/WOWFeatured'
import WOWCTA from '@/components/WOWCTA'
import Footer from '@/components/Footer'
import MonthlyFAQ from '@/components/MonthlyFAQ'
import { MONTHLY_POSTS, getPostBySlug } from '../posts'
import type { TextBlock } from '../posts'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return MONTHLY_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Fab Four Academy`,
    description: post.subtitle,
  }
}

/** Render inline markdown: **bold** and [text](url) */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    if (match[1] !== undefined) {
      parts.push(<strong key={match.index}>{match[1]}</strong>)
    } else {
      const isExternal = match[3].startsWith('http')
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className={styles.inlineLink}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderBlock(block: TextBlock, i: number) {
  if (block.type === 'p') {
    return (
      <p key={i} className={styles.paragraph}>
        {renderInline(block.text)}
      </p>
    )
  }
  if (block.type === 'framework') {
    return (
      <div key={i} className={styles.frameworkBox}>
        <h4 className={styles.frameworkTitle}>{block.title}</h4>
        <ol className={styles.frameworkList}>
          {block.items.map((item, j) => (
            <li key={j} className={styles.frameworkItem}>
              <strong>{item.label}</strong> — {renderInline(item.text)}
            </li>
          ))}
        </ol>
      </div>
    )
  }
  return null
}

export default async function MonthlyPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main>
        <article className={styles.article}>
          <div className={`container ${styles.articleInner}`}>

            {/* ── Header image ─────────────────────── */}
            <div className={styles.imageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt="The Beatles colored drawing"
                className={styles.featuredImg}
              />
            </div>

            {/* ── Month + Title + Subtitle ──────────── */}
            <header className={styles.header}>
              <span className={styles.month}>{post.month}</span>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.subtitle}><strong>{post.subtitle}</strong></p>
            </header>

            <hr className={styles.divider} />

            {/* ── YouTube embed ─────────────────────── */}
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              />
            </div>

            {/* ── Intro paragraphs ──────────────────── */}
            <div className={styles.intro}>
              {post.intro.map((para, i) => (
                <p key={i} className={styles.paragraph}>
                  {renderInline(para)}
                </p>
              ))}
            </div>

            {/* ── Sections ──────────────────────────── */}
            {post.sections.map((section, si) => (
              <section key={si} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                <div className={styles.sectionBody}>
                  {section.blocks.map((block, bi) => renderBlock(block, bi))}
                </div>
                <div className={styles.reflectionBox}>
                  <span className={styles.reflectionLabel}>Reflection #{si + 1}</span>
                  <p className={styles.reflectionText}>{section.reflection}</p>
                </div>
              </section>
            ))}

            {/* ── FAQ ───────────────────────────────── */}
            <section className={styles.faqSection}>
              <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
              <MonthlyFAQ items={post.faq} />
            </section>

            {/* ── Back link ─────────────────────────── */}
            <div className={styles.backLink}>
              <Link href="/daily-words-of-wisdom" className={styles.back}>
                ← Back to Words of Wisdom
              </Link>
            </div>

          </div>
        </article>
      </main>

      <WOWFeatured />
      <WOWCTA />
      <Footer />
    </>
  )
}
