import DynamicHeading from './DynamicHeading'
import styles from './BookDanFAQ.module.css'

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
        />

        <div className={styles.faqList}>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>Can you tell us about yourself and why you wrote The Fab Four Pillars of Impact?</h3>
            <p className={styles.answer}>
              I&apos;m a lifelong entrepreneur and business leader who has spent over 32 years leading my family&apos;s construction company. Throughout that journey, I&apos;ve been fortunate to have incredible mentors, read voraciously, and learn from both successes and failures. I&apos;ve also been passionate about sports — particularly basketball — and have coached youth teams for many years.
            </p>
            <p className={styles.answer}>
              But there&apos;s another passion that has shaped me just as profoundly: The Beatles. My love for them began when I was five years old, watching their debut on <em>The Ed Sullivan Show</em>. Over the decades, I&apos;ve studied their music, their story, and the dynamics of their remarkable partnership. What I discovered was that their journey contains some of the most powerful lessons about teamwork, leadership, and organizational excellence that I&apos;ve ever encountered.
            </p>
            <p className={styles.answer}>
              I wrote <em>The Fab Four Pillars of Impact</em> because I wanted to share those lessons with other leaders and organizations. The Beatles&apos; story — their rise, their extraordinary peak, and ultimately their breakup — offers a complete case study in what it takes to build and sustain excellence, and what happens when those foundations erode.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>How do you define organizational excellence — and how is it different from simply being &quot;high-performing&quot;?</h3>
            <p className={styles.answer}>
              High performance is about results — hitting your numbers, winning the championship, releasing a hit record. Organizational excellence is something deeper. It&apos;s about creating the conditions where exceptional results become sustainable and repeatable, where the culture itself drives performance rather than just individual talent or effort.
            </p>
            <p className={styles.answer}>
              In my framework, organizational excellence rests on four pillars:
            </p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>Having the right people in the right seats — assembling complementary talents with clearly defined roles</li>
              <li className={styles.bullet}>Catalytic vision — a compelling, shared purpose that energizes everyone and guides decisions</li>
              <li className={styles.bullet}>Esprit de corps — the spirit, culture, and camaraderie that keeps teams cohesive and motivated</li>
              <li className={styles.bullet}>The Magical Mystery — the synergy and serendipity that transforms good teams into legendary ones</li>
              <li className={styles.bullet}>Excellence means all four pillars are strong simultaneously — and that&apos;s genuinely rare</li>
            </ul>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What role does leadership play in creating and sustaining excellence?</h3>
            <p className={styles.answer}>
              Leadership is absolutely central — it&apos;s the architect of all four pillars. Leaders make the crucial decisions about who joins the team and what roles they play. Leaders articulate and embody the vision that gives the organization its direction and energy. Leaders model and shape the culture that either builds or destroys esprit de corps.
            </p>
            <p className={styles.answer}>
              But here&apos;s what I find fascinating about The Beatles as a case study: their leadership was distributed and evolved over time. In their early years, Brian Epstein provided crucial external leadership. John Lennon was the dominant creative force. But as they grew, Paul McCartney increasingly took on leadership roles, and even George Harrison and Ringo Starr contributed to the leadership ecosystem in important ways.
            </p>
            <p className={styles.answer}>
              The most important leadership quality I&apos;ve observed — both in The Beatles and in excellent organizations — is the ability to hold the tension between individual brilliance and collective harmony. The best leaders know when to let individual stars shine and when to subordinate individual interests for the good of the whole.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>When did you discover the connection between The Beatles and leadership?</h3>
            <p className={styles.answer}>
              It happened gradually over many years. As a business leader, I was constantly reading books on management, strategy, and organizational behavior. And I kept noticing that the principles I was reading about — team dynamics, vision, culture, innovation — were principles I could see playing out in the story of The Beatles.
            </p>
            <p className={styles.answer}>
              The real breakthrough came when I started studying their story more systematically and realized that their arc from Liverpool to Abbey Road to the rooftop concert is essentially a complete case study in organizational excellence. They built something extraordinary, achieved things no one had ever achieved before, and then — crucially — we can study exactly why it fell apart. That&apos;s invaluable for leaders.
            </p>
            <p className={styles.answer}>
              When I started sharing these connections with other business leaders — first informally, then in workshops — the response was extraordinary. People who had been studying leadership for decades were suddenly seeing it through a completely fresh lens. That&apos;s when I knew I had to write the book.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>How can leaders recognize when excellence is truly taking root?</h3>
            <p className={styles.answer}>
              There are some unmistakable signs that your organization is moving from good to truly excellent. I look for these indicators:
            </p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>People are energized and engaged, not just compliant — they bring discretionary effort</li>
              <li className={styles.bullet}>The team produces results that surprise even themselves — they achieve things they didn&apos;t think were possible</li>
              <li className={styles.bullet}>There&apos;s creative friction — people challenge each other&apos;s ideas — but it&apos;s productive rather than destructive</li>
              <li className={styles.bullet}>New members quickly absorb the culture and raise their game to match it</li>
              <li className={styles.bullet}>The organization navigates setbacks and challenges with resilience rather than fragility</li>
              <li className={styles.bullet}>There&apos;s a sense of joy and pride in the work — people feel they&apos;re part of something meaningful</li>
            </ul>
            <p className={styles.answer}>
              Think about The Beatles at their peak — say, 1965 to 1967. Every one of those indicators was present. They were producing music that stunned even their most sophisticated critics, they were constantly challenging and inspiring each other, and there was an unmistakable sense that something truly special was happening.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>How can organizations maintain excellence during rapid change or crisis?</h3>
            <p className={styles.answer}>
              This is where the fourth pillar — what I call the Magical Mystery — becomes most important. Organizations that have truly internalized their purpose and built genuine esprit de corps have a resilience that purely performance-driven organizations lack.
            </p>
            <p className={styles.answer}>
              Three principles matter most during times of rapid change:
            </p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}><strong>Return to your foundational purpose.</strong> When everything around you is changing, your &quot;why&quot; becomes your anchor. The Beatles, even at their most experimental, never lost sight of their fundamental purpose: to create music that moved people.</li>
              <li className={styles.bullet}><strong>Invest in relationships, not just performance.</strong> Under pressure, organizations are tempted to focus entirely on outputs and results. But the relationships — the trust, the mutual commitment, the shared identity — are what make sustained performance possible.</li>
              <li className={styles.bullet}><strong>Maintain the creative tension.</strong> Excellence requires both stability and innovation, both discipline and freedom. The leaders who navigate change best are those who can hold both sides of that tension simultaneously.</li>
            </ul>
            <p className={styles.answer}>
              When The Beatles faced the crisis of Epstein&apos;s death in 1967, the organizations that would have thrived were the ones with strong foundations in all four pillars. Unfortunately, by that point, some of those foundations had begun to crack.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What does your book bring to the business world that others lack?</h3>
            <p className={styles.answer}>
              Most business books either tell you what to do (here are the principles of excellent organizations) or show you case studies of successful companies. What&apos;s rare is a case study that is simultaneously so richly documented, so universally known, and so complete — including both the extraordinary peak and the eventual decline.
            </p>
            <p className={styles.answer}>
              The Beatles offer all of that. We know their story in remarkable detail because it&apos;s been documented through thousands of interviews, biographies, and recordings. Almost everyone knows who they are, which means leaders don&apos;t have to build context — they already have an intuitive feel for the personalities and dynamics involved. And their story has a beginning, a middle, and an end — we can study not just how they built excellence but why they couldn&apos;t sustain it.
            </p>
            <p className={styles.answer}>
              But beyond the case study itself, I think the book brings something that&apos;s genuinely rare in business literature: joy. Reading about The Beatles — even in a business context — is simply a pleasure. And when learning is enjoyable, it sticks. The lessons from this book tend to stay with readers in a way that more conventional business books don&apos;t.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>How does individual excellence connect to organizational excellence?</h3>
            <p className={styles.answer}>
              This is one of the most important questions in leadership, and The Beatles offer a fascinating answer. Individually, each Beatle was extraordinarily talented — John&apos;s wit and edge, Paul&apos;s melodic genius and perfectionism, George&apos;s spiritual depth and guitar mastery, Ringo&apos;s impeccable rhythmic instincts and team-first attitude.
            </p>
            <p className={styles.answer}>
              But here&apos;s what&apos;s crucial: The Beatles as a group consistently produced results that exceeded what any of them could achieve individually. Their solo careers — while successful — never reached the heights of their collective work. That&apos;s not a coincidence. It&apos;s a demonstration of what&apos;s possible when individual excellence is channeled through the right collective structures.
            </p>
            <ul className={styles.bullets}>
              <li className={styles.bullet}>Individual excellence is necessary but not sufficient for organizational excellence</li>
              <li className={styles.bullet}>The right structure amplifies individual talent exponentially</li>
              <li className={styles.bullet}>Individual ego, unchecked, is the most common destroyer of collective excellence</li>
              <li className={styles.bullet}>The best teams create conditions where individuals are simultaneously challenged and supported to reach their highest potential</li>
            </ul>
            <p className={styles.answer}>
              For leaders, the implication is clear: your job isn&apos;t just to recruit and develop individual talent. It&apos;s to create the conditions where individual excellence combines into something greater than the sum of its parts.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What&apos;s one piece of advice for CEOs or leaders wanting to build excellence?</h3>
            <p className={styles.answer}>
              Start with ruthless honesty about where you are on each of the four pillars. Most organizations are strong on one or two and weak on the others. The temptation is to keep investing in your strengths — to keep doing more of what you&apos;re good at. But organizational excellence requires all four pillars to be strong simultaneously.
            </p>
            <p className={styles.answer}>
              And second: pay attention to the Magical Mystery — the intangible energy that either exists in your organization or doesn&apos;t. You can&apos;t manufacture it directly, but you can create the conditions for it to emerge. When it&apos;s present, you&apos;ll know it. Your people will feel like they&apos;re part of something special. And that feeling, once it takes hold, is extraordinarily powerful.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.question}>What&apos;s next for you?</h3>
            <p className={styles.answer}>
              I&apos;m deeply committed to getting the ideas in this book into the hands of as many leaders as possible. That means speaking — I give keynotes and workshops based on the book to leadership teams, YPO and EO chapters, universities, and corporate retreats. I&apos;m also working on the follow-up book, <em>Daily Words of Wisdom</em>, which brings 365 days of Beatles-inspired insights directly to individuals.
            </p>
            <p className={styles.answer}>
              Beyond that, I&apos;m building Fab Four Academy as a platform for ongoing education — a community where leaders can continue to learn from The Beatles and from each other. It&apos;s a deeply personal project, one that combines everything I care about most: music, leadership, learning, and building something that outlasts any individual contribution. Very Beatles, when you think about it.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
