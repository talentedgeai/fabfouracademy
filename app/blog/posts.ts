export type BlogCategory = 'Leadership Lessons' | 'Friday Fun Day'

export type BlogPost = {
  title: string
  excerpt: string
  href: string
  category: BlogCategory
  imageUrl: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'The Magic of the Fifth Beatle',
    excerpt:
      "The Beatles didn't just become the greatest band in history because of their talent alone — they had a secret ingredient: collaboration. From George Martin's production genius to George Harrison's willingness to bring Eric Clapton in to elevate a song, the Beatles exemplified the power of complementary collaboration. In today's world, this principle isn't just a musical phenomenon; it's a leadership strategy that can unlock extraordinary results for any team.",
    href: 'https://www.fabfouracademy.com/post/the-magic-of-the-fifth-beatle',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_7b0d16af57664eeeabb7180c6a87d2ae~mv2.png',
  },
  {
    title: "The Hamburg Method: Leadership Lessons from the Beatles' Hardest Days",
    excerpt:
      "Before they were legends, they were just four guys grinding it out in Hamburg — eight hours a night, seven days a week. Those gigs didn't just toughen them up; they transformed them. In this post, we break down how the Beatles' most intense season became a blueprint for accelerated growth — and how you can create that kind of breakthrough environment for your team.",
    href: 'https://www.fabfouracademy.com/post/the-hamburg-method-leadership-lessons-from-the-beatles-hardest-days',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_61a213e8318e4b9291a569524652c146~mv2.png',
  },
  {
    title: 'What George Harrison Can Teach Us About Team Disengagement',
    excerpt:
      "Even the greatest teams can fall apart. Just ask The Beatles. Their final years weren't defined by a lack of talent — but by a growing disconnect between members. If it could happen to them, it can happen to any team. Here's what to watch for — and what to do next.",
    href: 'https://www.fabfouracademy.com/post/what-george-harrison-can-teach-us-about-team-disengagement',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_9b44143811ea4c5ebf39aeb9974ecf31~mv2.png',
  },
  {
    title: "Before the Applause: Finding Purpose in the Hard Day's Nights",
    excerpt:
      "When the Beatles coined the phrase \"a hard day's night\" for their hit song and film, they weren't just creating a clever play on words — they were describing the reality of their journey to success. Before Beatlemania swept the world, the group endured grueling performances in Hamburg, playing up to eight hours a night, seven days a week, often to indifferent audiences.",
    href: 'https://www.fabfouracademy.com/post/a-hard-day-s-night',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_9ba5fd023ac64c7fa4d53e1a43504f3c~mv2.png',
  },
  {
    title: 'Building Success: Lessons from a Construction Leader on Leadership & Teamwork',
    excerpt:
      "A great construction leader doesn't just build projects. We build teams, culture, and a legacy that stands the test of time. Throughout my 32 years leading Absher Construction Company, I've developed leadership principles that have helped our company thrive for over three generations.",
    href: 'https://www.fabfouracademy.com/post/building-success-lessons-from-a-construction-leader-on-leadership-teamwork',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_44c559d8042e4fdaae60db3140e50436~mv2.jpg',
  },
  {
    title: 'The Fab Four Vision: It Was Catalytic',
    excerpt:
      "When studying enduring success, I've discovered that greatness requires more than just a compelling direction — it demands what I call The Fab Four Vision. This transformative approach to leadership isn't merely inspirational; it's catalytic, driving action through an unstoppable momentum that turns potential into purpose.",
    href: 'https://www.fabfouracademy.com/post/fab-four-vision',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/f31d04_e0dca8b0520246b7bf0958c4fa93c04f~mv2.jpg',
  },
  {
    title: 'How AI Helped Me Write "Fab Four Pillars of Impact"',
    excerpt:
      'When I first considered writing a book about The Beatles and their blueprint for excellence, I faced a familiar author\'s dilemma: how to efficiently transform decades of knowledge, research, and passion into a cohesive manuscript. Then I discovered the potential of AI as a writing partner, and it transformed my approach to "Fab Four Pillars of Impact."',
    href: 'https://www.fabfouracademy.com/post/writing-fab-four-pillars-of-impact-using-ai',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_ccbc522cbdd94b13870ab28c52357229~mv2.webp',
  },
  {
    title: 'Four Leadership Lessons from The Beatles for Stronger Teams',
    excerpt:
      "Some teams just work. The chemistry is undeniable, the vision is clear, and the results? Legendary. The Beatles didn't just make music — they mastered leadership, collaboration, and reinvention. Their journey offers timeless lessons for business leaders, entrepreneurs, and teams striving for excellence.",
    href: 'https://www.fabfouracademy.com/post/four-leadership-lessons-from-the-beatles-for-stronger-teams',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/3eaf1d_784d71f41b9a4f519d0e5dc937bcbdcc~mv2.jpg',
  },
]

export const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Leadership Lessons', 'Friday Fun Day']
