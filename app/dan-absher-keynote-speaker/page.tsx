import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import KeynotesHero from '@/components/KeynotesHero'
import KeynotesAbout from '@/components/KeynotesAbout'
import KeynotesTopics from '@/components/KeynotesTopics'
import KeynotesPraise from '@/components/KeynotesPraise'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Keynote Speaker | Fab Four Academy',
  description: 'Book Dan Absher for your next event — Beatles-inspired keynotes on leadership, teamwork, and excellence.',
}

export default function KeynotesPage() {
  return (
    <>
      <Navbar />
      <main>
        <KeynotesHero />
        <KeynotesAbout />
        <KeynotesTopics />
        <KeynotesPraise />
      </main>
      <Footer />
    </>
  )
}
