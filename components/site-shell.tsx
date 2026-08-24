'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav } from '@/lib/films'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <div className="min-h-screen bg-background text-foreground">
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? 'border-b border-border/70 bg-background/90 backdrop-blur-md' : ''}`}>
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" className="font-serif text-xl tracking-[-.04em]" onClick={() => setOpen(false)}>WUCH <span className="font-sans text-[10px] font-medium tracking-[.3em]">FILMS</span></Link>
        <nav className="hidden items-center gap-8 md:flex">{nav.map((item) => <Link key={item.href} href={item.href} className="text-[11px] uppercase tracking-[.2em] text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}<Link href="/archive" className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-accent">Archive <ArrowUpRight size={13} /></Link></nav>
        <button className="p-1 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-border bg-background px-5 pb-8 pt-6 md:hidden"><nav className="flex flex-col gap-5">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="font-serif text-3xl">{item.label}</Link>)}<Link href="/archive" onClick={() => setOpen(false)} className="text-xs uppercase tracking-[.2em] text-accent">Archive ↗</Link></nav></div>}
    </header>
    {children}
    <footer className="border-t border-border px-5 py-8 md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="font-serif text-2xl tracking-[-.04em]">WUCH FILMS</p><p className="mt-2 text-xs text-muted-foreground">Independent moving image.</p></div><div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[.18em] text-muted-foreground"><a href="mailto:hello@wuchfilms.com" className="transition-colors hover:text-foreground">Email</a><a href="https://www.facebook.com/share/17eDNTP5cG/" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Facebook</a><a href="https://www.instagram.com/wuchfilms?igsh=cmVzeWEwYmUzZW12" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Instagram</a><a href="https://x.com/WuchFilms" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">X</a><a href="https://youtube.com/@wuchfilms?si=pbhAPn2UdR1-zw6o" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">YouTube</a><a href="https://www.linkedin.com/in/wuch-films" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">LinkedIn</a><span>© {new Date().getFullYear()}</span></div></div></footer>
  </div>
}

export function FilmImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) { return <div className={`relative overflow-hidden bg-muted ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 70vw" className={`object-cover transition-transform duration-700 hover:scale-[1.03] ${className.includes('poster-fit') ? 'object-contain' : ''}`} /></div> }

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`animate-reveal ${className}`}>{children}</div> }
JSON
