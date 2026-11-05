import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantName, answers, missingAreaNote } = body

    if (!restaurantName || !restaurantName.trim()) {
      return NextResponse.json({ error: 'اسم المطعم إجباري' }, { status: 400 })
    }

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: inserted, error: insertError } = await supabase
      .from('submissions')
      .insert({
        restaurant_name: restaurantName.trim(),
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

    return NextResponse.json({ success: true, submissionId: inserted?.id }, { status: 200 })
  } catch (err) {
    console.error('Submit API error:', err)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    )
  }
}
