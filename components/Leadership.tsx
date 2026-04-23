import Image from 'next/image'
import styles from './Leadership.module.css'

const PILLARS = [
  {
    num: '01',
    title: 'Excellence as Culture, Not a Metric',
    desc: "Excellence is not a target — it's a way of being, embedded in every decision and relationship.",
  },
  {
    num: '02',
    title: 'Right People in the Right Roles',
    desc: 'Assembling complementary talents with clearly defined roles establishes the foundation for exceptional performance.',
  },
  {
    num: '03',
    title: 'Vision That Aligns and Energizes',
    desc: 'A catalytic vision keeps teams aligned even when the plan changes — and propels them toward greatness.',
  },
  {
    num: '04',
    title: 'Trust, Humility, and Esprit de Corps',
    desc: 'Setting aside egos and fostering healthy competition creates the team spirit essential for sustained excellence.',
  },
  {
    num: '05',
    title: 'Creativity, Reinvention, and Collective Synergy',
    desc: 'Great organizations experiment, learn fast, and stay open — creating something greater than the sum of its parts.',
  },
]

export default function Leadership() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className="eyebrow">Leadership Philosophy</span>
          <h2 className={styles.h2}>Leadership, Harmony, and Human-Centered Excellence</h2>
          <p className={styles.intro}>
            Dan's work explores leadership not as performance, but as identity — built
            deliberately through people, trust, and shared purpose.
          </p>

          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <div key={p.num} className={styles.step}>
                <span className={styles.num}>{p.num}</span>
                <div>
                  <div className={styles.stepTitle}>{p.title}</div>
                  <div className={styles.stepDesc}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/home-leadership.png"
              alt="Leadership through The Beatles"
              fill
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
