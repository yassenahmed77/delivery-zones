'use client'

import { Store, ArrowLeft, CheckCircle2, Lock } from 'lucide-react'

interface WelcomeScreenProps {
  restaurantName: string
  onRestaurantNameChange: (name: string) => void
  onStart: () => void
  isStoreLocked?: boolean
  storePhone?: string | null
}

export default function WelcomeScreen({
  restaurantName,
  onRestaurantNameChange,
  onStart,
  isStoreLocked = false,
  storePhone,
}: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            بوابة شركاء المطاعم • مراجعة التغطية
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            مراجعة مناطق التوصيل
          </h1>
          <p className="mt-3 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            من فضلك راجع مناطق التوصيل الخاصة بالمطعم وحدد المناطق المتاحة وأسعار ومدة التوصيل لكل منطقة بدقة.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8">
          {/* Restaurant input field or verified badge */}
          {isStoreLocked ? (
            <div className="mb-6 p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-sky-600" />
                  رابط مخصص وموثق للمحل
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  معتمد
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 mt-1 flex items-center gap-2">
                <Store className="w-5 h-5 text-sky-600 shrink-0" />
                <span>{restaurantName}</span>
              </div>
              {storePhone && (
                <div className="text-xs text-slate-500 mt-1">
                  رقم التواصل المسجل: <span dir="ltr">{storePhone}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <label
                htmlFor="restaurant-name"
                className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-sky-600" />
                  اسم المطعم أو الفرع
                </span>
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  اختياري
                </span>
              </label>
              <div className="relative">
                <input
                  id="restaurant-name"
                  type="text"
                  value={restaurantName}
                  onChange={(e) => onRestaurantNameChange(e.target.value)}
                  placeholder="مثال: مطعم الشرق - فرع القاهرة"
                  className="w-full px-4 py-3.5 pr-11 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm transition-all shadow-sm"
                />
                <Store className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Instructions note */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-sky-900 text-xs leading-relaxed mb-6">
            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              سيتم عرض كل منطقة رئيسية على حدة. في حال عدم التوصيل لمنطقة رئيسية، سيتم تخطي كافة تفرعاتها تلقائياً لتوفير وقتك.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="w-full group bg-slate-900 hover:bg-sky-600 active:bg-sky-700 text-white font-bold py-4 px-6 rounded-2xl text-base transition-all duration-200 shadow-lg shadow-slate-900/10 hover:shadow-sky-500/25 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>حدد الآن</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
