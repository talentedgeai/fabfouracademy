import DynamicHeading from './DynamicHeading'
import styles from './JoinSignup.module.css'

const BENEFITS = [
  'Beatles-inspired insights delivered to your inbox',
  'Connect with Beatles fans around the world',
  'Early access to books and workshops',
  'One great song to start your day!',
]

export default function JoinSignup() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <DynamicHeading
            line1="What You Get "
            line2="When You Join"
            dividerSrc="/images/divider-yellow.png"
            line1Color="#000000"
            line2Color="#000000"
          />
          <ul className={styles.bullets}>
            {BENEFITS.map((b) => (
              <li key={b} className={styles.bullet}>{b}</li>
            ))}
          </ul>
          <p className={styles.note}>
            The first 100 people to sign up will get a free digital copy of <em>Daily Words of Wisdom</em>.
          </p>
        </div>

        <div className={styles.formSide}>
          <DynamicHeading
            line1="Sign "
            line2="Up"
            dividerSrc="/images/divider-blue.png"
            line1Color="#000000"
            line2Color="#000000"
          />
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
