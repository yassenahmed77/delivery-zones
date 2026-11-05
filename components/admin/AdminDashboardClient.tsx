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
  Store as StoreIcon,
  Filter,
  RefreshCw,
  ExternalLink,
  Layers,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
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

  // Submissions state
  const [submissions] = useState<SubmissionRow[]>(initialSubmissions)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<DbSubmission | null>(null)
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
      setSelectedSubmission(null)
      setSelectedAnswers(null)
      return
    }
    setSelectedId(id)
    setLoadingDetail(true)
    try {
      const res = await fetch(`/api/admin/submission?id=${id}`)
      const data = await res.json()
      setSelectedSubmission(data.submission || null)
      setSelectedAnswers(data.submission?.answers || [])
    } catch {
      setSelectedAnswers([])
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleExport = async (submissionId: string, restaurantName?: string) => {
    setExporting(submissionId)
    try {
      const res = await fetch(`/api/admin/export?id=${submissionId}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const safeName = (restaurantName || 'delivery-zones').replace(/[^\w\u0600-\u06FF-]/g, '_')
      a.download = `مناطق-توصيل-${safeName}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(null)
    }
  }

  // Filter submissions by restaurant name
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

  // Calculate covered zones count for selected submission
  let selectedCoveredCount = 0
  if (selectedAnswers) {
    selectedAnswers.forEach((a) => {
      if (a.generalDeliveryAvailable === true) {
        selectedCoveredCount += a.subareas.filter((sa) => sa.deliveryAvailable === true).length
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-16" dir="rtl">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <StoreIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight">
                لوحة تحكم إرسالات المطاعم
              </h1>
              <p className="text-[11px] text-slate-400">
                متابعة وتصدير مناطق التوصيل لكل مطعم
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs text-slate-400 hidden md:block" dir="ltr">
              {userEmail}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
              <StoreIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{submissions.length}</div>
              <div className="text-xs font-bold text-slate-500">إجمالي المطاعم المسجلة</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {submissions.length > 0 ? 'مكتمل' : 'لا يوجد'}
              </div>
              <div className="text-xs font-bold text-slate-500">حالة البيانات</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center font-black">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">
                {submissions[0]
                  ? new Date(submissions[0].created_at).toLocaleDateString('ar-EG', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'}
              </div>
              <div className="text-xs font-bold text-slate-500">أحدث إرسال مستلم</div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Restaurants Submissions List (Col 1) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-black text-slate-900 text-sm">
                    قائمة المطاعم ({submissions.length})
                  </h2>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                    مفصولة بالاسم
                  </span>
                </div>

                <div className="relative">
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث باسم المطعم..."
                    className="w-full pr-10 pl-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-10 text-center text-slate-400 text-xs">
                    <StoreIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="font-bold">لا توجد مطاعم مطابقة للبحث</p>
                  </div>
                ) : (
                  filteredSubmissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSubmission(sub.id)}
                      className={`w-full text-right p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedId === sub.id
                          ? 'bg-sky-50/80 border-r-4 border-sky-600'
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <StoreIcon className="w-4 h-4 text-sky-600 shrink-0" />
                            <span className="text-sm font-black text-slate-900 truncate">
                              {sub.restaurant_name || 'مطعم غير مسمى'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
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
                          {/* Export CSV for this specific restaurant */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleExport(sub.id, sub.restaurant_name || undefined)
                            }}
                            disabled={exporting === sub.id}
                            className="p-2 text-slate-600 hover:text-white hover:bg-sky-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                            title="تصدير Excel خاص بهذا المطعم"
                          >
                            {exporting === sub.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Download className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {selectedId === sub.id ? (
                            <ChevronUp className="w-4 h-4 text-sky-600" />
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

          {/* Details Column for Selected Restaurant (Col 2 & 3) */}
          <div className="lg:col-span-2">
            {!selectedId && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm h-80 flex items-center justify-center p-8">
                <div className="text-center text-slate-400">
                  <StoreIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-bold text-slate-700">اختر أي مطعم من القائمة لعرض تفاصيله</p>
                  <p className="text-xs text-slate-400 mt-1">
                    ستظهر لك كافة المناطق والأسعار وأوقات التوصيل الخاصة به مع إمكانية تصديرها إكسل.
                  </p>
                </div>
              </div>
            )}

            {selectedId && loadingDetail && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm h-80 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
              </div>
            )}

            {selectedId && !loadingDetail && selectedAnswers !== null && (
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in">
                {/* Store Header Banner */}
                <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400">المطعم المحدد:</span>
                    <h3 className="text-xl font-black text-slate-900 mt-0.5">
                      {selectedSubmission?.restaurant_name || 'مطعم غير مسمى'}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>الأحياء المغطاة: <strong className="text-emerald-600 font-extrabold">{selectedCoveredCount} حي</strong></span>
                      {selectedSubmission?.missing_area_note && (
                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          ملاحظة: {selectedSubmission.missing_area_note}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleExport(selectedId, selectedSubmission?.restaurant_name || undefined)}
                    disabled={exporting === selectedId}
                    className="flex items-center gap-2 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-2xl transition-colors shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير Excel للمطعم</span>
                  </button>
                </div>

                {/* Filters Header */}
                <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-slate-50/50">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-extrabold">
                      <Filter className="w-3.5 h-3.5 text-sky-600" />
                      تصفية:
                    </div>
                    <select
                      value={govFilter}
                      onChange={(e) => setGovFilter(e.target.value)}
                      className="text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="all">كل المحافظات</option>
                      <option value="cairo">القاهرة</option>
                      <option value="giza">الجيزة</option>
                    </select>
                    <select
                      value={availFilter}
                      onChange={(e) => setAvailFilter(e.target.value)}
                      className="text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="all">الكل</option>
                      <option value="yes">متاح فقط</option>
                      <option value="no">غير متاح فقط</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={areaSearch}
                      onChange={(e) => setAreaSearch(e.target.value)}
                      placeholder="البحث باسم الحي أو المنطقة..."
                      className="w-full pr-10 pl-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Areas Table */}
                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 sticky top-0 border-b border-slate-100 text-slate-500 text-xs font-extrabold">
                      <tr>
                        {['المحافظة', 'المنطقة الرئيسية', 'متاح عام', 'المنطقة الفرعية', 'متاح', 'السعر', 'الوقت'].map((h) => (
                          <th key={h} className="px-4 py-3 text-right whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAnswers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-10 text-center text-slate-400 text-xs">
                            لا توجد نتائج مطابقة للتصفية
                          </td>
                        </tr>
                      ) : (
                        filteredAnswers.flatMap((area) => {
                          if (area.generalDeliveryAvailable === false) {
                            return [
                              <tr key={area.mainAreaId} className="hover:bg-slate-50/50">
                                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                                  {area.governorateNameAr}
                                </td>
                                <td className="px-4 py-3 text-xs font-bold text-slate-900 whitespace-nowrap">
                                  {area.mainAreaNameAr}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    <X className="w-3 h-3" /> لا
                                  </span>
                                </td>
                                <td colSpan={4} className="px-4 py-3 text-xs text-slate-400 italic">
                                  تم استبعاد كافة التفرعات
                                </td>
                              </tr>,
                            ]
                          }

                          return area.subareas.map((sa, si) => (
                            <tr key={`${area.mainAreaId}-${sa.subareaId}`} className="hover:bg-slate-50/50">
                              {si === 0 ? (
                                <>
                                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap" rowSpan={area.subareas.length}>
                                    {area.governorateNameAr}
                                  </td>
                                  <td className="px-4 py-3 text-xs font-bold text-slate-900 whitespace-nowrap" rowSpan={area.subareas.length}>
                                    {area.mainAreaNameAr}
                                  </td>
                                  <td className="px-4 py-3" rowSpan={area.subareas.length}>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                                      <Check className="w-3 h-3" /> نعم
                                    </span>
                                  </td>
                                </>
                              ) : null}
                              <td className="px-4 py-3 text-xs font-semibold text-slate-800 whitespace-nowrap">
                                {sa.subareaNameAr}
                              </td>
                              <td className="px-4 py-3">
                                {sa.deliveryAvailable === true ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                                    <Check className="w-3 h-3" /> متاح
                                  </span>
                                ) : sa.deliveryAvailable === false ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                                    <X className="w-3 h-3" /> لا
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-xs font-bold text-slate-700 whitespace-nowrap">
                                {sa.deliveryAvailable === true && sa.deliveryFee !== undefined
                                  ? `${sa.deliveryFee} ج.م`
                                  : '—'}
                              </td>
                              <td className="px-4 py-3 text-xs font-bold text-slate-700 whitespace-nowrap">
                                {sa.deliveryAvailable === true && sa.estimatedTime !== undefined
                                  ? `${sa.estimatedTime} دقيقة`
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
