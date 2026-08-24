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
  imdb?: string
}

export const films: Film[] = [
  {
    slug: 'batt-koch',
    title: 'Batt Koch',
    year: '2025',
    format: 'Feature film',
    runtime: '',
    director: 'Siddarth Koul & Ankit Wali',
    logline: 'A story carried by language, landscape and lived memory.',
    description: 'Batt Koch is a feature film by Siddarth Koul and Ankit Wali.',
    image: '/batt-koch-poster.jpg',
    status: 'Founders’ work',
    imdb: 'https://imdb.com/title/tt39277185/?ref_=ext_shr_lnk',
  },
]

export const getFilm = (slug: string) => films.find((film) => film.slug === slug)

export const journal: Array<{ slug: string; category: string; title: string; date: string; excerpt: string }> = []

export const founders = [
  {
    slug: 'ankit-wali',
    name: 'Ankit Wali',
    role: 'Writer / Director / Creative',
    bio: 'Ankit Wali is a writer, director and creative professional whose work spans theatre, dialect coaching and screen projects. He has worked in assistant directing and dialect coaching, and co-directed and co-wrote Batt Koch with Siddarth Koul.',
    image: '/ankit-wali.jpg',
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
