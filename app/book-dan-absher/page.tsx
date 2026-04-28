import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BookDanHero from '@/components/BookDanHero'
import BookDanForm from '@/components/BookDanForm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Book Dan Absher | Fab Four Academy',
  description: 'Book Dan Absher for your next keynote, workshop, or retreat.',
}

export default function BookDanPage() {
  return (
    <>
      <Navbar />
      <main>
        <BookDanHero />
        <BookDanForm />
      </main>
      <Footer />
    </>
  )
}
