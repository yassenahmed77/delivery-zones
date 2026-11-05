'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { DbSubmission, MainAreaAnswer } from '@/lib/types'
import {
  LogOut,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Calendar,
  Store,
  Filter,
  RefreshCw,
} from 'lucide-react'

type SubmissionRow = Pick<
  DbSubmission,
  'id' | 'restaurant_name' | 'submitted_at' | 'created_at' | 'missing_area_note'
>

interface AdminDashboardClientProps {
  initialSubmissions: SubmissionRow[]
  userEmail: string
}

export default function AdminDashboardClient({
  initialSubmissions,
  userEmail,
}: AdminDashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()

  const [submissions] = useState<SubmissionRow[]>(initialSubmissions)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<MainAreaAnswer[] | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [govFilter, setGovFilter] = useState<string>('all')
  const [availFilter, setAvailFilter] = useState<string>('all')
  const [exporting, setExporting] = useState<string | null>(null)
  const [areaSearch, setAreaSearch] = useState('')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleSelectSubmission = async (id: string) => {
    if (selectedId === id) {
      setSelectedId(null)
      setSelectedAnswers(null)
      return
    }
    setSelectedId(id)
    setLoadingDetail(true)
    try {
      const res = await fetch(`/api/admin/submission?id=${id}`)
      const data = await res.json()
      setSelectedAnswers(data.submission?.answers || [])
    } catch {
      setSelectedAnswers([])
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleExport = async (submissionId: string) => {
    setExporting(submissionId)
    try {
      const res = await fetch(`/api/admin/export?id=${submissionId}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `delivery-zones-${submissionId}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(null)
    }
  }

  // Filter submissions
  const filteredSubmissions = submissions.filter((s) => {
    const name = (s.restaurant_name || '').toLowerCase()
    return name.includes(searchQuery.toLowerCase()) || searchQuery === ''
  })

  // Filter answers for selected submission
  const filteredAnswers = (selectedAnswers || []).filter((a) => {
    const govMatch = govFilter === 'all' || a.governorateId === govFilter
    const availMatch =
      availFilter === 'all' ||
      (availFilter === 'yes' && a.generalDeliveryAvailable === true) ||
      (availFilter === 'no' && a.generalDeliveryAvailable === false)
    const searchMatch =
      areaSearch === '' ||
      a.mainAreaNameAr.includes(areaSearch) ||
      a.mainAreaNameEn.toLowerCase().includes(areaSearch.toLowerCase()) ||
      a.subareas.some(
        (sa) =>
          sa.subareaNameAr.includes(areaSearch) ||
          sa.subareaNameEn.toLowerCase().includes(areaSearch.toLowerCase())
      )
    return govMatch && availMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-slate-100" dir="rtl">
      {/* Top nav */}
      <header className="bg-slate-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">لوحة الإدارة</h1>
            <p className="text-slate-400 text-xs mt-0.5">مناطق التوصيل</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:block">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800 text-sm mb-3">
                  الإرسالات ({submissions.length})
                </h2>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="البحث باسم المطعم..."
                    className="w-full pr-9 pl-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="px-5 py-10 text-center text-slate-400 text-sm">
                    لا توجد إرسالات
                  </div>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSubmission(sub.id)}
                      className={`w-full text-right px-5 py-4 hover:bg-slate-50 transition-colors ${
                        selectedId === sub.id ? 'bg-sky-50 border-r-2 border-sky-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="text-sm font-medium text-slate-800 truncate">
                              {sub.restaurant_name || 'بدون اسم'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(sub.created_at).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleExport(sub.id)
                            }}
                            disabled={exporting === sub.id}
                            className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            title="تصدير CSV"
                          >
                            {exporting === sub.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Download className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {selectedId === sub.id ? (
                            <ChevronUp className="w-4 h-4 text-sky-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            {!selectedId && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <Store className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">اختر إرسالة لعرض تفاصيلها</p>
                </div>
              </div>
            )}

            {selectedId && loadingDetail && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-sky-500 animate-spin" />
              </div>
            )}

            {selectedId && !loadingDetail && selectedAnswers !== null && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Filters */}
                <div className="px-5 py-4 border-b border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Filter className="w-4 h-4" />
                      تصفية:
                    </div>
                    <select
                      value={govFilter}
                      onChange={(e) => setGovFilter(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="all">كل المحافظات</option>
                      <option value="cairo">القاهرة</option>
                      <option value="giza">الجيزة</option>
                    </select>
                    <select
                      value={availFilter}
                      onChange={(e) => setAvailFilter(e.target.value)}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="all">الكل</option>
                      <option value="yes">متاح فقط</option>
                      <option value="no">غير متاح فقط</option>
                    </select>
                    <button
                      onClick={() => handleExport(selectedId)}
                      disabled={exporting === selectedId}
                      className="flex items-center gap-1.5 text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-lg transition-colors mr-auto"
                    >
                      <Download className="w-3.5 h-3.5" />
                      تصدير CSV
                    </button>
                  </div>

                  {/* Area search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={areaSearch}
                      onChange={(e) => setAreaSearch(e.target.value)}
                      placeholder="البحث باسم المنطقة..."
                      className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        {[
                          'المحافظة',
                          'المنطقة الرئيسية',
                          'متاح عام',
                          'المنطقة الفرعية',
                          'متاح',
                          'السعر',
                          'الوقت',
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-right text-xs font-semibold text-slate-500 border-b border-slate-100 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredAnswers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="px-4 py-8 text-center text-slate-400 text-xs"
                          >
                            لا توجد نتائج
                          </td>
                        </tr>
                      ) : (
                        filteredAnswers.flatMap((area) => {
                          if (area.generalDeliveryAvailable === false) {
                            return [
                              <tr key={area.mainAreaId} className="hover:bg-slate-50/50">
                                <td className="px-4 py-2.5 text-xs text-slate-600 whitespace-nowrap">
                                  {area.governorateNameAr}
                                </td>
                                <td className="px-4 py-2.5 text-xs font-medium text-slate-800 whitespace-nowrap">
                                  {area.mainAreaNameAr}
                                </td>
                                <td className="px-4 py-2.5">
                                  <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    <X className="w-3 h-3" /> لا
                                  </span>
                                </td>
                                <td colSpan={4} className="px-4 py-2.5 text-xs text-slate-400 italic">
                                  تم التخطي
                                </td>
                              </tr>,
                            ]
                          }

                          return area.subareas.map((sa, si) => (
                            <tr
                              key={`${area.mainAreaId}-${sa.subareaId}`}
                              className="hover:bg-slate-50/50"
                            >
                              {si === 0 ? (
                                <>
                                  <td
                                    className="px-4 py-2.5 text-xs text-slate-600 whitespace-nowrap"
                                    rowSpan={area.subareas.length}
                                  >
                                    {area.governorateNameAr}
                                  </td>
                                  <td
                                    className="px-4 py-2.5 text-xs font-medium text-slate-800 whitespace-nowrap"
                                    rowSpan={area.subareas.length}
                                  >
                                    {area.mainAreaNameAr}
                                  </td>
                                  <td
                                    className="px-4 py-2.5"
                                    rowSpan={area.subareas.length}
                                  >
                                    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                                      <Check className="w-3 h-3" /> نعم
                                    </span>
                                  </td>
                                </>
                              ) : null}
                              <td className="px-4 py-2.5 text-xs text-slate-700 whitespace-nowrap">
                                {sa.subareaNameAr}
                              </td>
                              <td className="px-4 py-2.5">
                                {sa.deliveryAvailable === true ? (
                                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    <Check className="w-3 h-3" /> نعم
                                  </span>
                                ) : sa.deliveryAvailable === false ? (
                                  <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                                    <X className="w-3 h-3" /> لا
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400">—</span>
                                )}
                              </td>
                              <td className="px-4 py-2.5 text-xs text-slate-700 whitespace-nowrap">
                                {sa.deliveryAvailable === true && sa.deliveryFee !== undefined
                                  ? `${sa.deliveryFee} ج`
                                  : '—'}
                              </td>
                              <td className="px-4 py-2.5 text-xs text-slate-700 whitespace-nowrap">
                                {sa.deliveryAvailable === true && sa.estimatedTime !== undefined
                                  ? `${sa.estimatedTime} د`
                                  : '—'}
                              </td>
                            </tr>
                          ))
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

