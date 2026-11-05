'use client'

import { useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { deliveryAreas } from '@/data/deliveryAreas'
import type { FormSubmission, MainAreaAnswer, SubareaAnswer } from '@/lib/types'
import WelcomeScreen from '@/components/form/WelcomeScreen'
import MainAreaStep from '@/components/form/MainAreaStep'
import ReviewScreen from '@/components/form/ReviewScreen'
import ConfirmationScreen from '@/components/form/ConfirmationScreen'
import ProgressBar from '@/components/form/ProgressBar'

type FormStage = 'welcome' | 'form' | 'review' | 'confirmed'

const allMainAreas = deliveryAreas.flatMap((gov) =>
  gov.mainAreas.map((ma) => ({
    ...ma,
    governorateId: gov.id,
    governorateNameAr: gov.nameAr,
    governorateNameEn: gov.nameEn,
  }))
)

function buildInitialAnswers(): MainAreaAnswer[] {
  return allMainAreas.map((ma) => ({
    mainAreaId: ma.id,
    mainAreaNameAr: ma.nameAr,
    mainAreaNameEn: ma.nameEn,
    governorateId: ma.governorateId,
    governorateNameAr: ma.governorateNameAr,
    governorateNameEn: ma.governorateNameEn,
    generalDeliveryAvailable: null,
    subareas:
      ma.subareas.length > 0
        ? ma.subareas.map((sa): SubareaAnswer => ({
            subareaId: sa.id,
            subareaNameAr: sa.nameAr,
            subareaNameEn: sa.nameEn,
            deliveryAvailable: null,
          }))
        : [
            {
              subareaId: `${ma.id}-unified`,
              subareaNameAr: 'المنطقة بالكامل',
              subareaNameEn: 'Entire Area',
              deliveryAvailable: null,
            },
          ],
  }))
}

function DeliveryCoverageApp() {
  const searchParams = useSearchParams()
  const initialName = searchParams.get('restaurant') || searchParams.get('store') || ''

  const [stage, setStage] = useState<FormStage>('welcome')
  const [currentStep, setCurrentStep] = useState(0)
  const [restaurantName, setRestaurantName] = useState(initialName)
  const [answers, setAnswers] = useState<MainAreaAnswer[]>(buildInitialAnswers)
  const [missingAreaNote, setMissingAreaNote] = useState('')

  const totalSteps = allMainAreas.length

  const handleStart = useCallback(() => {
    setStage('form')
    setCurrentStep(0)
  }, [])

  const updateMainAreaAnswer = useCallback(
    (mainAreaId: string, generalAvailable: boolean) => {
      setAnswers((prev) =>
        prev.map((a) => {
          if (a.mainAreaId !== mainAreaId) return a
          const isUnified =
            a.subareas.length === 1 && a.subareas[0].subareaId.endsWith('-unified')

          const updatedSubareas = isUnified
            ? a.subareas.map((sa) => ({
                ...sa,
                deliveryAvailable: generalAvailable,
              }))
            : a.subareas

          return {
            ...a,
            generalDeliveryAvailable: generalAvailable,
            subareas: updatedSubareas,
          }
        })
      )
    },
    []
  )

  const updateSubareaAnswer = useCallback(
    (
      mainAreaId: string,
      subareaId: string,
      deliveryAvailable: boolean,
      deliveryFee?: number,
      estimatedTime?: number
    ) => {
      setAnswers((prev) =>
        prev.map((a) => {
          if (a.mainAreaId !== mainAreaId) return a
          return {
            ...a,
            subareas: a.subareas.map((sa) =>
              sa.subareaId === subareaId
                ? {
                    ...sa,
                    deliveryAvailable,
                    deliveryFee: deliveryAvailable ? deliveryFee : undefined,
                    estimatedTime: deliveryAvailable ? estimatedTime : undefined,
                  }
                : sa
            ),
          }
        })
      )
    },
    []
  )

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setStage('review')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, totalSteps])

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setStage('welcome')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const handleEditFromReview = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex)
    setStage('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSubmitSuccess = useCallback(() => {
    setStage('confirmed')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (stage === 'welcome') {
    return (
      <WelcomeScreen
        restaurantName={restaurantName}
        onRestaurantNameChange={setRestaurantName}
        onStart={handleStart}
      />
    )
  }

  if (stage === 'confirmed') {
    return <ConfirmationScreen />
  }

  const submission: FormSubmission = {
    restaurantName: restaurantName.trim(),
    answers,
    missingAreaNote: missingAreaNote || undefined,
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {stage === 'form' && (
          <div className="animate-fade-in">
            {/* Restaurant indicator badge */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-2xl border border-slate-200/80 mb-4 shadow-xs">
              <span className="text-xs font-bold text-slate-500">
                المطعم:
              </span>
              <span className="text-xs font-black text-slate-900 bg-sky-50 text-sky-800 px-2.5 py-1 rounded-lg border border-sky-100">
                {restaurantName}
              </span>
            </div>

            <ProgressBar current={currentStep + 1} total={totalSteps} />
            <MainAreaStep
              answer={answers[currentStep]}
              stepIndex={currentStep}
              totalSteps={totalSteps}
              onUpdateMainArea={updateMainAreaAnswer}
              onUpdateSubarea={updateSubareaAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        )}

        {stage === 'review' && (
          <div className="animate-fade-in">
            <ReviewScreen
              submission={submission}
              missingAreaNote={missingAreaNote}
              onMissingAreaNoteChange={setMissingAreaNote}
              onEdit={handleEditFromReview}
              onSubmitSuccess={handleSubmitSuccess}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DeliveryCoverageApp />
    </Suspense>
  )
}
