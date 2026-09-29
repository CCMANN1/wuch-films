import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ArchiveIntro } from '@/components/archive-intro'
import { founders as fallbackFounders } from '@/lib/films'
import { getFounders, getHomepage, getFilms } from '@/lib/sanity'

export default async function Page() {
  const [home, cmsFounders, films] = await Promise.all([getHomepage(), getFounders(), getFilms()])
  const founders = cmsFounders.length ? cmsFounders : fallbackFounders
  const featured = home?.featuredFilm ?? films[0]

  return <main>
    <ArchiveIntro />
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">A note from the studio</p>
        <div><h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-.05em] md:text-6xl">{home?.title || 'A house for stories, memory, people, place and cinema.'}</h2><p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">{home?.intro || 'WUCH FILMS is an independent film house founded by Siddarth Koul and Ankit Wali.'}</p><Link href="/about" className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-2 text-[10px] uppercase tracking-[.2em]">About WUCH <ArrowUpRight size={13} /></Link></div>
      </div>
    </section>
    {featured && <section className="border-y border-border"><div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24"><p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">Featured film</p><article className="mt-16 border-t border-border pt-5"><div className="grid gap-8 md:grid-cols-[minmax(220px,320px)_1fr] md:items-end"><div className="overflow-hidden bg-muted">{featured.imageUrl && <img src={featured.imageUrl} alt={`${featured.title} poster`} className="aspect-[4/5] w-full object-cover" />}</div><div><p className="text-xs uppercase tracking-[.16em] text-muted-foreground">{featured.format || 'Film'}{featured.year ? ` · ${featured.year}` : ''}</p><h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[.9] tracking-[-.06em] md:text-8xl">{featured.title}</h2><p className="mt-7 max-w-md text-sm leading-6 text-muted-foreground">{featured.description || featured.logline}</p></div><div>{featured.slug && <Link href={`/films/${featured.slug}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em]">View film <ArrowUpRight size={13} /></Link>}{featured.imdbUrl && <a href={featured.imdbUrl} target="_blank" rel="noreferrer" className="ml-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em]">IMDb <ArrowUpRight size={13} /></a>}</div></div></article></div></section>}
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40"><div className="mb-12 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">The filmmakers</p><h2 className="mt-5 font-serif text-5xl tracking-[-.06em] md:text-7xl">Founders</h2></div><Link href="/founders" className="hidden text-[10px] uppercase tracking-[.2em] md:block">Meet them ↗</Link></div><div className="grid gap-10 md:grid-cols-2">{founders.map((person) => <Link key={person.slug} href={`/founders/${person.slug}`} className="group border-t border-border pt-5"><p className="text-[10px] uppercase tracking-[.2em] text-muted-foreground">{person.role}</p><h3 className="mt-8 font-serif text-5xl tracking-[-.06em] transition group-hover:translate-x-2 md:text-7xl">{person.name}</h3><span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em]">Meet <ArrowUpRight size={14} /></span></Link>)}</div></section>
  </main>
}
