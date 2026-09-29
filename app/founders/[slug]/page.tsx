import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { getFounder, getFounders } from '@/lib/sanity'

export async function generateStaticParams() { return (await getFounders()).filter(({ slug }) => slug).map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const founder = await getFounder((await params).slug)
  if (!founder) return {}
  return { title: founder.seo?.title || founder.name, description: founder.seo?.description || founder.bio, robots: founder.seo?.noIndex ? 'noindex' : undefined }
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const founder = await getFounder((await params).slug)
  if (!founder) notFound()
  return <main className="mx-auto max-w-[1440px] px-5 pb-24 pt-40 md:px-10"><a href="/founders" className="text-[10px] uppercase tracking-[.2em] text-muted-foreground">← All founders</a><div className="mt-12 grid gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-20 md:items-end">{founder.imageUrl && <img src={founder.imageUrl} alt={`Portrait of ${founder.name}`} className="aspect-[4/5] w-full object-cover" />}<div><p className="text-[10px] uppercase tracking-[.25em] text-muted-foreground">{founder.role}</p><h1 className="mt-5 font-serif text-7xl leading-[.88] tracking-[-.07em] md:text-[9rem]">{founder.name}</h1><p className="mt-10 max-w-xl text-lg leading-8 text-muted-foreground">{founder.bio}</p>{founder.imdb && <a href={founder.imdb} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 border-b border-foreground pb-2 text-[10px] uppercase tracking-[.2em]">View on IMDb <ArrowUpRight size={13} /></a>}</div></div></main>
}
