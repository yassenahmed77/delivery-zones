import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { MainAreaAnswer } from '@/lib/types'

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
  const storeId = searchParams.get('store_id')

  if (!submissionId && !storeId) {
    return NextResponse.json({ error: 'Missing submission ID or store ID' }, { status: 400 })
  }

  let query = supabase.from('submissions').select('*')

  if (submissionId) {
    query = query.eq('id', submissionId)
  } else if (storeId) {
    query = query.eq('store_id', storeId).order('created_at', { ascending: false }).limit(1)
  }

  const { data, error } = await query.single()

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Build CSV with Excel UTF-8 BOM
  const BOM = '\uFEFF'
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

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`

  const csvContent =
    BOM +
    [headers, ...rows]
      .map((row) => row.map(escape).join(','))
      .join('\r\n')

  const safeName = (data.restaurant_name || data.store_slug || 'delivery-zones')
    .replace(/[^\w\u0600-\u06FF-]/g, '_')
  const filename = `${safeName}-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    },
  })
}
