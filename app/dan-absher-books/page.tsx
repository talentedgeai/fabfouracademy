import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BooksHero from '@/components/BooksHero'
import BooksShowcase from '@/components/BooksShowcase'
import BooksAuthor from '@/components/BooksAuthor'
import BooksPraise from '@/components/BooksPraise'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Books | Fab Four Academy',
  description: 'Books by Dan Absher — The Fab Four Academy Book Collection',
}

export default function BooksPage() {
  return (
    <>
      <Navbar />
      <main>
        <BooksHero />
        <BooksShowcase />
        <BooksAuthor />
        <BooksPraise />
      </main>
      <Footer />
    </>
  )
}
