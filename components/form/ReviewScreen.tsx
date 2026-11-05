'use client'

import { useState } from 'react'
import type { FormSubmission, MainAreaAnswer } from '@/lib/types'
import { Check, X, Pencil, Send, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'

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
      <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
        <AlertCircle className="w-3 h-3" /> غير محدد
      </span>
    )
  if (available)
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
        <Check className="w-3 h-3" /> متاح
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
      <X className="w-3 h-3" /> غير متاح
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
  const coveredSubareas = answer.subareas.filter((s) => s.deliveryAvailable === true).length

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-600"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <div className="min-w-0">
            <div className="text-xs text-slate-400">{answer.governorateNameAr}</div>
            <div className="font-semibold text-sm text-slate-900 truncate">
              {answer.mainAreaNameAr}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <AnswerBadge available={answer.generalDeliveryAvailable} />
          <button
            onClick={() => onEdit(stepIndex)}
            className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-sky-50 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            تعديل
          </button>
        </div>
      </div>

      {/* Subareas — only shown if general is YES */}
      {expanded && answer.generalDeliveryAvailable === true && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 space-y-2">
          <div className="text-xs text-slate-500 mb-2">
            {coveredSubareas} من {answer.subareas.length} مناطق فرعية مغطاة
          </div>
          {answer.subareas.map((sa) => (
            <div
              key={sa.subareaId}
              className="flex items-center justify-between gap-2 text-xs"
            >
              <span className="text-slate-700">{sa.subareaNameAr}</span>
              <div className="flex items-center gap-2 shrink-0">
                {sa.deliveryAvailable === true && (
                  <>
                    {sa.deliveryFee !== undefined && (
                      <span className="text-slate-500">
                        {sa.deliveryFee} جنيه
                      </span>
                    )}
                    {sa.estimatedTime !== undefined && (
                      <span className="text-slate-500">
                        {sa.estimatedTime} دقيقة
                      </span>
                    )}
                  </>
                )}
                <AnswerBadge available={sa.deliveryAvailable} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* General is NO — just show the skip notice */}
      {expanded && answer.generalDeliveryAvailable === false && (
        <div className="border-t border-slate-100 bg-red-50/50 px-4 py-3">
          <p className="text-xs text-red-500">
            تم تخطي جميع المناطق الفرعية — التوصيل غير متاح.
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
  const answeredAreas = submission.answers.filter(
    (a) => a.generalDeliveryAvailable !== null
  ).length

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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-l from-sky-500 to-cyan-400" />

      <div className="px-6 pt-6 pb-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          مراجعة الإجابات
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          تم الإجابة على {answeredAreas} من {totalAreas} منطقة. راجع إجاباتك
          قبل الإرسال.
        </p>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: 'إجمالي المناطق',
              value: totalAreas,
              color: 'text-slate-700',
            },
            {
              label: 'متاح للتوصيل',
              value: submission.answers.filter(
                (a) => a.generalDeliveryAvailable === true
              ).length,
              color: 'text-emerald-600',
            },
            {
              label: 'غير متاح',
              value: submission.answers.filter(
                (a) => a.generalDeliveryAvailable === false
              ).length,
              color: 'text-red-500',
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-center"
            >
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Areas list */}
        <div className="space-y-2 mb-6 max-h-[50vh] overflow-y-auto pr-1">
          {submission.answers.map((answer, i) => (
            <MainAreaCard
              key={answer.mainAreaId}
              answer={answer}
              stepIndex={i}
              onEdit={onEdit}
            />
          ))}
        </div>

        {/* Missing area note */}
        <div className="mb-6">
          <label
            htmlFor="missing-note"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            هل هناك منطقة مفقودة؟
            <span className="text-slate-400 font-normal mr-1">(اختياري)</span>
          </label>
          <textarea
            id="missing-note"
            value={missingAreaNote}
            onChange={(e) => onMissingAreaNoteChange(e.target.value)}
            placeholder="اذكر المناطق التي لا تجدها في القائمة..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || submitted}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-base transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
            loading || submitted
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white'
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              جار الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              إرسال الإجابات
            </>
          )}
        </button>
      </div>
    </div>
  )
}

