import Image from 'next/image'
import styles from './PhotoStrip.module.css'

const IMAGES = [
  { src: '/images/home-carousel-1.webp' },
  { src: '/images/home-carousel-2.webp' },
  { src: '/images/home-carousel-3.jpg' },
  { src: '/images/home-carousel-4.jpeg' },
  { src: '/images/home-carousel-5.jpeg' },
  { src: '/images/home-carousel-6.jpg' },
  { src: '/images/home-carousel-7.jpg' },
  { src: '/images/home-carousel-8.jpg' },
  { src: '/images/home-carousel-9.jpg' },
  { src: '/images/home-carousel-10.jpeg' },
  { src: '/images/home-carousel-11.jpg' },
  { src: '/images/home-carousel-12.jpeg' },
]

export default function PhotoStrip() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        {[...IMAGES, ...IMAGES].map((img, i) => (
          <div key={i} className={styles.item}>
            <Image
              src={img.src}
              alt=""
              width={300}
              height={200}
              className={styles.img}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
