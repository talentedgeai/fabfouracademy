import Image from 'next/image'
import DynamicHeading from './DynamicHeading'
import styles from './BookDanForm.module.css'

export default function BookDanForm() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.formSide}>
          <DynamicHeading
            line1="Submit an "
            line2="Inquiry"
            dividerSrc="/images/divider-blue.png"
            line1Color="#000000"
            line2Color="#000000"
          />
          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="firstName">First Name</label>
                <input className={styles.input} id="firstName" name="firstName" type="text" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="lastName">Last Name</label>
                <input className={styles.input} id="lastName" name="lastName" type="text" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} id="email" name="email" type="email" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">Phone</label>
              <input className={styles.input} id="phone" name="phone" type="tel" placeholder="Include country code" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="organization">Organization / Event Host</label>
              <input className={styles.input} id="organization" name="organization" type="text" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="eventDate">Event Date(s) &amp; Location</label>
              <input className={styles.input} id="eventDate" name="eventDate" type="text" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="eventType">Event Type</label>
              <select className={styles.select} id="eventType" name="eventType">
                <option value="">Select event type</option>
                <option value="conference">Conference</option>
                <option value="workshop">Workshop</option>
                <option value="retreat">Retreat</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="audience">Audience Size &amp; Profile</label>
              <input className={styles.input} id="audience" name="audience" type="text" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="sessionLength">Preferred Session Length</label>
              <select className={styles.select} id="sessionLength" name="sessionLength">
                <option value="">Select session length</option>
                <option value="1hour">1 Hour</option>
                <option value="2hours">2 Hours</option>
                <option value="4hours">4 Hours</option>
                <option value="multiday">Multi-Day Retreat</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="details">Additional Details / Questions</label>
              <textarea className={styles.textarea} id="details" name="details" />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Booking Request
            </button>
          </form>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.portraitContainer}>
            <Image
              src="/images/Dan-Absher.png"
              alt="Dan Absher, keynote speaker"
              fill
              className={styles.portrait}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
