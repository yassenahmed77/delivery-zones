'use client'

import { useState } from 'react'
import type { FormSubmission, MainAreaAnswer } from '@/lib/types'
import {
  Check,
  X,
  Pencil,
  Send,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Clock,
  Banknote,
  CheckCircle2,
} from 'lucide-react'

interface ReviewScreenProps {
  submission: FormSubmission
  missingAreaNote: string
  onMissingAreaNoteChange: (note: string) => void
  onEdit: (stepIndex: number) => void
  onSubmitSuccess: () => void
}

function AnswerBadge({ available }: { available: boolean | null }) {
  if (available === null)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full">
        <HelpCircle className="w-3 h-3" /> لم يُحدد
      </span>
    )
  if (available)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">
        <Check className="w-3 h-3" strokeWidth={2.5} /> متاح
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
      <X className="w-3 h-3" strokeWidth={2.5} /> غير متاح
    </span>
  )
}

function MainAreaCard({
  answer,
  stepIndex,
  onEdit,
}: {
  answer: MainAreaAnswer
  stepIndex: number
  onEdit: (i: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const isUnified =
    answer.subareas.length === 1 && answer.subareas[0].subareaId.endsWith('-unified')
  const coveredSubareas = answer.subareas.filter(
    (s) => s.deliveryAvailable === true
  ).length

  return (
    <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs transition-all hover:border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-4 bg-white">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors shrink-0"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
              {answer.governorateNameAr}
            </span>
            <div className="font-bold text-sm text-slate-900 break-words leading-snug mt-1">
              {answer.mainAreaNameAr}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <AnswerBadge available={answer.generalDeliveryAvailable} />
          <button
            type="button"
            onClick={() => onEdit(stepIndex)}
            className="text-xs font-bold text-sky-600 hover:text-white hover:bg-sky-600 flex items-center gap-1 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            تعديل
          </button>
        </div>
      </div>

      {/* Subareas List */}
      {expanded && answer.generalDeliveryAvailable === true && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-2.5 animate-fade-in">
          <div className="text-xs font-bold text-slate-500 mb-2">
            {isUnified
              ? 'تغطية موحدة لكافة أنحاء المنطقة'
              : `الأحياء المغطاة: ${coveredSubareas} من ${answer.subareas.length}`}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {answer.subareas.map((sa) => (
              <div
                key={sa.subareaId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200/60 text-xs"
              >
                <span className="font-bold text-slate-800 break-words leading-snug">
                  {sa.subareaNameAr}
                </span>
                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  {sa.deliveryAvailable === true && (
                    <>
                      <span className="inline-flex items-center gap-1 font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Banknote className="w-3 h-3 text-slate-400" />
                        {sa.deliveryFee} ج.م
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {sa.estimatedTime} د
                      </span>
                    </>
                  )}
                  <AnswerBadge available={sa.deliveryAvailable} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General is NO */}
      {expanded && answer.generalDeliveryAvailable === false && (
        <div className="border-t border-slate-100 bg-rose-50/30 p-4 animate-fade-in">
          <p className="text-xs font-semibold text-rose-600">
            تم استبعاد هذه المنطقة بالكامل من التغطية ولم يتم تضمين أي أحياء تابعة لها.
          </p>
        </div>
      )}
    </div>
  )
}

export default function ReviewScreen({
  submission,
  missingAreaNote,
  onMissingAreaNoteChange,
  onEdit,
  onSubmitSuccess,
}: ReviewScreenProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const totalAreas = submission.answers.length
  const coveredAreasCount = submission.answers.filter(
    (a) => a.generalDeliveryAvailable === true
  ).length
  const excludedAreasCount = submission.answers.filter(
    (a) => a.generalDeliveryAvailable === false
  ).length

  // Calculate covered subareas total
  let totalCoveredSubareas = 0
  submission.answers.forEach((a) => {
    if (a.generalDeliveryAvailable === true) {
      totalCoveredSubareas += a.subareas.filter(
        (sa) => sa.deliveryAvailable === true
      ).length
    }
  })

  const handleSubmit = async () => {
    if (submitted) return
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: submission.restaurantName,
          answers: submission.answers,
          missingAreaNote: submission.missingAreaNote,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'حدث خطأ أثناء الإرسال')
      }

      setSubmitted(true)
      onSubmitSuccess()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-100 w-fit px-3 py-1 rounded-full mb-3">
          <CheckCircle2 className="w-3.5 h-3.5" />
          المرحلة النهائية قبل الإرسال
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          تم الانتهاء من مراجعة مناطق التوصيل
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          راجع ملخص مناطق التغطية والأسعار الخاصة بمطعمك قبل الاعتماد النهائي.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {totalAreas}
            </div>
            <div className="text-xs font-bold text-slate-500 mt-1">
              إجمالي المناطق
            </div>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {coveredAreasCount}
            </div>
            <div className="text-xs font-bold text-emerald-800 mt-1">
              مناطق متاحة ({totalCoveredSubareas} حي)
            </div>
          </div>

          <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-black text-rose-600">
              {excludedAreasCount}
            </div>
            <div className="text-xs font-bold text-rose-800 mt-1">
              مناطق غير متاحة
            </div>
          </div>
        </div>

        {/* Detailed Areas List */}
        <div className="mb-8">
          <h3 className="text-sm font-extrabold text-slate-900 mb-3">
            تفاصيل المناطق المسجلة ({submission.answers.length})
          </h3>
          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {submission.answers.map((answer, i) => (
              <MainAreaCard
                key={answer.mainAreaId}
                answer={answer}
                stepIndex={i}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>

        {/* Missing area note input */}
        <div className="mb-8 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <label
            htmlFor="missing-note"
            className="block text-sm font-bold text-slate-900 mb-1"
          >
            هل هناك مناطق أو تجمعات سكنية مفقودة تود إضافتها؟
          </label>
          <p className="text-xs text-slate-500 mb-3">
            اختياري — اكتب أي أحياء أو كمبوندات أخرى ترغب في تغطيتها ولم تجدها بالقائمة.
          </p>
          <textarea
            id="missing-note"
            value={missingAreaNote}
            onChange={(e) => onMissingAreaNoteChange(e.target.value)}
            placeholder="مثال: كمباوند كذا في الشيخ زايد، أو مربع سكني محدد..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none shadow-xs"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || submitted}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-xl cursor-pointer ${
            loading || submitted
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-emerald-600/25'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              جار حفظ وإرسال البيانات...
            </span>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>إرسال الإجابات</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
