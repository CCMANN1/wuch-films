export type Film = {
  slug: string
  title: string
  year: string
  format: string
  runtime: string
  director: string
  logline: string
  description: string
  image: string
  status?: string
}

export const films: Film[] = []

export const getFilm = (slug: string) => films.find((film) => film.slug === slug)

export const journal: Array<{ slug: string; category: string; title: string; date: string; excerpt: string }> = []

export const founders = [
  {
    slug: 'ankit-wali',
    name: 'Ankit Wali',
    role: 'Writer / Director / Creative',
    bio: 'Ankit Wali is a writer, director and creative professional whose work spans theatre, dialect coaching and screen projects. He has worked in assistant directing and dialect coaching, and co-directed and co-wrote Batt Koch with Siddarth Koul.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85',
    imdb: 'https://www.imdb.com/find/?q=Ankit%20Wali',
  },
  {
    slug: 'siddarth-koul',
    name: 'Siddarth Koul',
    role: 'Filmmaker / Director / Writer / Actor',
    bio: 'Siddarth Koul is a filmmaker, writer and actor. He is known for Batt Koch (2025), and has credits across directing, writing, editorial and assistant-directing departments on screen projects.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Siddarth-Koul-BqWJFwRvhXpWmF4JoYObniUthvjEKM.webp',
    imdb: 'https://www.imdb.com/find/?q=Siddarth%20Koul',
  },
]

export const nav = [
  { href: '/films', label: 'Films' },
  { href: '/founders', label: 'Founders' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
]
