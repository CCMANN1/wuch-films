import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getFilm, getFilms } from '@/lib/sanity'

export async function generateStaticParams() {
  const films = await getFilms()
  return films.filter((film) => film.slug).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const film = await getFilm((await params).slug)
  if (!film) return {}
  return { title: film.seo?.title || film.title, description: film.seo?.description || film.logline, robots: film.seo?.noIndex ? 'noindex' : undefined, openGraph: film.seo?.imageUrl ? { images: [film.seo.imageUrl] } : undefined }
}

export default async function FilmPage({ params }: { params: Promise<{ slug: string }> }) {
  const film = await getFilm((await params).slug)
  if (!film) notFound()
  return <main className="pt-32"><div className="mx-auto max-w-[1440px] px-5 md:px-10"><Link href="/films" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-muted-foreground"><ArrowLeft size={14} /> All films</Link><div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-end"><div><p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">{film.format} / {film.year}</p><h1 className="mt-5 font-serif text-7xl leading-[.88] tracking-[-.07em] md:text-[9rem]">{film.title}</h1><p className="mt-10 max-w-md text-lg leading-7 text-muted-foreground">{film.logline}</p></div>{film.imageUrl && <img src={film.imageUrl} alt={`Still from ${film.title}`} className="aspect-[4/3] w-full object-cover" />}</div><div className="grid gap-8 border-t border-border py-16 md:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[.25em] text-muted-foreground">Credits</p><p className="mt-5 text-sm">Directed by {film.director}<br />{film.runtime}</p>{film.imdbUrl && <a href={film.imdbUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex text-[10px] uppercase tracking-[.2em]">View on IMDb ↗</a>}</div><p className="max-w-md text-xl leading-8">{film.description}</p></div></div></main>
}
