import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import JoinHero from '@/components/JoinHero'
import MembershipPlans from '@/components/MembershipPlans'
import JoinFAQ from '@/components/JoinFAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Join Our Community | Fab Four Academy',
  description:
    'Become a Fab Four Academy Member or Founding Member. Unlock the full 365-day Words of Wisdom archive, AMAs with Dan, masterclasses, and a signed copy of The Fab Four Pillars of Impact.',
}

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main>
        <JoinHero />
        <MembershipPlans />
        <JoinFAQ />
      </main>
      <Footer />
    </>
  )
}
