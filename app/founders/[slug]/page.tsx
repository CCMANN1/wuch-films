import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { founders } from '@/lib/films'
import { FilmImage } from '@/components/site-shell'

export function generateStaticParams() { return founders.map(({ slug }) => ({ slug })) }

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const founder = founders.find((person) => person.slug === slug)
  if (!founder) notFound()
  return <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-40 md:px-10"><a href="/founders" className="text-[10px] uppercase tracking-[.2em] text-muted-foreground">← All founders</a><div className="mt-12 grid gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-20 md:items-end"><FilmImage src={founder.image} alt={`Portrait of ${founder.name}`} className="aspect-[4/5]" /><div><p className="text-[10px] uppercase tracking-[.25em] text-muted-foreground">{founder.role}</p><h1 className="mt-5 font-serif text-7xl leading-[.88] tracking-[-.07em] md:text-[9rem]">{founder.name}</h1><p className="mt-10 max-w-xl text-lg leading-8 text-muted-foreground">{founder.bio}</p><a href={founder.imdb} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-2 text-[10px] uppercase tracking-[.2em]">View on IMDb <ArrowUpRight size={13} /></a></div></div></main>
}
