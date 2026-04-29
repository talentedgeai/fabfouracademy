export type BlogCategory = 'Leadership Lessons' | 'Friday Fun Day'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  href: string
  category: BlogCategory
  imageUrl: string
  content: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-magic-of-the-fifth-beatle',
    title: 'The Magic of the Fifth Beatle',
    excerpt:
      "The Beatles didn't just become the greatest band in history because of their talent alone — they had a secret ingredient: collaboration. From George Martin's production genius to George Harrison's willingness to bring Eric Clapton in to elevate a song, the Beatles exemplified the power of complementary collaboration. In today's world, this principle isn't just a musical phenomenon; it's a leadership strategy that can unlock extraordinary results for any team.",
    href: '/blog/the-magic-of-the-fifth-beatle',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_7b0d16af57664eeeabb7180c6a87d2ae~mv2.png',
    content: [
      "The Beatles didn't just become the greatest band in history because of their talent alone — they had a secret ingredient: collaboration. From George Martin's production genius to George Harrison's willingness to bring Eric Clapton in to elevate a song, the Beatles exemplified the power of complementary collaboration. In today's world, this principle isn't just a musical phenomenon; it's a leadership strategy that can unlock extraordinary results for any team.",
      "George Martin is often called the \"Fifth Beatle\" for good reason. As their producer, he didn't just record their music — he transformed it. He introduced orchestral arrangements, suggested key changes, and pushed the band to experiment with sounds they'd never considered. His complementary expertise elevated every song he touched. The lesson for leaders? Sometimes the most valuable team member isn't the one who does what everyone else does, but the one who fills the gaps no one else can.",
      "Perhaps the most striking example of complementary collaboration was George Harrison inviting Eric Clapton to play lead guitar on \"While My Guitar Gently Weeps.\" Harrison recognized that Clapton could elevate the song beyond what he himself could play. He put the song's quality above his own ego. Community member Sarah Thompson, CEO of Reynolds Manufacturing, applied this principle by implementing what she calls \"Clapton Sessions\" — bringing in outside experts to collaborate on challenging projects. The results were extraordinary: technical problems that had stumped her team for months were solved.",
      "The magic of the \"Fifth Beatle\" isn't just in the collaboration itself — it's in the openness to new ideas and the willingness to let others elevate what we've already created. The Beatles didn't try to do everything themselves; they recognized that their success was enhanced by the right partnerships. For today's leaders, this principle is invaluable. By fostering a culture where complementary expertise is celebrated, you can unlock new possibilities and propel your team to greatness.",
      "Just like George Harrison and Eric Clapton, sometimes bringing in the right collaborator can be the key to your greatest breakthrough. The question isn't whether you need a Fifth Beatle — it's whether you're creating the conditions that allow one to emerge.",
    ],
  },
  {
    slug: 'the-hamburg-method',
    title: "The Hamburg Method: Leadership Lessons from the Beatles' Hardest Days",
    excerpt:
      "Before they were legends, they were just four guys grinding it out in Hamburg — eight hours a night, seven days a week. Those gigs didn't just toughen them up; they transformed them. In this post, we break down how the Beatles' most intense season became a blueprint for accelerated growth — and how you can create that kind of breakthrough environment for your team.",
    href: '/blog/the-hamburg-method',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_61a213e8318e4b9291a569524652c146~mv2.png',
    content: [
      "Before they were legends, they were just four guys grinding it out in Hamburg — eight hours a night, seven days a week. Those gigs didn't just toughen them up; they transformed them. As detailed in \"The Fab Four Pillars of Excellence,\" this intense period of playing up to eight hours a night, seven days a week transformed them from amateur musicians to professional performers in ways nothing else could have.",
      "But it wasn't just about the hours — it was about accelerated learning through immersive pressure, real-time feedback, rapid experimentation, and deliberate practice. The Beatles had to innovate constantly to keep audiences engaged. They stretched songs, invented new arrangements, and pushed every boundary. \"We had to play for hours and hours on end,\" John Lennon later recalled. \"Every song lasted twenty minutes and had twenty solos in it.\" This punishing schedule — nearly 300 nights in 18 months — forged their musical abilities and group chemistry in ways that couldn't have happened otherwise.",
      "Here's the Hamburg Method framework you can apply to your team. Step 1: Identify your performance zone — where does your team face real stakes and immediate feedback? For software teams, this might be beta testing with key customers. For marketing teams, it might be campaign sprints with daily performance reviews. Step 2: Create focused intensity through two-week innovation sprints, quarterly hackathons, or role rotation programs. Step 3: Build real-time feedback loops — customer feedback panels, peer review systems, and analytics dashboards that show performance as it happens. Step 4: Schedule deliberate practice, dedicating time for skill development and using retrospectives to identify improvement opportunities.",
      "A regional banking team implemented the Hamburg Method to accelerate their new customer onboarding process. They created a two-week \"performance zone\" where team members processed applications with senior advisors providing real-time coaching. They tracked metrics daily and conducted targeted practice on specific friction points. The result? They reduced onboarding time by 62% and improved customer satisfaction scores by 28% — achieving in one quarter what would have typically taken a year of gradual improvement.",
      "The Hamburg Method isn't about working people to exhaustion — it's about creating the conditions for accelerated mastery. When your team faces real stakes, receives immediate feedback, and practices with intention, transformation happens faster than anyone expects. The Beatles proved it. Your team can too.",
    ],
  },
  {
    slug: 'what-george-harrison-can-teach-us-about-team-disengagement',
    title: 'What George Harrison Can Teach Us About Team Disengagement',
    excerpt:
      "Even the greatest teams can fall apart. Just ask The Beatles. Their final years weren't defined by a lack of talent — but by a growing disconnect between members. If it could happen to them, it can happen to any team. Here's what to watch for — and what to do next.",
    href: '/blog/what-george-harrison-can-teach-us-about-team-disengagement',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_9b44143811ea4c5ebf39aeb9974ecf31~mv2.png',
    content: [
      "Even the greatest teams can fall apart. Just ask The Beatles. Their final years weren't defined by a lack of talent — but by a growing disconnect between members. In my years coaching leadership teams, I've witnessed a pattern that mirrors what happened to The Beatles in their later years. Even history's greatest band couldn't survive when team members became disengaged from their shared vision.",
      "When George Harrison quit The Beatles in January 1969 during the \"Let It Be\" sessions, it wasn't a sudden decision. It was the culmination of feeling that his songs weren't receiving the same attention as John and Paul's compositions. His creative contributions were being undervalued. This mirrors what I see in organizations today. According to Gallup, 85% of employees are not engaged at work, costing approximately $7 trillion in lost productivity globally. But the real cost isn't just financial — it's in the lost innovation, the unrealized potential, and ultimately the \"break-up\" of teams that could have achieved greatness.",
      "The most troubling aspect is that leaders often miss the early warning signs. In my analysis of dozens of high-performing teams that eventually derailed, I've observed three consistent indicators of impending disengagement. First: the silence that precedes departure — team members stop offering ideas or volunteering for new initiatives. Second: the shift from \"our\" to \"your\" language — listen for subtle changes in how team members talk about projects and goals. Third: the withdrawal of discretionary effort — going from going above and beyond to doing the bare minimum.",
      "If you recognize these signs in your team, don't wait. Have individual conversations to uncover what's driving the disengagement. Revisit how contributions are being acknowledged and valued. Create new opportunities for growth and creative ownership. The Beatles couldn't course-correct in time — but you can. Great teams aren't built once; they're maintained through continuous attention to the human beings who make them up.",
    ],
  },
  {
    slug: 'before-the-applause-finding-purpose',
    title: "Before the Applause: Finding Purpose in the Hard Day's Nights",
    excerpt:
      "When the Beatles coined the phrase \"a hard day's night\" for their hit song and film, they weren't just creating a clever play on words — they were describing the reality of their journey to success. Before Beatlemania swept the world, the group endured grueling performances in Hamburg, playing up to eight hours a night, seven days a week, often to indifferent audiences.",
    href: '/blog/before-the-applause-finding-purpose',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_9ba5fd023ac64c7fa4d53e1a43504f3c~mv2.png',
    content: [
      "Beatles Song: \"A Hard Day's Night\" (1964). Leadership Principle: Transformative success often comes only after periods of seemingly unrewarded effort.",
      "When the Beatles coined the phrase \"a hard day's night\" for their hit song and film, they weren't just creating a clever play on words — they were describing the reality of their journey to success. Before Beatlemania swept the world, the group endured grueling performances in Hamburg, playing up to eight hours a night, seven days a week, often to indifferent audiences. As John Lennon later reflected, \"We had to play for hours and hours on end. Every song lasted twenty minutes and had twenty solos in it.\" This punishing schedule — playing nearly 300 nights in 18 months — forged their musical abilities and group chemistry in ways that couldn't have happened otherwise.",
      "The business world is full of similar stories. Behind every overnight success is years of quiet, often invisible effort. The most important thing a leader can do during these hard days' nights is keep the team connected to their purpose — the deeper reason behind the work. Purpose transforms endurance into meaning. It turns grinding repetition into deliberate mastery.",
      "In my work with leadership teams, I've found that the organizations most likely to break through are the ones that treat the difficult seasons not as obstacles to endure, but as crucibles to learn in. They don't just survive the hard day's nights — they use them. They build systems, refine processes, develop talent, and strengthen culture precisely because the applause hasn't started yet and they have the space to prepare.",
      "The Beatles didn't know that Hamburg would make them legends. They just kept playing. And when the world was finally ready to hear them, they were ready to be heard. That is the leadership lesson of \"A Hard Day's Night\": keep playing, even before the applause.",
    ],
  },
  {
    slug: 'building-success-lessons-from-a-construction-leader',
    title: 'Building Success: Lessons from a Construction Leader on Leadership & Teamwork',
    excerpt:
      "A great construction leader doesn't just build projects. We build teams, culture, and a legacy that stands the test of time. Throughout my 32 years leading Absher Construction Company, I've developed leadership principles that have helped our company thrive for over three generations.",
    href: '/blog/building-success-lessons-from-a-construction-leader',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_44c559d8042e4fdaae60db3140e50436~mv2.jpg',
    content: [
      "A great construction leader doesn't just build projects. We build teams, culture, and a legacy that stands the test of time. Throughout my 32 years leading Absher Construction Company, I've developed leadership principles that have helped our company thrive for over three generations.",
      "Every great building starts with a solid foundation, and leadership is no different. Years ago, our ownership team had a realization — we were running a successful company, but we couldn't clearly define our purpose. Something was missing. During a retreat, we challenged ourselves to dig deeper and uncover what truly drove us. We defined our core purpose: \"To create and build community with vision and compassion.\" It wasn't just a catchy slogan — it became the foundation of how we led our teams and approached every project. Decisions became clearer, our teams became more engaged, and our work took on a greater meaning.",
      "At Absher Construction, we've found that success depends on having the right people in the right roles. This means not just hiring talented individuals, but creating a culture where people's strengths complement each other and align with our company values: caring about people, servant leadership, doing things right, and doing right things. Just as a well-designed building requires various specialists working in harmony — architects, engineers, craftspeople — a successful company requires thoughtful attention to team composition. \"When you have the right people in the right seats on the bus,\" as I often tell my team, \"the journey becomes not just successful, but transformative.\"",
      "We've never measured success by just finishing a project on time or under budget. What matters is what we leave behind. By choosing to work on projects that truly benefit communities — whether it's a school, a hospital, or a public space — we ensure that our work has lasting value. This mindset changes how you approach business. It's no longer just about winning contracts; it's about building something meaningful that stands the test of time. When you focus on quality, integrity, and a higher purpose, success naturally follows.",
    ],
  },
  {
    slug: 'the-fab-four-vision-it-was-catalytic',
    title: 'The Fab Four Vision: It Was Catalytic',
    excerpt:
      "When studying enduring success, I've discovered that greatness requires more than just a compelling direction — it demands what I call The Fab Four Vision. This transformative approach to leadership isn't merely inspirational; it's catalytic, driving action through an unstoppable momentum that turns potential into purpose.",
    href: '/blog/the-fab-four-vision-it-was-catalytic',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/f31d04_e0dca8b0520246b7bf0958c4fa93c04f~mv2.jpg',
    content: [
      "When studying enduring success, I've discovered that greatness requires more than just a compelling direction — it demands what I call The Fab Four Vision. This transformative approach to leadership isn't merely inspirational; it's catalytic, driving action through an unstoppable momentum that turns potential into purpose.",
      "The Fab Four Vision isn't just about having big dreams. It's about turning them into real, achievable steps. This approach transformed Absher Construction Company. When we defined our core purpose — \"to create and build community with vision and compassion\" — it changed everything. Our work was no longer just about completing projects. It became about making a lasting impact. We weren't just \"cutting stones\" — we were \"building a cathedral.\" That shift from focusing on tasks to embracing a greater purpose energized our entire team and brought new meaning to our work.",
      "I saw this concept in action even during my childhood. My father instinctively knew how to keep momentum alive. On long family road trips, he would keep us engaged by setting little milestones. \"Just wait until we get to the next place! They have the best lunches you've ever seen!\" Those small goals made the journey exciting and gave us something to look forward to. That same idea applies to leadership. A strong vision isn't just about the final destination — it's about creating momentum, setting meaningful milestones, and keeping your team inspired every step of the way.",
      "What makes a vision truly catalytic? Evaluate yours by asking: Does it demand immediate action rather than merely suggesting it? Does it push you and your team beyond established comfort zones? Can it be broken down into achievable milestones? Is it deeply believed by its champions and communicable to others? Does it connect to a greater purpose beyond immediate success metrics?",
      "A genuine Fab Four Vision isn't just a dream — it's an irresistible future that pulls you toward it. The Beatles didn't merely imagine fame; they embodied their future success until it materialized, dedicating countless hours because their vision demanded nothing less. That is the power of a catalytic vision.",
    ],
  },
  {
    slug: 'how-ai-helped-me-write-fab-four-pillars-of-impact',
    title: 'How AI Helped Me Write "Fab Four Pillars of Impact"',
    excerpt:
      'When I first considered writing a book about The Beatles and their blueprint for excellence, I faced a familiar author\'s dilemma: how to efficiently transform decades of knowledge, research, and passion into a cohesive manuscript. Then I discovered the potential of AI as a writing partner, and it transformed my approach to "Fab Four Pillars of Impact."',
    href: '/blog/how-ai-helped-me-write-fab-four-pillars-of-impact',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_ccbc522cbdd94b13870ab28c52357229~mv2.webp',
    content: [
      "When I first considered writing a book about The Beatles and their blueprint for excellence, I faced a familiar author's dilemma: how to efficiently transform decades of knowledge, research, and passion into a cohesive manuscript. Then I discovered the potential of AI as a writing partner, and it transformed my approach to \"Fab Four Pillars of Impact.\"",
      "I discovered that speaking my thoughts aloud produced better results than traditional writing. When sitting down to write, I'd get stuck on sentences, fussing over word choice and structure. But when simply talking through my ideas — explaining Beatles history, drawing connections to business principles, sharing personal anecdotes — the words flowed naturally. Recording these conversations and then working with AI to refine them helped me transform spoken thoughts into polished prose while maintaining my authentic voice.",
      "One of my biggest challenges was organizing the vast Beatles mythology into coherent lessons. Throughout my writing process, I discovered that the structure of the book — the Fab Four Pillars of Excellence — became clearer as I shared more stories. Rather than forcing stories to fit a predetermined structure, I found that the right framework emerged organically from the narratives themselves. The Beatles' journey naturally revealed these pillars: getting the right people in the right seats on the bus; creating a catalytic vision; building esprit de corps; and embracing the magical mystery of synergy and serendipity.",
      "The AI didn't write the book for me — it helped me hear myself more clearly. It reflected back the patterns in my thinking, helped me see which stories were most powerful, and kept the manuscript moving when I might have otherwise stalled. For anyone who has spent years accumulating wisdom but struggled to get it onto the page, AI offers a remarkable new path. The knowledge was always there. The AI just helped me find the door.",
    ],
  },
  {
    slug: 'four-leadership-lessons-from-the-beatles-for-stronger-teams',
    title: 'Four Leadership Lessons from The Beatles for Stronger Teams',
    excerpt:
      "Some teams just work. The chemistry is undeniable, the vision is clear, and the results? Legendary. The Beatles didn't just make music — they mastered leadership, collaboration, and reinvention. Their journey offers timeless lessons for business leaders, entrepreneurs, and teams striving for excellence.",
    href: '/blog/four-leadership-lessons-from-the-beatles-for-stronger-teams',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_784d71f41b9a4f519d0e5dc937bcbdcc~mv2.jpg',
    content: [
      "Some teams just work. The chemistry is undeniable, the vision is clear, and the results? Legendary. The Beatles didn't just make music — they mastered leadership, collaboration, and reinvention. Their journey offers timeless lessons for business leaders, entrepreneurs, and teams striving for excellence.",
      "Lesson 1 — Get the Right People on the Bus: The Beatles' chemistry wasn't accidental. John Lennon's raw edge balanced Paul McCartney's melodic instincts. George Harrison's introspective depth complemented Ringo Starr's steady, unshakable rhythm. Each member brought something irreplaceable. As a leader, your first job isn't strategy — it's selection. Put the right people in the right seats, and the journey becomes transformative.",
      "Lesson 2 — Create a Catalytic Vision: The Beatles didn't just want to be a successful band. They wanted to change music forever — and they did. A catalytic vision doesn't just inspire; it demands action. It pulls people forward. When your team understands not just what you're building but why it matters, ordinary effort becomes extraordinary commitment.",
      "Lesson 3 — Build Esprit de Corps: Beyond talent and vision, The Beatles had an undeniable team spirit. \"Esprit de corps\" refers to the shared sense of unity, pride, and loyalty within a team. The Beatles embodied this by collaborating, challenging each other, and creating a culture of creativity and trust. Even through conflicts, their shared mission kept them innovating. Leaders who cultivate this spirit build teams that are resilient, creative, and deeply committed.",
      "Lesson 4 — Embrace the Magical Mystery: The Beatles had a unique chemistry — something beyond talent and hard work. Their ability to feed off each other's creativity, embrace uncertainty, and push boundaries led to innovations that shaped modern music. Great teams create space for spontaneity and serendipity. Encouraging openness, trust, and a willingness to experiment can lead to breakthroughs that wouldn't happen in a more controlled environment. That's the magical mystery of great leadership — and it's available to every team willing to embrace it.",
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getRecentPosts(excludeSlug: string, count = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== excludeSlug).slice(0, count)
}

export const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Leadership Lessons', 'Friday Fun Day']
