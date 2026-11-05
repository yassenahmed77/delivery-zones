import { createClient } from '@/lib/supabase/server'
import StoreFormContainer from '@/components/form/StoreFormContainer'
import { AlertCircle, Store as StoreIcon } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('name')
    .eq('slug', decodedSlug)
    .single()

  return {
    title: store ? `مراجعة مناطق التوصيل | ${store.name}` : 'مراجعة مناطق التوصيل',
    description: 'حدد مناطق التوصيل المتاحة وأسعار ومدة التوصيل',
  }
}

export default async function StoreFormPage({ params }: PageProps) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const supabase = await createClient()

  const { data: store, error } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', decodedSlug)
    .single()

  if (error || !store) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200/80 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-5 border border-rose-100">
            <AlertCircle className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-xl font-black text-slate-900 mb-2">
            الرابط غير صالح أو تم حذفه
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            لم نتمكن من العثور على متجر مرتبط بهذا الرابط. برجاء التأكد من صحة الرابط المرسل إليك من قِبل إدارة التوصيل.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            <StoreIcon className="w-4 h-4" />
            <span>الانتقال للنموذج العام</span>
          </Link>
        </div>
      </div>
    )
  }

  return <StoreFormContainer store={store} />
}
