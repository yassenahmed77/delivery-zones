'use client'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="mb-6">
      {/* Labels */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">
          منطقة {current} من {total}
        </span>
        <span className="text-xs font-semibold text-sky-600">{percentage}%</span>
      </div>

      {/* Track */}
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-sky-500 to-cyan-400 rounded-full"
          style={{ width: `${percentage}%`, transition: 'width 0.4s ease' }}
        />
      </div>
    </div>
  )
}

