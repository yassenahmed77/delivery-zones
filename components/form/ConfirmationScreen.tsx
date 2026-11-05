'use client'

import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationScreen() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-l from-emerald-500 to-teal-400" />
          <div className="px-8 py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                <CheckCircle2
                  className="w-8 h-8 text-emerald-500"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              تم إرسال إجاباتك بنجاح
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              شكرًا لوقتك. تم حفظ إجاباتك وسيتم مراجعتها من قِبل الفريق
              المختص.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

