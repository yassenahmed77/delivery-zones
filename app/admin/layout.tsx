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
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 font-arabic antialiased">
        {children}
      </body>
    </html>
  )
}

