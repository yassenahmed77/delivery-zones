'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { DbSubmission, MainAreaAnswer, Store } from '@/lib/types'
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
  Plus,
  Copy,
  CheckCheck,
  MessageCircle,
  Trash2,
  ExternalLink,
  Layers,
  MapPin,
  Clock,
  Banknote,
} from 'lucide-react'

type SubmissionRow = Pick<
  DbSubmission,
  'id' | 'restaurant_name' | 'submitted_at' | 'created_at' | 'missing_area_note' | 'store_id' | 'store_slug'
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

  // Tabs: 'stores' | 'submissions'
  const [activeTab, setActiveTab] = useState<'stores' | 'submissions'>('stores')

  // Stores state
  const [stores, setStores] = useState<Store[]>([])
  const [loadingStores, setLoadingStores] = useState(false)
  const [storeSearch, setStoreSearch] = useState('')
  const [storeStatusFilter, setStoreStatusFilter] = useState<'all' | 'pending' | 'submitted'>('all')

  // Create store modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStoreName, setNewStoreName] = useState('')
  const [newStorePhone, setNewStorePhone] = useState('')
  const [newStoreNotes, setNewStoreNotes] = useState('')
  const [creatingStore, setCreatingStore] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // Copy feedback
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  // Submissions state
  const [submissions] = useState<SubmissionRow[]>(initialSubmissions)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<MainAreaAnswer[] | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [govFilter, setGovFilter] = useState<string>('all')
  const [availFilter, setAvailFilter] = useState<string>('all')
  const [exporting, setExporting] = useState<string | null>(null)
  const [areaSearch, setAreaSearch] = useState('')

  // Fetch stores
  const fetchStores = useCallback(async () => {
    setLoadingStores(true)
    try {
      const res = await fetch('/api/admin/stores')
      const data = await res.json()
      if (data.stores) {
        setStores(data.stores)
      }
    } catch (err) {
      console.error('Fetch stores error:', err)
    } finally {
      setLoadingStores(false)
    }
  }, [])

  useEffect(() => {
    fetchStores()
  }, [fetchStores])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // Create new store link
  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStoreName.trim()) return

    setCreatingStore(true)
    setCreateError(null)

    try {
      const res = await fetch('/api/admin/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStoreName.trim(),
          phone: newStorePhone.trim() || undefined,
          notes: newStoreNotes.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء إضافة المحل')
      }

      setNewStoreName('')
      setNewStorePhone('')
      setNewStoreNotes('')
      setShowAddModal(false)
      fetchStores()
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : 'خطأ غير متوقع')
    } finally {
      setCreatingStore(false)
    }
  }

  // Delete store
  const handleDeleteStore = async (storeId: string, storeName: string) => {
    if (!confirm(`هل أنت متأكد من حذف محل "${storeName}"؟ سيتم حذف جميع بيانات التوصيل المرتبطة به.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/stores?id=${storeId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setStores((prev) => prev.filter((s) => s.id !== storeId))
      }
    } catch (err) {
      console.error('Delete store error:', err)
    }
  }

  // Copy link to clipboard
  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const fullUrl = `${origin}/r/${slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2500)
  }

  // Open WhatsApp share
  const handleWhatsAppShare = (store: Store) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const fullUrl = `${origin}/r/${store.slug}`
    const text = `مرحباً بكم إدارة ${store.name}، برجاء مراجعة وتحديد مناطق التوصيل وأسعار ومدة الوصول عبر الرابط المعتمد الخاص بكم:\n${fullUrl}`

    let phone = (store.phone || '').replace(/[^\d]/g, '')
    if (phone.startsWith('01')) {
      phone = '2' + phone
    }

    const waUrl = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`

    window.open(waUrl, '_blank')
  }

  // View store answers
  const handleViewStoreAnswers = (storeId: string) => {
    const match = submissions.find((s) => s.store_id === storeId)
    if (match) {
      setActiveTab('submissions')
      handleSelectSubmission(match.id)
    } else {
      alert('لم يقم هذا المحل بإرسال مناطق التوصيل حتى الآن.')
    }
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

  const handleExportStore = async (storeId: string, storeName: string) => {
    setExporting(storeId)
    try {
      const res = await fetch(`/api/admin/export?store_id=${storeId}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `delivery-zones-${storeName}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(null)
    }
  }

  // Filter stores
  const filteredStores = stores.filter((s) => {
    const matchName = s.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
      (s.phone && s.phone.includes(storeSearch))
    const matchStatus = storeStatusFilter === 'all' || s.status === storeStatusFilter
    return matchName && matchStatus
  })

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
                لوحة إدارة مناطق التوصيل
              </h1>
              <p className="text-[11px] text-slate-400">
                نظام إدارة المحلات والتغطية الجغرافية
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

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div className="flex items-center gap-2 bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/60">
            <button
              onClick={() => setActiveTab('stores')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'stores'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <StoreIcon className="w-4 h-4 text-sky-600" />
              <span>المحلات والروابط المخصصة ({stores.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>كافة الإرسالات والمناطق ({submissions.length})</span>
            </button>
          </div>

          {activeTab === 'stores' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-sky-600/20 transition-all cursor-pointer mr-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إضافة محل وتوليد رابط</span>
            </button>
          )}
        </div>

        {/* TAB 1: STORES & CUSTOM LINKS */}
        {activeTab === 'stores' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-in">
            {/* Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  placeholder="البحث باسم المحل أو رقم الهاتف..."
                  className="w-full pr-10 pl-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={storeStatusFilter}
                  onChange={(e) => setStoreStatusFilter(e.target.value as 'all' | 'pending' | 'submitted')}
                  className="text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="all">كل الحالات</option>
                  <option value="submitted">✅ تم الرد والتسجيل</option>
                  <option value="pending">⏳ في انتظار الرد</option>
                </select>

                <button
                  onClick={fetchStores}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="تحديث البيانات"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingStores ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Stores Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-extrabold">
                  <tr>
                    <th className="px-5 py-3.5">اسم المحل</th>
                    <th className="px-5 py-3.5">الرابط المخصص</th>
                    <th className="px-5 py-3.5">حالة التغطية</th>
                    <th className="px-5 py-3.5">تاريخ الإرسال</th>
                    <th className="px-5 py-3.5 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStores.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        {loadingStores ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
                            <span>جار تحميل بيانات المحلات...</span>
                          </div>
                        ) : (
                          <div>
                            <StoreIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="font-bold">لا توجد محلات مسجلة تطابق البحث</p>
                            <p className="text-xs text-slate-400 mt-1">اضغط &quot;إضافة محل وتوليد رابط&quot; لبدء إضافة محلات جديدة.</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredStores.map((store) => (
                      <tr key={store.id} className="hover:bg-slate-50/60 transition-colors">
                        {/* Name & Phone */}
                        <td className="px-5 py-4">
                          <div className="font-extrabold text-slate-900">{store.name}</div>
                          {store.phone && (
                            <div className="text-xs text-slate-500 mt-0.5" dir="ltr">
                              {store.phone}
                            </div>
                          )}
                          {store.notes && (
                            <div className="text-[11px] text-slate-400 mt-0.5 max-w-xs truncate">
                              {store.notes}
                            </div>
                          )}
                        </td>

                        {/* Custom Link */}
                        <td className="px-5 py-4">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 text-xs text-slate-700 font-mono" dir="ltr">
                            /r/{store.slug}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          {store.status === 'submitted' ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              تم استلام التغطية
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5" />
                              في انتظار الرد
                            </span>
                          )}
                        </td>

                        {/* Dates */}
                        <td className="px-5 py-4 text-xs text-slate-500">
                          {store.submitted_at ? (
                            <div>
                              <div className="font-bold text-slate-800">
                                {new Date(store.submitted_at).toLocaleDateString('ar-EG', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                              <div className="text-[10px] text-slate-400">تاريخ الإرسال</div>
                            </div>
                          ) : (
                            <div>
                              <div>
                                {new Date(store.created_at).toLocaleDateString('ar-EG', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                              <div className="text-[10px] text-slate-400">تاريخ إنشاء الرابط</div>
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Copy Link Button */}
                            <button
                              onClick={() => handleCopyLink(store.slug)}
                              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                copiedSlug === store.slug
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                              title="نسخ الرابط"
                            >
                              {copiedSlug === store.slug ? (
                                <CheckCheck className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            {/* WhatsApp Button */}
                            <button
                              onClick={() => handleWhatsAppShare(store)}
                              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                              title="إرسال واتساب"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>

                            {/* View answers */}
                            {store.status === 'submitted' && (
                              <button
                                onClick={() => handleViewStoreAnswers(store.id)}
                                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors cursor-pointer"
                                title="عرض بيانات التوصيل"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            )}

                            {/* Export CSV for this store */}
                            {store.status === 'submitted' && (
                              <button
                                onClick={() => handleExportStore(store.id, store.name)}
                                disabled={exporting === store.id}
                                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                                title="تصدير Excel للمحل"
                              >
                                {exporting === store.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
                                ) : (
                                  <Download className="w-4 h-4" />
                                )}
                              </button>
                            )}

                            {/* Delete store */}
                            <button
                              onClick={() => handleDeleteStore(store.id, store.name)}
                              className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="حذف المحل"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED SUBMISSIONS & AREAS (Pre-existing enhanced panel) */}
        {activeTab === 'submissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Submissions List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h2 className="font-extrabold text-slate-900 text-sm mb-3">
                    الإرسالات المسجلة ({submissions.length})
                  </h2>
                  <div className="relative">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="البحث باسم المطعم..."
                      className="w-full pr-10 pl-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-[70vh] overflow-y-auto">
                  {filteredSubmissions.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      لا توجد إرسالات مطابقة
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
                              <span className="text-sm font-extrabold text-slate-900 truncate">
                                {sub.restaurant_name || sub.store_slug || 'مطعم غير مسمى'}
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
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleExport(sub.id)
                              }}
                              disabled={exporting === sub.id}
                              className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-100 rounded-xl transition-colors"
                              title="تصدير CSV"
                            >
                              {exporting === sub.id ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Download className="w-4 h-4" />
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

            {/* Detailed Table for Selected Submission */}
            <div className="lg:col-span-2">
              {!selectedId && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm h-80 flex items-center justify-center p-8">
                  <div className="text-center text-slate-400">
                    <StoreIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-bold text-slate-600">اختر إرسالة لعرض تفاصيل مناطق التوصيل</p>
                    <p className="text-xs text-slate-400 mt-1">ستظهر كافة الأحياء والأسعار ومدة التوصيل المحددة.</p>
                  </div>
                </div>
              )}

              {selectedId && loadingDetail && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm h-80 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
              )}

              {selectedId && !loadingDetail && selectedAnswers !== null && (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                  {/* Filters Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-700 font-extrabold">
                        <Filter className="w-4 h-4 text-sky-600" />
                        تصفية:
                      </div>
                      <select
                        value={govFilter}
                        onChange={(e) => setGovFilter(e.target.value)}
                        className="text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="all">كل المحافظات</option>
                        <option value="cairo">القاهرة</option>
                        <option value="giza">الجيزة</option>
                      </select>
                      <select
                        value={availFilter}
                        onChange={(e) => setAvailFilter(e.target.value)}
                        className="text-xs font-bold border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="all">الكل</option>
                        <option value="yes">متاح فقط</option>
                        <option value="no">غير متاح فقط</option>
                      </select>
                      <button
                        onClick={() => handleExport(selectedId)}
                        disabled={exporting === selectedId}
                        className="flex items-center gap-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-2 rounded-xl transition-colors mr-auto cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>تصدير CSV</span>
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={areaSearch}
                        onChange={(e) => setAreaSearch(e.target.value)}
                        placeholder="البحث باسم الحي أو المنطقة..."
                        className="w-full pr-10 pl-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
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
        )}
      </div>

      {/* CREATE STORE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-fade-in relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  إضافة محل جديد وإنشاء رابط مخصص
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStore} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  اسم المحل أو المطعم *
                </label>
                <input
                  type="text"
                  required
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  placeholder="مثال: مطعم الدهان - فرع التجمع"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>رقم هاتف / واتساب المحل</span>
                  <span className="text-[11px] font-normal text-slate-400">اختياري</span>
                </label>
                <input
                  type="text"
                  value={newStorePhone}
                  onChange={(e) => setNewStorePhone(e.target.value)}
                  placeholder="01012345678"
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>ملاحظات إضافية</span>
                  <span className="text-[11px] font-normal text-slate-400">اختياري</span>
                </label>
                <textarea
                  value={newStoreNotes}
                  onChange={(e) => setNewStoreNotes(e.target.value)}
                  rows={2}
                  placeholder="مثال: تم الاتفاق على نسبة التوصيل، الفرع الرئيسي..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm resize-none"
                />
              </div>

              {createError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold">
                  {createError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={creatingStore || !newStoreName.trim()}
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold text-white transition-all shadow-md cursor-pointer ${
                    creatingStore || !newStoreName.trim()
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/25'
                  }`}
                >
                  {creatingStore ? 'جار الإنشاء...' : 'توليد الرابط وحفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
