import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import PhotoStrip from '@/components/PhotoStrip'
import MeetDan from '@/components/MeetDan'
import Leadership from '@/components/Leadership'
import WhatDanBrings from '@/components/WhatDanBrings'
import Podcast from '@/components/Podcast'
import WordsOfWisdom from '@/components/WordsOfWisdom'
import CTABanner from '@/components/CTABanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhotoStrip />
        <MeetDan />
        <Leadership />
        <WhatDanBrings />
        <Podcast />
        <WordsOfWisdom />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
