import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { restaurantName, answers, missingAreaNote } = body

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('submissions').insert({
      restaurant_name: restaurantName || null,
      answers: answers,
      missing_area_note: missingAreaNote || null,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'حدث خطأ أثناء حفظ البيانات' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Submit API error:', err)
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    )
  }
}

