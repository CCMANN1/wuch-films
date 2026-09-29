import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getFounders } from '@/lib/sanity'
import { founders as fallbackFounders } from '@/lib/films'

export default async function FoundersPage() {
  const cmsFounders = await getFounders()
  const founders = cmsFounders.length ? cmsFounders : fallbackFounders
  return <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-40 md:px-10"><p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">People & practice</p><h1 className="mt-6 font-serif text-7xl tracking-[-.07em] md:text-[10rem]">The filmmakers</h1><div className="mt-20 grid gap-16">{founders.map((person) => <article key={person.slug} className="grid gap-8 border-t border-border pt-5 md:grid-cols-[.9fr_1.1fr] md:gap-16"><Link href={`/founders/${person.slug}`} className="group">{'imageUrl' in person && person.imageUrl && <img src={person.imageUrl} alt={`Portrait of ${person.name}`} className="aspect-[4/5] w-full object-cover" />}<div className="mt-5 flex items-center justify-between"><h2 className="font-serif text-4xl tracking-[-.05em] transition group-hover:translate-x-2">{person.name}</h2><ArrowUpRight /></div></Link><div className="flex flex-col justify-end pb-2"><p className="text-[10px] uppercase tracking-[.2em] text-muted-foreground">{person.role}</p><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{person.bio}</p>{person.imdb && <a href={person.imdb} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-foreground pb-2 text-[10px] uppercase tracking-[.2em]">View on IMDb <ArrowUpRight size={13} /></a>}</div></article>)}</div></main>
}
