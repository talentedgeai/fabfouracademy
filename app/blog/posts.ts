export type BlogCategory = 'Leadership Lessons' | 'Friday Fun Day'

export type BlogPost = {
  title: string
  excerpt: string
  href: string
  category: BlogCategory
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Eleanor Rigby Story: Serendipity at St. Peter\'s Church',
    excerpt:
      'The Eleanor Rigby story begins with one of the most haunting songs in music history. Released in 1966 on Revolver, the track tells of a lonely woman who "died in the church and was buried along with her name." What makes this story extraordinary is what lies in the cemetery at St. Peter\'s Church near Liverpool — the very place where John and Paul first met on July 6, 1957.',
    href: 'https://www.fabfouracademy.com/post/eleanor-rigby-story-serendipity-beatles',
    category: 'Leadership Lessons',
  },
  {
    title: 'Beatles Breakup: Who Was Really Responsible?',
    excerpt:
      'The Beatles breakup remains one of music history\'s most debated topics. For decades, fans pointed fingers at Yoko Ono, painting her as the villain who destroyed the world\'s greatest band. But the truth is far more nuanced — the breakup wasn\'t caused by an outsider. It was the result of four talented individuals growing apart, each contributing to the fracture in their own way.',
    href: 'https://www.fabfouracademy.com/post/beatles-breakup',
    category: 'Leadership Lessons',
  },
  {
    title: 'Paul McCartney Days We Left Behind: Aging Gracefully Review',
    excerpt:
      'Paul McCartney\'s Days We Left Behind arrived March 26, 2026, and it might be his most emotionally honest release in years. After six years without new solo material, the 83-year-old legend delivers a song that doesn\'t just embrace nostalgia — it embraces the voice of an older man who has stopped fighting time.',
    href: 'https://www.fabfouracademy.com/post/paul-mccartney-days-we-left-behind-review',
    category: 'Leadership Lessons',
  },
  {
    title: 'Beatles Legacy Songs: 10 Tracks Spanning Five Decades',
    excerpt:
      'This Friday Fun Day celebrates Beatles legacy songs that trace their remarkable journey from the Summer of Love through their final collaboration. These tracks reveal how the Fab Four maintained their connection even after the breakup, creating new music that honored shared history and fallen bandmates.',
    href: 'https://www.fabfouracademy.com/post/beatles-legacy-songs-organizational-continuity',
    category: 'Friday Fun Day',
  },
  {
    title: 'Ringo Starr Drumming: 9 Songs That Prove His Genius',
    excerpt:
      'Was Ringo a great drummer? These nine tracks showcase Ringo Starr drumming at its finest, proving why he wasn\'t just good — he was essential to the Beatles\' sound. Starting with "Rain" (1966), the B-side that Ringo himself calls his best work, this post makes the definitive case for one of rock\'s most underrated musicians.',
    href: 'https://www.fabfouracademy.com/post/ringo-starr-drumming-nine-essential-songs',
    category: 'Leadership Lessons',
  },
  {
    title: 'The Beatles Imaginary Album: 24 Songs That Could Have Been',
    excerpt:
      'What if the Beatles had stayed together for one more album? This Beatles imaginary album explores that tantalising possibility. In early 1970, John, Paul, George, and Ringo were crafting some of their most powerful solo work. Dive into a reimagined double album — each track a real song written during that pivotal period.',
    href: 'https://www.fabfouracademy.com/post/beatles-imaginary-album-songs-1970-1971',
    category: 'Friday Fun Day',
  },
  {
    title: 'Beatles Leadership Lessons: Celebrating Real Success',
    excerpt:
      'This week brought exciting news for Fab Four Academy: The Fab Four Pillars of Impact appeared on Amazon\'s Best Seller list and in Hot New Releases across multiple categories. The post reflects on the milestone and shares what celebrating real success looks like — through the lens of The Beatles.',
    href: 'https://www.fabfouracademy.com/post/beatles-leadership-lessons-celebrating-success',
    category: 'Leadership Lessons',
  },
  {
    title: 'Beatles Letter Songs: 10 Postal Messages From The Fab Four',
    excerpt:
      'Throughout their career together and apart, the Beatles showed a surprising fascination with letters and postal communication. From Motown covers to heartfelt solo tributes, these 10 songs celebrate the timeless art of putting pen to paper and trusting the postman to deliver your message.',
    href: 'https://www.fabfouracademy.com/post/beatles-letter-songs-postal-messages',
    category: 'Friday Fun Day',
  },
  {
    title: '10 Beatles Breakup Lessons from Their Most Painful Songs',
    excerpt:
      'The greatest team in music history left us a roadmap to their own undoing. Long before the official 1970 announcement, the Beatles embedded breakup warnings throughout their music. From John\'s cry for help in 1965 to the band\'s desperate plea to get back to basics in 1969, these songs reveal warning signs every team faces.',
    href: 'https://www.fabfouracademy.com/post/beatles-breakup-lessons-derailment-songs',
    category: 'Leadership Lessons',
  },
]

export const CATEGORIES: ('All' | BlogCategory)[] = ['All', 'Leadership Lessons', 'Friday Fun Day']
