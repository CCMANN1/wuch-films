import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminEditor from './editor'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.app_metadata?.role !== 'admin') redirect('/auth/login?next=/admin')
  const [{ data: content }, { data: films }, { data: messages }] = await Promise.all([
    supabase.from('site_content').select('*').order('key'),
    supabase.from('films').select('*').order('sort_order'),
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(30),
  ])
  return <AdminEditor initialContent={content ?? []} initialFilms={films ?? []} messages={messages ?? []} />
}
