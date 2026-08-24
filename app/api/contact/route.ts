import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    if (!name || name.length > 120 || !/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !message || message.length > 5000) return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 })
    const supabase = await createClient()
    const { error } = await supabase.from('contact_submissions').insert({ name, email, message })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to send your enquiry right now.' }, { status: 500 })
  }
}
