'use client'

import { useState } from 'react'
import { Store, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

interface WelcomeScreenProps {
  restaurantName: string
  onRestaurantNameChange: (name: string) => void
  onStart: () => void
}

export default function WelcomeScreen({
  restaurantName,
  onRestaurantNameChange,
  onStart,
}: WelcomeScreenProps) {
  const [touched, setTouched] = useState(false)
  const isNameEmpty = !restaurantName.trim()

  const handleStartClick = () => {
    setTouched(true)
    if (isNameEmpty) {
      return
    }
    onStart()
  }

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
            من فضلك أدخل اسم مطعمك وراجع مناطق التوصيل وحدد المناطق المتاحة وأسعار ومدة التوصيل بدقة.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8">
          {/* Restaurant input field (MANDATORY) */}
          <div className="mb-6">
            <label
              htmlFor="restaurant-name"
              className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-sky-600" />
                اسم المطعم أو الفرع
                <span className="text-rose-500">*</span>
              </span>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                إجباري
              </span>
            </label>
            <div className="relative">
              <input
                id="restaurant-name"
                type="text"
                required
                value={restaurantName}
                onChange={(e) => {
                  onRestaurantNameChange(e.target.value)
                  if (touched) setTouched(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartClick()
                }}
                placeholder="اكتب اسم المطعم هنا (مثال: مطعم الدهان - فرع التجمع)..."
                className={`w-full px-4 py-3.5 pr-11 rounded-2xl border text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 text-sm transition-all shadow-sm ${
                  touched && isNameEmpty
                    ? 'border-rose-400 bg-rose-50/40 focus:ring-rose-400'
                    : 'border-slate-200 bg-slate-50/50 focus:ring-sky-500'
                }`}
              />
              <Store className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {touched && isNameEmpty && (
              <p className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5" />
                يرجى كتابة اسم المطعم للمتابعة
              </p>
            )}
          </div>

          {/* Instructions note */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-sky-900 text-xs leading-relaxed mb-6">
            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p>
              سيتم عرض كل منطقة رئيسية على حدة. في حال عدم التوصيل لمنطقة، اضغط &quot;لا&quot; وسيتم تخطي كافة أحيائها تلقائياً لتوفير وقتك.
            </p>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={handleStartClick}
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
