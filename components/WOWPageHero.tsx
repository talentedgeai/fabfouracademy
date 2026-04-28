import Link from 'next/link'
import PhotoStrip from './PhotoStrip'
import DynamicHeading from './DynamicHeading'
import styles from './WOWPageHero.module.css'

const TODAY_POST = {
  title: "I'll Get You",
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
      <PhotoStrip />

      <div className={`container ${styles.cardSection}`}>

        {/* Left: heading + divider */}
        <div className={styles.wowLeft}>
          <DynamicHeading
            line1="Today's"
            line2="Words of Wisdom"
            dividerSrc="/images/divider-blue.png"
            line1Color="#000000"
            line2Color="#000000"
            tag="h1"
          />
        </div>

        {/* Right: post card */}
        <div className={styles.postCard}>
          <div className={styles.postImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={TODAY_POST.imageUrl}
              alt={TODAY_POST.imageAlt}
              className={styles.postImage}
            />
          </div>
          <div className={styles.postContent}>
            <h2 className={styles.postTitle}>{TODAY_POST.title}</h2>
            <p className={styles.postBody}>{TODAY_POST.teaser}</p>
            <Link
              href={TODAY_POST.href}
              className="btn btn-primary"
              style={{ width: 'fit-content' }}
            >
              Read Full Reflection
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
