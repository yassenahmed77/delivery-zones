import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantName, answers, missingAreaNote, storeId, storeSlug } = body

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Insert the submission
    const { data: inserted, error: insertError } = await supabase
      .from('submissions')
      .insert({
        store_id: storeId || null,
        store_slug: storeSlug || null,
        restaurant_name: restaurantName || null,
        answers: answers,
        missing_area_note: missingAreaNote || null,
      })
      .select('id')
      .single()

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'حدث خطأ أثناء حفظ البيانات' },
        { status: 500 }
      )
    }

    // 2. If bound to a store, update the store's status and submitted_at
    if (storeId) {
      await supabase
        .from('stores')
        .update({
          status: 'submitted',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', storeId)
    }

    return NextResponse.json({ success: true, submissionId: inserted?.id }, { status: 200 })
  } catch (err) {
    console.error('Submit API error:', err)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    )
  }
}
