import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'لوحة الإدارة | مناطق التوصيل',
  description: 'لوحة تحكم الإدارة لمراجعة بيانات مناطق التوصيل',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      {children}
    </div>
  )
}
