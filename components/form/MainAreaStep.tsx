'use client'

import { useState, useEffect } from 'react'
import type { MainAreaAnswer, SubareaAnswer } from '@/lib/types'
import { ChevronRight, ChevronLeft, MapPin, Check, X } from 'lucide-react'
import SubareaInput from './SubareaInput'

interface MainAreaStepProps {
  answer: MainAreaAnswer
  stepIndex: number
  totalSteps: number
  onUpdateMainArea: (mainAreaId: string, generalAvailable: boolean) => void
  onUpdateSubarea: (
    mainAreaId: string,
    subareaId: string,
    deliveryAvailable: boolean,
    deliveryFee?: number,
    estimatedTime?: number
  ) => void
  onNext: () => void
  onPrevious: () => void
}

export default function MainAreaStep({
  answer,
  stepIndex,
  totalSteps,
  onUpdateMainArea,
  onUpdateSubarea,
  onNext,
  onPrevious,
}: MainAreaStepProps) {
  const [canProceed, setCanProceed] = useState(false)
  const isFirst = stepIndex === 0
  const isLast = stepIndex === totalSteps - 1

  // Validate whether user can proceed
  useEffect(() => {
    if (answer.generalDeliveryAvailable === null) {
      setCanProceed(false)
      return
    }
    if (answer.generalDeliveryAvailable === false) {
      setCanProceed(true)
      return
    }
    // All subareas must have an answer, and if available must have fee/time
    const allAnswered = answer.subareas.every((sa) => {
      if (sa.deliveryAvailable === null) return false
      if (sa.deliveryAvailable === false) return true
      // Available: fee must be >= 0, time must be > 0
      return (
        sa.deliveryFee !== undefined &&
        sa.deliveryFee >= 0 &&
        sa.estimatedTime !== undefined &&
        sa.estimatedTime > 0
      )
    })
    setCanProceed(allAnswered)
  }, [answer])

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-l from-sky-500 to-cyan-400" />

      <div className="px-6 pt-6 pb-4">
        {/* Area header */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center border border-sky-100 shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 text-sky-500" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">
              {answer.governorateNameAr}
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">
              {answer.mainAreaNameAr}
            </h2>
          </div>
        </div>

        {/* General availability question */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-5">
          <p className="text-sm font-semibold text-slate-700 mb-4">
            هل المطعم بيوصل للمنطقة دي بشكل عام؟
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onUpdateMainArea(answer.mainAreaId, true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                answer.generalDeliveryAvailable === true
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
              نعم
            </button>
            <button
              onClick={() => onUpdateMainArea(answer.mainAreaId, false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                answer.generalDeliveryAvailable === false
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
              لا
            </button>
          </div>
        </div>

        {/* Subareas — only shown when general is YES */}
        {answer.generalDeliveryAvailable === true && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-xs text-slate-400 font-medium px-2">
                مناطق فرعية ({answer.subareas.length})
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="space-y-3">
              {answer.subareas.map((sa) => (
                <SubareaInput
                  key={sa.subareaId}
                  subarea={sa}
                  onUpdate={(deliveryAvailable, fee, time) =>
                    onUpdateSubarea(
                      answer.mainAreaId,
                      sa.subareaId,
                      deliveryAvailable,
                      fee,
                      time
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Skipped state */}
        {answer.generalDeliveryAvailable === false && (
          <div className="animate-fade-in bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
            <X className="w-4 h-4 text-red-400 shrink-0" strokeWidth={2} />
            <p className="text-xs text-red-600">
              لن يُطلب منك تفاصيل هذه المنطقة لأن التوصيل غير متاح.
            </p>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <ChevronRight className="w-4 h-4" />
          {isFirst ? 'الرئيسية' : 'السابق'}
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
            canProceed
              ? 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isLast ? 'مراجعة الإجابات' : 'التالي'}
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

