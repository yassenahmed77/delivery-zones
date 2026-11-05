import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch all submissions server-side
  const { data: submissions } = await supabase
    .from('submissions')
    .select('id, restaurant_name, submitted_at, created_at, missing_area_note')
    .order('created_at', { ascending: false })

  return (
    <AdminDashboardClient
      initialSubmissions={submissions || []}
      userEmail={user.email || ''}
    />
  )
}
