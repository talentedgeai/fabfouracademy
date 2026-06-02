export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MeetDan from '@/components/MeetDan'
import Leadership from '@/components/Leadership'
import WhatDanBrings from '@/components/WhatDanBrings'
import Podcast from '@/components/Podcast'
import WordsOfWisdom from '@/components/WordsOfWisdom'
import Footer from '@/components/Footer'
import { getTodaysPost } from '@/lib/wow-utils'

export default async function Home() {
  const post = await getTodaysPost()
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MeetDan />
        <Leadership />
        <WhatDanBrings />
        <Podcast />
        <WordsOfWisdom post={post} />
      </main>
      <Footer />
    </>
  )
}
