import styles from './PhotoStrip.module.css'

const IMAGES = [
  '/images/home-carousel-1.webp',
  '/images/home-carousel-2.webp',
  '/images/home-carousel-3.jpg',
  '/images/home-carousel-4.jpeg',
  '/images/home-carousel-5.jpeg',
  '/images/home-carousel-6.jpg',
  '/images/home-carousel-7.jpg',
  '/images/home-carousel-8.jpg',
  '/images/home-carousel-9.jpg',
  '/images/home-carousel-10.jpeg',
  '/images/home-carousel-11.jpg',
  '/images/home-carousel-12.jpeg',
]

export default function PhotoStrip() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <div key={i} className={styles.item}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className={styles.img} />
          </div>
        ))}
      </div>
    </div>
  )
}
