// Revalidate every hour so "Today's Words of Wisdom" updates daily
export const revalidate = 3600

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MeetDan from '@/components/MeetDan'
import Leadership from '@/components/Leadership'
import WhatDanBrings from '@/components/WhatDanBrings'
import Podcast from '@/components/Podcast'
import WordsOfWisdom from '@/components/WordsOfWisdom'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MeetDan />
        <Leadership />
        <WhatDanBrings />
        <Podcast />
        <WordsOfWisdom />
      </main>
      <Footer />
    </>
  )
}
