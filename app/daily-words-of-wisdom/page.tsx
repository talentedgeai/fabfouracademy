import type { Metadata } from 'next'
import WOWHero from '@/components/WOWHero'
import WOWFeatured from '@/components/WOWFeatured'
import WOWMonthlyThemes from '@/components/WOWMonthlyThemes'
import WOWCTA from '@/components/WOWCTA'
import WOWRecent from '@/components/WOWRecent'

export const metadata: Metadata = {
  title: 'Daily Words of Wisdom | Fab Four Academy',
  description:
    'Beatles-inspired insights delivered to your inbox every morning. Explore monthly journey themes and daily reflections from Fab Four Academy.',
}

export default function DailyWordsOfWisdomPage() {
  return (
    <main>
      <WOWHero />
      <WOWFeatured />
      <WOWMonthlyThemes />
      <WOWCTA />
      <WOWRecent />
    </main>
  )
}
