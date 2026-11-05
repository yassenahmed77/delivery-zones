import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { MainAreaAnswer, SubareaAnswer } from '@/lib/types'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const submissionId = searchParams.get('id')

  if (!submissionId) {
    return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', submissionId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Build CSV
  const BOM = '\uFEFF' // UTF-8 BOM for Excel Arabic support
  const headers = [
    'المحافظة',
    'المنطقة الرئيسية',
    'متاح للتوصيل (عام)',
    'المنطقة الفرعية',
    'متاح للتوصيل',
    'سعر التوصيل (جنيه)',
    'وقت الوصول (دقيقة)',
  ]

  const rows: string[][] = []
  const answers: MainAreaAnswer[] = data.answers || []

  for (const area of answers) {
    if (area.generalDeliveryAvailable === false) {
      rows.push([
        area.governorateNameAr,
        area.mainAreaNameAr,
        'لا',
        '-',
        '-',
        '-',
        '-',
      ])
    } else if (area.generalDeliveryAvailable === true) {
      for (const sa of area.subareas) {
        rows.push([
          area.governorateNameAr,
          area.mainAreaNameAr,
          'نعم',
          sa.subareaNameAr,
          sa.deliveryAvailable === true ? 'نعم' : sa.deliveryAvailable === false ? 'لا' : 'غير محدد',
          sa.deliveryAvailable === true && sa.deliveryFee !== undefined
            ? String(sa.deliveryFee)
            : '-',
          sa.deliveryAvailable === true && sa.estimatedTime !== undefined
            ? String(sa.estimatedTime)
            : '-',
        ])
      }
    } else {
      rows.push([
        area.governorateNameAr,
        area.mainAreaNameAr,
        'غير محدد',
        '-',
        '-',
        '-',
        '-',
      ])
    }
  }

  const escape = (val: string) =>
    `"${val.replace(/"/g, '""')}"`

  const csvContent =
    BOM +
    [headers, ...rows]
      .map((row) => row.map(escape).join(','))
      .join('\r\n')

  const filename = `delivery-zones-${data.restaurant_name || submissionId}-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}

