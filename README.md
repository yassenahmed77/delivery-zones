# مراجعة مناطق التوصيل — Delivery Zones Review

نظام كامل لمراجعة مناطق التوصيل للمطاعم — Arabic RTL · Next.js · Supabase

---

## ما الذي تم بناؤه

| المكون | الوصف |
|--------|--------|
| نموذج عام (Arabic RTL) | يعرض المحافظات والمناطق والمناطق الفرعية بشكل هرمي |
| شاشة الترحيب | يمكن للمطعم إدخال اسمه ثم بدء المراجعة |
| منطق الشرط | إذا كان التوصيل غير متاح للمنطقة الرئيسية، يتم تخطي جميع المناطق الفرعية |
| مراجعة وإرسال | المستخدم يراجع الإجابات قبل الإرسال |
| لوحة الإدارة (/admin) | مشمية بالمصادقة، تعرض الإرسالات، تدعم التصفية والبحث والتصدير CSV |
| تصدير CSV | UTF-8 مع BOM لدعم Excel وأسماء المناطق بالعربية |
| Supabase | قاعدة بيانات مع RLS — الجمهور يرسل فقط، الإدارة تقرأ |

---

## متطلبات الإعداد

### 1. إنشاء مشروع Supabase

1. اذهب إلى [supabase.com](https://supabase.com) وسجّل دخولك
2. انقر **New Project**
3. أدخل اسم المشروع وكلمة مرور قاعدة البيانات
4. اختر المنطقة الأقرب إليك (مثلاً: EU West)
5. انتظر حتى يكتمل الإعداد (دقيقتان تقريباً)

### 2. تنفيذ SQL Schema

1. داخل مشروع Supabase، اذهب إلى **SQL Editor**
2. انقر **New Query**
3. الصق محتوى ملف `supabase/schema.sql` كاملاً
4. انقر **Run**

### 3. الحصول على بيانات الاعتماد

1. داخل مشروع Supabase، اذهب إلى **Project Settings → API**
2. انسخ **Project URL** → ضعه في `NEXT_PUBLIC_SUPABASE_URL`
3. انسخ **anon public key** → ضعه في `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. إنشاء حساب الإدارة

1. اذهب إلى **Authentication → Users** في Supabase
2. انقر **Add User → Create New User**
3. أدخل بريد إلكتروني وكلمة مرور للأدمين
4. ستستخدم هذه البيانات لتسجيل الدخول عبر `/admin/login`

---

## تشغيل المشروع محلياً

```bash
# 1. انسخ ملف البيئة
cp .env.example .env.local

# 2. أضف بياناتك في .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# 3. شغّل الخادم المحلي
npm run dev
```

افتح المتصفح على: http://localhost:3000

---

## النشر على Vercel

```bash
# 1. ثبّت Vercel CLI (اختياري)
npm i -g vercel

# 2. سجّل دخولك
vercel login

# 3. انشر
vercel --prod
```

**أو عبر واجهة Vercel:**
1. اذهب إلى [vercel.com](https://vercel.com)
2. انقر **New Project**
3. اربط مستودع GitHub/GitLab الخاص بك
4. أضف متغيرات البيئة في **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. انقر **Deploy**

---

## الروابط بعد النشر

| الصفحة | الرابط |
|--------|--------|
| نموذج المطعم العام | `https://your-project.vercel.app/` |
| لوحة الإدارة | `https://your-project.vercel.app/admin` |
| تسجيل دخول الإدارة | `https://your-project.vercel.app/admin/login` |

---

## تعديل المناطق

لإضافة أو حذف أو تعديل المناطق، قم بتعديل الملف:

```
data/deliveryAreas.ts
```

بنية البيانات واضحة ومُوثَّقة داخل الملف.

---

## الأمان

- المستخدمون العامون **يستطيعون فقط إرسال** بيانات (INSERT) عبر سياسة RLS
- المستخدمون العامون **لا يستطيعون قراءة** بيانات الآخرين
- لوحة الإدارة محمية بـ Supabase Auth
- Middleware يعيد التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مصادَقاً
- لا يوجد service role key في الكود الأمامي
