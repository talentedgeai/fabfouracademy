export type BlogCategory = 'Leadership Lessons' | 'Friday Fun Day'

export type BlogPost = {
  title: string
  excerpt: string
  href: string
  category: BlogCategory
  imageUrl: string
}

export const BLOG_POSTS: BlogPost[] = [
  // ── New posts ──────────────────────────────────────────
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
  // ── Existing posts ──────────────────────────────────────
  {
    title: 'Eleanor Rigby Story: Serendipity at St. Peter\'s Church',
    excerpt:
      'The Eleanor Rigby story begins with one of the most haunting songs in music history. Released in 1966 on Revolver, the track tells of a lonely woman who "died in the church and was buried along with her name." What makes this story extraordinary is what lies in the cemetery at St. Peter\'s Church near Liverpool — the very place where John and Paul first met on July 6, 1957.',
    href: 'https://www.fabfouracademy.com/post/eleanor-rigby-story-serendipity-beatles',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Beatles Breakup: Who Was Really Responsible?',
    excerpt:
      'The Beatles breakup remains one of music history\'s most debated topics. For decades, fans pointed fingers at Yoko Ono, painting her as the villain who destroyed the world\'s greatest band. But the truth is far more nuanced — the breakup wasn\'t caused by an outsider. It was the result of four talented individuals growing apart, each contributing to the fracture in their own way.',
    href: 'https://www.fabfouracademy.com/post/beatles-breakup',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Paul McCartney Days We Left Behind: Aging Gracefully Review',
    excerpt:
      'Paul McCartney\'s Days We Left Behind arrived March 26, 2026, and it might be his most emotionally honest release in years. After six years without new solo material, the 83-year-old legend delivers a song that doesn\'t just embrace nostalgia — it embraces the voice of an older man who has stopped fighting time.',
    href: 'https://www.fabfouracademy.com/post/paul-mccartney-days-we-left-behind-review',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Beatles Legacy Songs: 10 Tracks Spanning Five Decades',
    excerpt:
      'This Friday Fun Day celebrates Beatles legacy songs that trace their remarkable journey from the Summer of Love through their final collaboration. These tracks reveal how the Fab Four maintained their connection even after the breakup, creating new music that honored shared history and fallen bandmates.',
    href: 'https://www.fabfouracademy.com/post/beatles-legacy-songs-organizational-continuity',
    category: 'Friday Fun Day',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Ringo Starr Drumming: 9 Songs That Prove His Genius',
    excerpt:
      'Was Ringo a great drummer? These nine tracks showcase Ringo Starr drumming at its finest, proving why he wasn\'t just good — he was essential to the Beatles\' sound. Starting with "Rain" (1966), the B-side that Ringo himself calls his best work, this post makes the definitive case for one of rock\'s most underrated musicians.',
    href: 'https://www.fabfouracademy.com/post/ringo-starr-drumming-nine-essential-songs',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'The Beatles Imaginary Album: 24 Songs That Could Have Been',
    excerpt:
      'What if the Beatles had stayed together for one more album? This Beatles imaginary album explores that tantalising possibility. In early 1970, John, Paul, George, and Ringo were crafting some of their most powerful solo work. Dive into a reimagined double album — each track a real song written during that pivotal period.',
    href: 'https://www.fabfouracademy.com/post/beatles-imaginary-album-songs-1970-1971',
    category: 'Friday Fun Day',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Beatles Leadership Lessons: Celebrating Real Success',
    excerpt:
      'This week brought exciting news for Fab Four Academy: The Fab Four Pillars of Impact appeared on Amazon\'s Best Seller list and in Hot New Releases across multiple categories. The post reflects on the milestone and shares what celebrating real success looks like — through the lens of The Beatles.',
    href: 'https://www.fabfouracademy.com/post/beatles-leadership-lessons-celebrating-success',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: 'Beatles Letter Songs: 10 Postal Messages From The Fab Four',
    excerpt:
      'Throughout their career together and apart, the Beatles showed a surprising fascination with letters and postal communication. From Motown covers to heartfelt solo tributes, these 10 songs celebrate the timeless art of putting pen to paper and trusting the postman to deliver your message.',
    href: 'https://www.fabfouracademy.com/post/beatles-letter-songs-postal-messages',
    category: 'Friday Fun Day',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
  {
    title: '10 Beatles Breakup Lessons from Their Most Painful Songs',
    excerpt:
      'The greatest team in music history left us a roadmap to their own undoing. Long before the official 1970 announcement, the Beatles embedded breakup warnings throughout their music. From John\'s cry for help in 1965 to the band\'s desperate plea to get back to basics in 1969, these songs reveal warning signs every team faces.',
    href: 'https://www.fabfouracademy.com/post/beatles-breakup-lessons-derailment-songs',
    category: 'Leadership Lessons',
    imageUrl: 'https://static.wixstatic.com/media/39abad_0a88f1c2634e42daac4539700074733a~mv2.png',
  },
]

export const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Leadership Lessons', 'Friday Fun Day']
