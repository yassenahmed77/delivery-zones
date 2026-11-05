'use client'

import { useState, useEffect } from 'react'
import type { MainAreaAnswer } from '@/lib/types'
import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Check,
  X,
  Sparkles,
  Info,
} from 'lucide-react'
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

  // Batch fill states
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [batchFee, setBatchFee] = useState('30')
  const [batchTime, setBatchTime] = useState('45')

  // Validation
  useEffect(() => {
    if (answer.generalDeliveryAvailable === null) {
      setCanProceed(false)
      return
    }
    if (answer.generalDeliveryAvailable === false) {
      setCanProceed(true)
      return
    }
    // General is YES -> every subarea must have deliveryAvailable !== null
    // If deliveryAvailable is true, deliveryFee >= 0 and estimatedTime > 0
    const allValid = answer.subareas.every((sa) => {
      if (sa.deliveryAvailable === null) return false
      if (sa.deliveryAvailable === false) return true
      return (
        sa.deliveryFee !== undefined &&
        sa.deliveryFee >= 0 &&
        sa.estimatedTime !== undefined &&
        sa.estimatedTime > 0
      )
    })
    setCanProceed(allValid)
  }, [answer])

  // Quick action: set all subareas available with uniform fee/time
  const handleApplyBatch = () => {
    const feeNum = Number(batchFee) || 0
    const timeNum = Number(batchTime) || 30
    answer.subareas.forEach((sa) => {
      onUpdateSubarea(answer.mainAreaId, sa.subareaId, true, feeNum, timeNum)
    })
    setShowBatchModal(false)
  }

  // Quick action: set all subareas unavailable
  const handleSetAllUnavailable = () => {
    answer.subareas.forEach((sa) => {
      onUpdateSubarea(answer.mainAreaId, sa.subareaId, false)
    })
  }

  const answeredCount = answer.subareas.filter(
    (sa) => sa.deliveryAvailable !== null
  ).length

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden transition-all">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
            <MapPin className="w-3.5 h-3.5" />
            محافظة {answer.governorateNameAr}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {stepIndex + 1} / {totalSteps}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {answer.mainAreaNameAr}
        </h2>
        <p className="text-xs text-slate-400 mt-1">{answer.mainAreaNameEn}</p>
      </div>

      <div className="p-6 sm:p-8">
        {/* General Delivery Availability Question */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            هل المطعم بيوصل لمنطقة ({answer.mainAreaNameAr}) بشكل عام؟
          </h3>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            إذا اخترت &quot;لا&quot;، سيتم تخطي كافة الأحياء والمناطق الفرعية التابعة لها والانتقال للمنطقة التالية مباشرة.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => onUpdateMainArea(answer.mainAreaId, true)}
              className={`flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                answer.generalDeliveryAvailable === true
                  ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-500/10'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Check className="w-5 h-5" strokeWidth={3} />
              <span>نعم، متاح التوصيل</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateMainArea(answer.mainAreaId, false)}
              className={`flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                answer.generalDeliveryAvailable === false
                  ? 'border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-500/25 ring-4 ring-rose-500/10'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <X className="w-5 h-5" strokeWidth={3} />
              <span>لا، غير متاح نهائياً</span>
            </button>
          </div>
        </div>

        {/* Subareas List (when general is YES) */}
        {answer.generalDeliveryAvailable === true && (
          <div className="space-y-4 animate-fade-in">
            {/* Header for subareas */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  تفاصيل الأحياء والمناطق الفرعية
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
                  {answeredCount} من {answer.subareas.length} محدد
                </span>
              </div>

              {/* Quick Batch Tools */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBatchModal(!showBatchModal)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  تحديد الكل بسعر موحد
                </button>
                <button
                  type="button"
                  onClick={handleSetAllUnavailable}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
                >
                  الكل غير متاح
                </button>
              </div>
            </div>

            {/* Quick Batch Popover */}
            {showBatchModal && (
              <div className="p-4 rounded-2xl bg-sky-50/90 border border-sky-200 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900 mb-3">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  تطبيق سعر ووقت موحد على كافة أحياء ({answer.mainAreaNameAr}):
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      السعر (جنيه)
                    </label>
                    <input
                      type="number"
                      value={batchFee}
                      onChange={(e) => setBatchFee(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      الوقت (دقيقة)
                    </label>
                    <input
                      type="number"
                      value={batchTime}
                      onChange={(e) => setBatchTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBatchModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 font-bold hover:bg-slate-200 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyBatch}
                    className="px-4 py-1.5 text-xs bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-sm"
                  >
                    تطبيق على جميع الأحياء
                  </button>
                </div>
              </div>
            )}

            {/* Subarea List */}
            <div className="space-y-3 pt-1">
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

        {/* Skipped Message */}
        {answer.generalDeliveryAvailable === false && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 animate-fade-in">
            <Info className="w-5 h-5 text-rose-500 shrink-0" />
            <p className="leading-relaxed">
              تم تحديد أن التوصيل غير متاح لمنطقة {answer.mainAreaNameAr}. يمكنك الضغط على &quot;التالي&quot; للمتابعة دون الحاجة لإدخال أي بيانات إضافية.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-6 sm:p-8 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
          <span>{isFirst ? 'الرئيسية' : 'المنطقة السابقة'}</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
            canProceed
              ? 'bg-slate-900 hover:bg-sky-600 active:bg-sky-700 text-white shadow-lg shadow-slate-900/10 hover:shadow-sky-500/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>{isLast ? 'مراجعة كافة الإجابات' : 'المنطقة التالية'}</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
