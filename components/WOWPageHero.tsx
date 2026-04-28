import Link from 'next/link'
import DynamicHeading from './DynamicHeading'
import styles from './WOWPageHero.module.css'

const TODAY_POST = {
  date: 'April 28, 2026',
  title: "I'll Get You",
  subtitle: "Believing you'll succeed changes how you show up",
  teaser:
    'You can feel the infectious optimism in every note of this playful B-side to "She Loves You." John and Paul wrote it quickly in 1963, expressing confident romantic pursuit. The song demonstrates how believing in positive outcomes can change your energy completely.',
  imageUrl:
    'https://static.wixstatic.com/media/6e1415_82e28dcd29c94ae296722998eb17b208~mv2.png',
  imageAlt:
    'Person confidently walking forward with determined stride, positive energy radiating outward',
  href: '/words-of-wisdom-content/ill-get-you',
}

export default function WOWPageHero() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* Centered heading */}
        <DynamicHeading
          line1="Today's Words of "
          line2="Wisdom"
          dividerSrc="/images/divider-orange.png"
          tag="h1"
          fontSize={56}
          line1Color="#000000"
          line2Color="#000000"
          centered
          singleLine
        />

        {/* Post card: image left, content right */}
        <div className={styles.postCard}>
          <div className={styles.postImageCol}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TODAY_POST.imageUrl}
              alt={TODAY_POST.imageAlt}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postContentCol}>
            <span className={styles.dateBadge}>{TODAY_POST.date}</span>
            <h2 className={styles.postTitle}>{TODAY_POST.title}</h2>
            <p className={styles.postSubtitle}>{TODAY_POST.subtitle}</p>
            <p className={styles.postTeaser}>{TODAY_POST.teaser}</p>
            <Link href={TODAY_POST.href} className="btn btn-yellow" style={{ width: 'fit-content' }}>
              Read Full Reflection
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
