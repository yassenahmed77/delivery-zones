'use client'

import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function ConfirmationScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-200/80 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-400" />

          {/* Success Icon */}
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
            <CheckCircle2
              className="w-10 h-10 text-emerald-600"
              strokeWidth={2}
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
            تم إرسال إجاباتك بنجاح، شكرًا لوقتك.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            تم استلام كافة مناطق التغطية وأسعار ومدة التوصيل المحددة، وسيتم تطبيقها مباشرة في نظام تشغيل التوصيل الخاص بمطعمكم.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 mb-6">
            يمكنك إغلاق هذه الصفحة الآن أو مراجعة إدارة العمليات في حال رغبتكم في تعديل أي نطاق مستقبلاً.
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>بدء مراجعة جديدة</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
