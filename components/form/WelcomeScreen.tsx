'use client'

import { MapPin, ClipboardList } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top accent strip */}
          <div className="h-1.5 bg-gradient-to-l from-sky-500 to-cyan-400" />

          <div className="px-8 pt-10 pb-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center border border-sky-100">
                <MapPin className="w-8 h-8 text-sky-500" strokeWidth={1.5} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-900 text-center leading-snug mb-3">
              مراجعة مناطق التوصيل
            </h1>

            {/* Subtitle */}
            <p className="text-slate-500 text-center leading-relaxed text-sm mb-8">
              من فضلك راجع مناطق التوصيل الخاصة بالمطعم وحدد المناطق المتاحة
              وأسعار ومدة التوصيل لكل منطقة.
            </p>

            {/* Divider */}
            <div className="border-t border-slate-100 mb-6" />

            {/* Restaurant name input */}
            <div className="mb-6">
              <label
                htmlFor="restaurant-name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                اسم المطعم
                <span className="text-slate-400 font-normal mr-1">(اختياري)</span>
              </label>
              <input
                id="restaurant-name"
                type="text"
                value={restaurantName}
                onChange={(e) => onRestaurantNameChange(e.target.value)}
                placeholder="أدخل اسم مطعمك هنا..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Info pills */}
            <div className="bg-sky-50 rounded-xl px-5 py-4 mb-7 border border-sky-100">
              <div className="flex items-start gap-3">
                <ClipboardList className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="text-sky-700 text-xs leading-relaxed">
                  ستظهر لك كل منطقة على حدة. بإمكانك التنقل بين المناطق بحرية
                  ومراجعة إجاباتك قبل الإرسال.
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onStart}
              className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold py-3.5 px-6 rounded-xl text-base transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              ابدأ المراجعة
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-xs mt-6">
          جميع المعلومات المُدخلة تُستخدم لتحسين خدمة التوصيل فقط
        </p>
      </div>
    </div>
  )
}

