'use client'

import { useState } from 'react'
import DynamicHeading from './DynamicHeading'
import styles from './BookDanFAQ.module.css'

function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.faqItem}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
      </button>
      <div className={`${styles.body} ${open ? styles.bodyOpen : ''}`}>
        <div className={styles.bodyInner}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function BookDanFAQ() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <DynamicHeading
          line1="Frequently Asked "
          line2="Questions"
          dividerSrc="/images/divider-blue.png"
          line1Color="#000000"
          line2Color="#000000"
          singleLine
        />

        <div className={styles.faqList}>

          <FAQItem question="Can you tell us a bit about yourself and why you chose to write The Fab Four Pillars of Impact?">
            <p className={styles.answer}>I&apos;ve spent more than three decades leading our family&apos;s construction company — first as CEO, and now as Board Chair. My career has been shaped by building teams, navigating change, and learning how to create environments where people can truly thrive.</p>
            <p className={styles.answer}>Alongside that, I&apos;ve been a lifelong Beatles fan. I saw their debut on <em>The Ed Sullivan Show</em> as a boy, and over the years I became fascinated not only with their music, but with how four incredibly different personalities came together to create something far greater than any one of them could have achieved alone.</p>
            <p className={styles.answer}><em>The Fab Four Pillars of Impact</em> grew out of that insight. It&apos;s a way of passing on the lessons I&apos;ve learned throughout my career and honoring a band that shaped so much of my life.</p>
          </FAQItem>

          <FAQItem question="How do you personally define organizational excellence? And how is it different from simply being &quot;high-performing&quot;?">
            <p className={styles.answer}>High performance is about results. Excellence is about identity. A high-performing team can hit targets, but excellence shapes <em>how</em> they hit those targets — and how consistently they do it, even under pressure. Excellence is cultural. It&apos;s embedded. It&apos;s not reliant on a single leader, a single moment, or a single win.</p>
            <p className={styles.answer}>Organizational excellence means:</p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>The right people are in the right roles</li>
              <li className={styles.bullet}>Everyone understands the vision and feels connected to it</li>
              <li className={styles.bullet}>There&apos;s trust, accountability, and healthy conflict</li>
              <li className={styles.bullet}>The team works in harmony, even when they disagree</li>
              <li className={styles.bullet}>Creativity and problem-solving are part of the DNA</li>
            </ul>
            <p className={styles.answer}>High performance can come and go. Excellence endures.</p>
          </FAQItem>

          <FAQItem question="What role does leadership play in creating and sustaining excellence?">
            <p className={styles.answer}>Leadership is the spark, the shield, and the steward of excellence. Leaders set the tone through their clarity, their consistency, and their character. They create the conditions where people feel trusted, supported, and challenged. They&apos;re responsible for aligning the team around a catalytic vision and ensuring the right people are in the right seats.</p>
            <p className={styles.answer}>But sustaining excellence often comes down to humility. Leaders must recognize that their role is not to be the hero; it&apos;s to create heroes. Excellence thrives when leadership shifts from control to empowerment and from ego to service.</p>
          </FAQItem>

          <FAQItem question="When did you discover the connection between The Beatles and leadership?">
            <p className={styles.answer}>It happened gradually, and then all at once. I had always admired The Beatles musically, but it wasn&apos;t until later in my leadership career that their story began to look familiar. I saw the same dynamics in my own teams — different personalities, complementary strengths, conflict that could either hurt or strengthen relationships, and moments of breakthrough that only happened because people trusted each other enough to try something new.</p>
            <p className={styles.answer}>When I started studying their journey more intentionally, I realized there was a leadership blueprint hidden inside it. They weren&apos;t just a great band — they were a remarkable team. And they demonstrated, in real time, what happens when talent, trust, purpose, and creativity all come together. That insight became the foundation for the Fab Four Pillars.</p>
          </FAQItem>

          <FAQItem question="How can leaders recognize when excellence is truly taking root?">
            <p className={styles.answer}>You can measure performance, but excellence reveals itself in behavior. You know excellence is taking root when:</p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>People feel ownership — not just responsibility</li>
              <li className={styles.bullet}>Teams collaborate without needing to be pushed</li>
              <li className={styles.bullet}>Problems get surfaced early, not hidden</li>
              <li className={styles.bullet}>Trust is visible in how people speak to each other</li>
              <li className={styles.bullet}>Creativity increases</li>
              <li className={styles.bullet}>Friction becomes productive instead of personal</li>
            </ul>
            <p className={styles.answer}>The ultimate sign? The organization operates at a high level even when the leader is not in the room. That&apos;s when excellence has become culture, not effort.</p>
          </FAQItem>

          <FAQItem question="How can organizations maintain excellence during rapid change or crisis?">
            <p className={styles.answer}>Change doesn&apos;t destroy excellence — it reveals it. The organizations that maintain excellence during uncertainty share three traits:</p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}><strong>Clarity of purpose.</strong> When the vision is catalytic, people stay aligned even when the plan changes.</li>
              <li className={styles.bullet}><strong>Trust.</strong> Teams with strong esprit de corps can adapt quickly because psychological safety is already in place.</li>
              <li className={styles.bullet}><strong>Creativity.</strong> The Beatles reinvented themselves constantly. Great organizations do the same — experimenting, learning fast, and staying open to new ideas.</li>
            </ul>
            <p className={styles.answer}>Excellence is not rigidity. It&apos;s resilience.</p>
          </FAQItem>

          <FAQItem question="What does your book bring to the business world that others lack?">
            <p className={styles.answer}>Leadership literature is full of frameworks, but many lack soul. What this book adds is a human story that people already understand and feel connected to. You don&apos;t have to convince someone to care about The Beatles. They&apos;re woven into our culture. Using their journey as the backdrop makes the lessons more memorable, more relatable, and more actionable.</p>
            <p className={styles.answer}>But this book also brings a perspective shaped by experience — not theoretical leadership, but leadership lived over decades, through growth, crisis, conflict, and transformation. The combination of story + practicality + lived experience is what makes this book different.</p>
          </FAQItem>

          <FAQItem question="How does individual excellence connect to organizational excellence?">
            <p className={styles.answer}>Individual excellence is the spark. Organizational excellence is the fire. The Beatles were four extraordinary individuals — but they reached greatness only when their strengths aligned toward a shared purpose.</p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>Strengths complement each other</li>
              <li className={styles.bullet}>Roles are clear</li>
              <li className={styles.bullet}>Egos don&apos;t get in the way</li>
              <li className={styles.bullet}>People understand how their work contributes to the whole</li>
            </ul>
            <p className={styles.answer}>A team is not excellent because everyone is perfect. A team is excellent because the combination of their imperfect strengths creates something remarkable.</p>
          </FAQItem>

          <FAQItem question="What's one piece of advice for CEOs or leaders?">
            <p className={styles.answer}><strong>Put people first and roles second.</strong> When you invest deeply in understanding your team&apos;s strengths, motivations, and personalities, everything else becomes easier: strategy, communication, accountability, and culture. Excellence always begins with the right people in the right seats.</p>
            <p className={styles.answer}>And second, never underestimate the power of harmony: trust, respect, humor, and healthy conflict. The Beatles proved that when the relationships flourish, the work soars.</p>
          </FAQItem>

          <FAQItem question="What's next for you?">
            <p className={styles.answer}>In the coming year, I&apos;ll be sharing more leadership tools through Fab Four Academy, including workshops, retreats, and the release of my second book, <em>Daily Words of Wisdom</em>. I&apos;ll also be appearing on podcasts, speaking at events, and releasing resources that help leaders bring the Fab Four Pillars to life inside their organizations.</p>
            <p className={styles.answer}>My mission is simple: help people lead with more clarity, creativity, and connection — The Beatles way.</p>
          </FAQItem>

        </div>
      </div>
    </section>
  )
}
