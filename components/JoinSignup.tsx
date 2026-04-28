import Image from 'next/image'
import styles from './JoinSignup.module.css'

const BENEFITS = [
  { text: 'Beatles-inspired insights delivered to your inbox', img: '/images/point1.png' },
  { text: 'Connect with Beatles fans around the world', img: '/images/point2.png' },
  { text: 'Early access to books and workshops', img: '/images/point3.png' },
  { text: 'One great song to start your day!', img: '/images/point4.png' },
]

export default function JoinSignup() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>

        {/* ── Left: benefits with images ─────────── */}
        <ul className={styles.benefits}>
          {BENEFITS.map((b) => (
            <li key={b.text} className={styles.benefit}>
              <div className={styles.benefitImg}>
                <Image
                  src={b.img}
                  alt=""
                  aria-hidden="true"
                  fill
                  className={styles.img}
                />
              </div>
              <span className={styles.benefitText}>{b.text}</span>
            </li>
          ))}
        </ul>

        {/* ── Right: sign-up form ────────────────── */}
        <div className={styles.formSide}>
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="joinFirstName">First Name</label>
                <input className={styles.input} id="joinFirstName" name="firstName" type="text" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="joinLastName">Last Name</label>
                <input className={styles.input} id="joinLastName" name="lastName" type="text" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="joinEmail">Email</label>
              <input className={styles.input} id="joinEmail" name="email" type="email" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="joinPhone">Phone</label>
              <input className={styles.input} id="joinPhone" name="phone" type="tel" placeholder="Include country code" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="favoriteSong">Favorite Beatles Song</label>
              <input className={styles.input} id="favoriteSong" name="favoriteSong" type="text" />
            </div>

            <div className={styles.checkboxRow}>
              <input
                className={styles.checkbox}
                id="joinConsent"
                name="consent"
                type="checkbox"
              />
              <label className={styles.checkboxLabel} htmlFor="joinConsent">
                I agree to receive daily emails from Fab Four Academy
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Subscribe Now
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
