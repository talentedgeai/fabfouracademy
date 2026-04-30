/**
 * Daily Email Signup — the free path off the membership page.
 *
 * Reached from the "Click here" callout on /join-fab-four-community when a
 * visitor isn't ready to join paid but still wants the daily reflection.
 *
 * Posts to /api/contacts with type=newsletter, source=/daily-email-signup.
 * Minimal form: just email + first name. Anything more is friction.
 */

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DailyEmailSignupForm from '@/components/DailyEmailSignupForm'

export const metadata: Metadata = {
  title: 'Daily Words of Wisdom by email | Fab Four Academy',
  description:
    "Get a short daily reflection from Dan Absher in your inbox every morning. One song, one idea, one small thing to take into your day. Free, always.",
}

export default function DailyEmailSignupPage() {
  return (
    <>
      <Navbar />
      <main>
        <DailyEmailSignupForm />
      </main>
      <Footer />
    </>
  )
}
