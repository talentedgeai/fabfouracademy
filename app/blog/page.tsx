import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BlogHero from '@/components/BlogHero'
import BlogList from '@/components/BlogList'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | Fab Four Academy',
  description:
    'Leadership lessons, Friday fun, and Beatles wisdom from Fab Four Academy. Stories and insights drawn from the world\'s greatest band.',
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <BlogList />
      </main>
      <Footer />
    </>
  )
}
