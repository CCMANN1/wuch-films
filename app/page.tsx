'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ArchiveIntro } from '@/components/archive-intro'
import { founders } from '@/lib/films'

export default function Page() {
  return (
    <main className="relative isolate overflow-hidden bg-background text-foreground">
      <div className="relative z-10">
      <ArchiveIntro />
      <section className="cinema-section cinema-section--note relative isolate mx-auto max-w-[1440px] overflow-hidden border-t border-border/40 px-5 py-24 md:px-10 md:py-40">
        <div className="relative z-10 max-w-5xl">
          <p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">A note from the studio</p>
          <div className="mt-10 max-w-4xl"><h2 className="font-serif text-4xl leading-tight tracking-[-.05em] md:text-6xl">A house for stories, memory, people, place and cinema.</h2><p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">WUCH FILMS is an independent film house founded by Siddarth Koul and Ankit Wali.</p><Link href="/about" className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-2 text-[10px] uppercase tracking-[.2em]">About WUCH <ArrowUpRight size={13} /></Link></div>
        </div>
      </section>
      <section className="cinema-section cinema-section--founders relative isolate mx-auto max-w-[1440px] overflow-hidden border-t border-border/40 px-5 py-24 md:px-10 md:py-40"><div className="cinema-section__grid" aria-hidden="true" /><div className="relative z-10"><div className="mb-12 grid gap-8 md:grid-cols-[1fr_220px] md:items-end"><div><p className="text-[10px] uppercase tracking-[.3em] text-muted-foreground">The filmmakers</p><h2 className="mt-5 font-serif text-5xl tracking-[-.06em] md:text-7xl">Founders</h2></div><Link href="/founders" className="hidden text-[10px] uppercase tracking-[.2em] md:block">Meet them ↗</Link></div><div className="grid gap-10 md:grid-cols-2">{founders.map((person) => <Link key={person.slug} href={`/founders/${person.slug}`} className="group border-t border-border pt-5"><p className="text-[10px] uppercase tracking-[.2em] text-muted-foreground">{person.role}</p><h3 className="mt-8 font-serif text-5xl tracking-[-.06em] transition group-hover:translate-x-2 md:text-7xl">{person.name}</h3><span className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.2em]">Meet <ArrowUpRight size={14} /></span></Link>)}</div></div></section>
      </div>
    </main>
  )
}
