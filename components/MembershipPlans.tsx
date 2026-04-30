import Link from 'next/link'
import styles from './MembershipPlans.module.css'

interface Tier {
  slug: string
  name: string
  price: string
  cadence: string
  tagline: string
  benefits: string[]
  ctaLabel: string
  highlight?: boolean
}

const TIERS: Tier[] = [
  {
    slug: 'member',
    name: 'Member',
    price: '$99',
    cadence: 'per year',
    tagline: 'The full daily loop, plus the archive and the live moments with Dan.',
    benefits: [
      'Forward & back navigation through the full 365-day Words of Wisdom archive',
      'Daily Words of Wisdom email at 6:00 AM ET',
      'Quarterly AMA sessions with Dan',
      'Community access',
      'Signed copy of The Fab Four Pillars of Impact',
      'Early access to the Daily Words of Wisdom Book',
      'One masterclass per year',
    ],
    ctaLabel: 'Become a Member',
  },
  {
    slug: 'founding',
    name: 'Founding Member',
    price: '$299',
    cadence: 'one-time, lifetime',
    tagline: 'Everything in Member, twice the masterclasses, two signed books — never renews.',
    benefits: [
      'Everything in the Member tier',
      'Two masterclasses per year',
      'Two signed copies of The Fab Four Pillars of Impact',
      'Lifetime access — no renewal',
      'Founding-Member recognition',
    ],
    ctaLabel: 'Become a Founding Member',
    highlight: true,
  },
]

export default function MembershipPlans() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <span className="eyebrow">Membership</span>
          <h2 className={styles.heading}>Become part of the Fab Four Community</h2>
          <p className={styles.lede}>
            The free daily reflection is yours forever. Membership unlocks the
            full 365-day archive, time with Dan, and a signed copy of
            <em> The Fab Four Pillars of Impact</em>.
          </p>
        </header>

        <div className={styles.grid}>
          {TIERS.map((tier) => (
            <article
              key={tier.slug}
              className={`${styles.card} ${tier.highlight ? styles.highlight : ''}`}
            >
              {tier.highlight && <div className={styles.badge}>Best value</div>}
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierTagline}>{tier.tagline}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{tier.price}</span>
                <span className={styles.cadence}>{tier.cadence}</span>
              </div>
              <ul className={styles.benefits}>
                {tier.benefits.map((b) => (
                  <li key={b} className={styles.benefit}>
                    <span aria-hidden="true" className={styles.tick}>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/sign-in?tier=${tier.slug}`}
                className={`btn ${tier.highlight ? 'btn-orange' : 'btn-primary'} ${styles.cta}`}
              >
                {tier.ctaLabel}
              </Link>
            </article>
          ))}
        </div>

        <p className={styles.footnote}>
          Checkout opens soon. Click a plan above and we&apos;ll save your seat
          for the moment it goes live.
        </p>

        <aside className={styles.freeCallout}>
          <p className={styles.freeCalloutText}>
            Not ready to join us yet, but still want to get the Daily Words of
            Wisdom emailed to you?{' '}
            <Link href="/daily-email-signup" className={styles.freeCalloutLink}>
              Click here →
            </Link>
          </p>
        </aside>
      </div>
    </section>
  )
}
