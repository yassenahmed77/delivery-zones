'use client'

import { useState, useEffect } from 'react'
import type { SubareaAnswer } from '@/lib/types'
import { Check, X, Clock, Banknote } from 'lucide-react'

interface SubareaInputProps {
  subarea: SubareaAnswer
  onUpdate: (
    deliveryAvailable: boolean,
    deliveryFee?: number,
    estimatedTime?: number
  ) => void
}

export default function SubareaInput({ subarea, onUpdate }: SubareaInputProps) {
  const [fee, setFee] = useState<string>(
    subarea.deliveryFee !== undefined ? String(subarea.deliveryFee) : ''
  )
  const [time, setTime] = useState<string>(
    subarea.estimatedTime !== undefined ? String(subarea.estimatedTime) : ''
  )

  // Sync when parent resets (e.g. navigating back)
  useEffect(() => {
    setFee(subarea.deliveryFee !== undefined ? String(subarea.deliveryFee) : '')
    setTime(subarea.estimatedTime !== undefined ? String(subarea.estimatedTime) : '')
  }, [subarea.subareaId])

  const handleAvailabilityChange = (available: boolean) => {
    if (available) {
      const feeNum = fee !== '' ? Number(fee) : undefined
      const timeNum = time !== '' ? Number(time) : undefined
      onUpdate(true, feeNum, timeNum)
    } else {
      onUpdate(false)
    }
  }

  const handleFeeChange = (val: string) => {
    setFee(val)
    if (subarea.deliveryAvailable === true) {
      const feeNum = val !== '' ? Number(val) : undefined
      const timeNum = time !== '' ? Number(time) : undefined
      onUpdate(true, feeNum, timeNum)
    }
  }

  const handleTimeChange = (val: string) => {
    setTime(val)
    if (subarea.deliveryAvailable === true) {
      const feeNum = fee !== '' ? Number(fee) : undefined
      const timeNum = val !== '' ? Number(val) : undefined
      onUpdate(true, feeNum, timeNum)
    }
  }

  const isAvailable = subarea.deliveryAvailable === true
  const isUnavailable = subarea.deliveryAvailable === false

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isAvailable
          ? 'border-emerald-200 bg-emerald-50/50'
          : isUnavailable
          ? 'border-slate-200 bg-slate-50/50'
          : 'border-slate-200 bg-white'
      }`}
    >
      {/* Subarea name + availability buttons */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-sm font-medium text-slate-800 flex-1 min-w-0">
          {subarea.subareaNameAr}
        </span>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => handleAvailabilityChange(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isAvailable
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            <Check className="w-3 h-3" strokeWidth={2.5} />
            نعم
          </button>
          <button
            onClick={() => handleAvailabilityChange(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isUnavailable
                ? 'border-red-400 bg-red-400 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-red-300 hover:text-red-600'
            }`}
          >
            <X className="w-3 h-3" strokeWidth={2.5} />
            لا
          </button>
        </div>
      </div>

      {/* Fee + Time inputs — only when available */}
      {isAvailable && (
        <div className="mt-4 grid grid-cols-2 gap-3 animate-fade-in">
          {/* Delivery fee */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              <Banknote className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
              سعر التوصيل (جنيه)
            </label>
            <input
              type="number"
              min={0}
              value={fee}
              onChange={(e) => handleFeeChange(e.target.value)}
              placeholder="0"
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                fee === '' || Number(fee) < 0
                  ? 'border-slate-200'
                  : 'border-emerald-300'
              }`}
            />
          </div>

          {/* Estimated time */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
              وقت الوصول (دقيقة)
            </label>
            <input
              type="number"
              min={1}
              value={time}
              onChange={(e) => handleTimeChange(e.target.value)}
              placeholder="30"
              className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                time === '' || Number(time) <= 0
                  ? 'border-slate-200'
                  : 'border-emerald-300'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

