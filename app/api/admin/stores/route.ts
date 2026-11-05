import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Helper to generate a clean URL slug from name or unique random chars
function generateSlug(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const randomSuffix = Math.random().toString(36).substring(2, 6)
  return base ? `${base}-${randomSuffix}` : `store-${Date.now()}`
}

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch stores along with their submissions
  const { data: stores, error } = await supabase
    .from('stores')
    .select('*, submissions(id, created_at)')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const formattedStores = (stores || []).map((store) => ({
    id: store.id,
    name: store.name,
    slug: store.slug,
    phone: store.phone,
    notes: store.notes,
    status: store.status,
    created_at: store.created_at,
    submitted_at: store.submitted_at,
    submissions_count: store.submissions?.length || 0,
    latest_submission_id: store.submissions?.[0]?.id || null,
  }))

  return NextResponse.json({ stores: formattedStores })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { name, phone, notes } = await request.json()

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'اسم المحل مطلوب' }, { status: 400 })
    }

    const slug = generateSlug(name)

    const { data: newStore, error } = await supabase
      .from('stores')
      .insert({
        name: name.trim(),
        slug: slug,
        phone: phone?.trim() || null,
        notes: notes?.trim() || null,
        status: 'pending',
      })
      .select('*')
      .single()

    if (error) {
      console.error('Create store error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ store: newStore }, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error creating store' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get('id')

  if (!storeId) {
    return NextResponse.json({ error: 'Missing store ID' }, { status: 400 })
  }

  const { error } = await supabase.from('stores').delete().eq('id', storeId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
