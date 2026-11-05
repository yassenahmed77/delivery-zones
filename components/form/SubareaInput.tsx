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

  useEffect(() => {
    setFee(subarea.deliveryFee !== undefined ? String(subarea.deliveryFee) : '')
    setTime(subarea.estimatedTime !== undefined ? String(subarea.estimatedTime) : '')
  }, [subarea.subareaId, subarea.deliveryFee, subarea.estimatedTime])

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
      className={`rounded-2xl border transition-all duration-200 p-4 ${
        isAvailable
          ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
          : isUnavailable
          ? 'border-slate-200 bg-slate-50/70 opacity-80'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      {/* 1. Area Name ON TOP BY ITSELF (Full Width - No Truncation) */}
      <div className="mb-3">
        <div className="flex items-start gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
              isAvailable
                ? 'bg-emerald-500 ring-4 ring-emerald-100'
                : isUnavailable
                ? 'bg-rose-400 ring-4 ring-rose-100'
                : 'bg-slate-300'
            }`}
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-base font-black text-slate-900 leading-snug break-words">
              {subarea.subareaNameAr}
            </h4>
            <span className="text-xs font-semibold text-slate-400 block mt-0.5">
              {subarea.subareaNameEn}
            </span>
          </div>
        </div>
      </div>

      {/* 2. The Two Options Directly Under the Name */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => handleAvailabilityChange(true)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black transition-all duration-150 cursor-pointer border ${
            isAvailable
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Check className="w-4 h-4" strokeWidth={3} />
          <span>متاح</span>
        </button>

        <button
          type="button"
          onClick={() => handleAvailabilityChange(false)}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black transition-all duration-150 cursor-pointer border ${
            isUnavailable
              ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-600/20'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <X className="w-4 h-4" strokeWidth={3} />
          <span>غير متاح</span>
        </button>
      </div>

      {/* 3. Fee & Time Inputs (when Available) */}
      {isAvailable && (
        <div className="mt-4 pt-3.5 border-t border-emerald-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              سعر التوصيل
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                value={fee}
                onChange={(e) => handleFeeChange(e.target.value)}
                placeholder="مثال: 25"
                className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  fee === '' || Number(fee) < 0
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200'
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                ج.م
              </span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              وقت الوصول التقريبي
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
                placeholder="مثال: 35"
                className={`w-full px-3.5 py-2.5 pr-12 rounded-xl border text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  time === '' || Number(time) <= 0
                    ? 'border-amber-300 ring-1 ring-amber-200'
                    : 'border-slate-200'
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                دقيقة
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
