'use client'

import { MapPin } from 'lucide-react'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-3 z-30 mb-6 p-4 rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-slate-800">
            المنطقة {current} من {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
            {percentage}% مكتمل
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
        <div
          className="h-full bg-gradient-to-l from-sky-500 via-cyan-400 to-sky-600 rounded-full transition-all duration-300 ease-out shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
