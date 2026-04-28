import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import JoinHero from '@/components/JoinHero'
import JoinSignup from '@/components/JoinSignup'
import JoinFAQ from '@/components/JoinFAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Join The Community | Fab Four Academy',
  description: 'Join the Fab Four Community and get Beatles-inspired insights delivered to your inbox every day.',
}

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main>
        <JoinHero />
        <JoinSignup />
        <JoinFAQ />
      </main>
      <Footer />
    </>
  )
}
