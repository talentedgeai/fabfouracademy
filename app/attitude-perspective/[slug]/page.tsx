import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
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

/** Convert **bold** and [text](url) in a string to React spans/anchors */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  // Pattern: **bold** or [text](url)
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^)]+)\)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    if (match[1] !== undefined) {
      // **bold**
      parts.push(<strong key={match.index}>{match[1]}</strong>)
    } else {
      // [text](url)
      parts.push(
        <a key={match.index} href={match[3]} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }

  if (last < text.length) {
    parts.push(text.slice(last))
  }

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

        {/* ── Hero ─────────────────────────────── */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className={styles.series}>{post.series}</span>
            <span className={styles.month}>{post.month}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.subtitle}>{post.subtitle}</p>
          </div>
        </section>

        {/* ── Header Image ─────────────────────── */}
        <div className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt="The Beatles colored drawing"
            className={styles.featuredImg}
          />
        </div>

        {/* ── Article ──────────────────────────── */}
        <article className={styles.article}>
          <div className={`container ${styles.articleInner}`}>

            {/* YouTube embed */}
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.video}
              />
            </div>

            {/* Intro paragraphs */}
            <div className={styles.intro}>
              {post.intro.map((para, i) => (
                <p key={i} className={styles.paragraph}>
                  {renderInline(para)}
                </p>
              ))}
            </div>

            {/* Sections */}
            {post.sections.map((section, si) => (
              <section key={si} className={styles.section}>
                <h2 className={styles.sectionHeading}>{section.heading}</h2>
                {section.blocks.map((block, bi) => renderBlock(block, bi))}
                <div className={styles.reflectionBox}>
                  <span className={styles.reflectionLabel}>Reflection</span>
                  <p className={styles.reflectionText}>{section.reflection}</p>
                </div>
              </section>
            ))}

            {/* FAQ */}
            <section className={styles.faqSection}>
              <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
              <MonthlyFAQ items={post.faq} />
            </section>

            {/* Related links */}
            {post.relatedLinks.length > 0 && (
              <div className={styles.relatedLinks}>
                <h3 className={styles.relatedHeading}>Related Links</h3>
                <ul className={styles.relatedList}>
                  {post.relatedLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className={styles.relatedLink}
                        {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back link */}
            <div className={styles.backLink}>
              <Link href="/daily-words-of-wisdom" className={styles.back}>
                ← Back to Words of Wisdom
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
