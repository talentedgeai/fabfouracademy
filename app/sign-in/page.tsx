import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Sign in | Fab Four Academy',
  description: 'Member sign-in for Fab Four Academy.',
}

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={`container ${styles.inner}`}>
            <span className="eyebrow">Members</span>
            <h1 className={styles.heading}>Sign-in is coming soon.</h1>
            <p className={styles.body}>
              We&apos;re building member sign-in alongside the upcoming
              membership product. The full Words of Wisdom archive, AMAs,
              masterclasses, and a signed copy of <em>The Fab Four Pillars of
              Impact</em> all live behind it.
            </p>
            <p className={styles.body}>
              Want to be the first to hear when it opens?{' '}
              <Link href="/daily-words-of-wisdom" className={styles.inlineLink}>
                Sign up for the free Daily Words of Wisdom
              </Link>
              {' '}— we&apos;ll let you know there.
            </p>
            <div className={styles.actions}>
              <Link href="/" className="btn btn-primary">
                Back to home
              </Link>
              <Link href="/join-fab-four-community" className="btn btn-white">
                See membership tiers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
