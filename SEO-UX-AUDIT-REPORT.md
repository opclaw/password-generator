# SEO & UX/UI Audit Report
## Password Generator — https://password-generator.vercel.app

**Audit Date:** 2026-02-26  
**Auditor:** Subagent AI  
**Scope:** Static export (Next.js)

---

## 1. SEO Анализ

### 1.1 Мета-теги — ✅ Частично выполнено

| Элемент | Статус | Комментарий |
|---------|--------|-------------|
| `<title>` | ✅ | "Password Generator — Secure Random Passwords \| Free Tool" — оптимальная длина (~60 символов) |
| `<meta name="description">` | ✅ | Есть, но короткая (~95 символов). Рекомендуется 150-160 |
| `<meta name="viewport">` | ✅ | `width=device-width, initial-scale=1` |
| `<link rel="canonical">` | ❌ **Критично** | Отсутствует! Дублирование контента без каноникала |
| `<meta name="theme-color">` | ❌ | Нет темы для мобильных браузеров |
| `<link rel="icon">` | ⚠️ | Нет явного указания favicon |
| `<link rel="apple-touch-icon">` | ❌ | Нет иконки для iOS |

### 1.2 Open Graph — ⚠️ Неполный

| Тег | Статус |
|-----|--------|
| `og:title` | ✅ |
| `og:description` | ✅ |
| `og:url` | ✅ |
| `og:site_name` | ✅ |
| `og:locale` | ✅ |
| `og:type` | ✅ |
| **`og:image`** | ❌ **Критично** | Отсутствует! Посты в соцсетях будут без превью |
| `og:image:width/height` | ❌ | Нет |

### 1.3 Twitter Card — ⚠️ Неполный

| Тег | Статус |
|-----|--------|
| `twitter:card` | ✅ `summary_large_image` |
| `twitter:title` | ✅ |
| `twitter:description` | ✅ |
| **`twitter:image`** | ❌ **Критично** | Отсутствует! |
| `twitter:site` | ❌ | Нет @username |

### 1.4 Структурированные данные (JSON-LD) — ⚠️ Средний приоритет

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Password Generator",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": "..."
}
```

**Проблемы:**
- ❌ Нет `aggregateRating` — Google требует для SoftwareApplication
- ❌ Нет `reviewCount` — обязательно для rich snippets
- ❌ Нет `softwareVersion`
- ❌ Нет `datePublished` / `dateModified`
- ❌ `featureList` как string вместо массива — менее структурировано

### 1.5 Semantic HTML & Иерархия заголовков — ❌ Проблемы

```
<body>
  <header>
    <h1>Password Generator</h1>     ← H1 #1 (в логотипе)
  </header>
  <section>
    <h2>Password Generator</h2>     ← Должен быть H1
  </section>
  <main>
    ...
  </main>
  <section>
    <h3>Secure</h3>                 ← H3 без H2 родителя
    <h3>Fast</h3>
    <h3>Customizable</h3>
  </section>
</body>
```

**Проблемы:**
- ❌ **Два H1** на странице — нарушение иерархии
- ❌ Hero section использует `<h2>` вместо `<h1>`
- ❌ Features section использует `<h3>` без обёртки в `<h2>`
- ⚠️ `<main>` содержит только форму, без заголовка

### 1.6 Технические файлы — ❌ Отсутствуют

| Файл | Статус | Приоритет |
|------|--------|-----------|
| `robots.txt` | ❌ | **Высокий** — поисковики не знают правила сканирования |
| `sitemap.xml` | ❌ | **Высокий** — нет карты сайта для индексации |
| `manifest.json` | ❌ | Средний — нет PWA-манифеста |

---

## 2. UX/UI Анализ

### 2.1 Визуальная иерархия — ✅ Хорошо

**Плюсы:**
- Чёткое разделение на зоны: header → hero → tool → features → footer
- Использование размеров шрифтов для иерархии
- Белые карточки на сером фоне создают глубину

**Проблемы:**
- ⚠️ Hero section дублирует title из header (визуальный шум)
- ⚠️ Отсутствие breadcrumbs (не критично для одностраничника)

### 2.2 Типографика и контраст — ⚠️ Небольшие проблемы

| Элемент | Размер | Контраст | Статус |
|---------|--------|----------|--------|
| Основной текст | `text-lg` (~18px) | Slate-600 на белом | ✅ Хорошо |
| Заголовки | `text-4xl/5xl` | Slate-900 | ✅ Отлично |
| Password display | `text-2xl` monospace | Белый на slate-900 | ✅ Отлично |
| Подписи | `text-sm` | Slate-500 | ⚠️ Минимальный контраст (4.5:1 граничный) |
| Footer | `text-sm` | Slate-400 на slate-900 | ❌ **Контраст ~3.5:1, ниже WCAG AA** |

### 2.3 Отступы и сетка — ✅ Хорошо

- ✅ Консистентные `px-4 sm:px-6 lg:px-8` отступы
- ✅ `max-w-7xl` центрирование контента
- ✅ `gap-3`, `gap-6` консистентные промежутки
- ✅ `py-12 md:py-16` адаптивные вертикальные отступы

### 2.4 Интерактивные состояния — ⚠️ Частично

| Элемент | Hover | Focus | Active | Disabled |
|---------|-------|-------|--------|----------|
| Кнопка Generate | ✅ `hover:bg-red-700` | ❌ Нет `focus-visible` | ❌ Нет | ❌ Нет |
| Чекбоксы | ✅ `hover:bg-slate-100` | ✅ `focus:ring-indigo-500` | — | — |
| Range slider | ❌ Нет | ❌ Нет | — | — |
| Copy button | ✅ `btn-ghost` стили | ✅ | ❌ | ❌ |

**Критично:**
- ❌ **Несоответствие стилей:** Кнопка "Generate" использует `bg-red-600`, но класс `.btn-primary` определён как `bg-indigo-600` в globals.css

### 2.5 Accessibility (A11y) — ❌ Серьёзные проблемы

| Проверка | Статус | Комментарий |
|----------|--------|-------------|
| Skip-to-content | ❌ | Нет ссылки для обхода навигации |
| ARIA-labels | ❌ | Кнопка копирования без `aria-label` |
| aria-live | ❌ | Пароль не анонсируется скринридерам при генерации |
| aria-pressed | ❌ | Чекбоксы без состояний для скринридеров |
| alt текст для эмодзи | ❌ | `🔐 ⚡ 🎯` без `aria-hidden` или `role="img"` |
| Focus trap | ⚠️ | Модальных окон нет, но copy-уведомление не фокусируется |
| Color-only info | ❌ | Индикатор "Weak/Medium/Strong" только цветом |

### 2.6 Мобильная адаптивность — ✅ Хорошо

```
Breakpoints:
- Mobile: < 640px (default)
- Tablet: sm: (640px+)
- Desktop: md: (768px+), lg: (1024px+)
```

**Плюсы:**
- ✅ `text-4xl md:text-5xl` адаптивные шрифты
- ✅ `grid-cols-2` → `md:grid-cols-3` для features
- ✅ `break-all` для длинных паролей
- ✅ Touch-friendly размеры чекбоксов (w-5 h-5 = 20px) — минимум 44px рекомендуется

**Проблемы:**
- ⚠️ Чекбоксы 20×20px меньше рекомендуемых 44×44px для тача
- ⚠️ Range slider может быть трудно управлять на мобильных

---

## 3. Приоритезация исправлений

### 🔴 Критичный приоритет (SEO/Юзабилити блокеры)

1. **Добавить og:image и twitter:image** — соцсети показывают пустые превью
2. **Исправить иерархию H1-H6** — только один H1 на странице
3. **Создать robots.txt** — блокирует нормальную индексацию
4. **Создать sitemap.xml** — помогает поисковикам находить страницы
5. **Добавить canonical URL** — предотвращает дублирование
6. **Добавить aria-live для пароля** — скринридеры не видят результат

### 🟡 Средний приоритет (улучшение ранжирования/доступности)

7. **Дополнить JSON-LD** — aggregateRating, reviewCount
8. **Исправить контраст footer** — slate-400 на slate-900
9. **Добавить aria-labels** — для кнопок без текста
10. **Добавить theme-color** — для мобильного браузера
11. **Увеличить touch targets** — чекбоксы до 44px
12. **Добавить focus-visible states** — для клавиатурной навигации

### 🟢 Низкий приоритет (nice to have)

13. **Добавить PWA manifest.json**
14. **Добавить apple-touch-icon**
15. **Расширить meta description** до 150-160 символов
16. **Убрать keywords** — устаревший мета-тег
17. **Добавить hreflang** — если планируется мультиязычность

---

## 4. Рекомендуемые изменения кода

### layout.tsx — исправления

```tsx
export const metadata: Metadata = {
  // ... существующее ...
  alternates: {
    canonical: 'https://password-generator.vercel.app/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#f8fafc', // slate-50
  },
  openGraph: {
    // ... существующее ...
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Password Generator Preview',
    }],
  },
  twitter: {
    // ... существующее ...
    images: ['/og-image.png'],
  },
}
```

### page.tsx — исправления структуры

```tsx
// Hero section — изменить h2 на h1
<section>
  <h1 className="text-4xl md:text-5xl font-bold">...</h1>
</section>

// Header — убрать h1 или заменить на span
<header>
  <span className="text-xl font-bold">...</span>
</header>

// Features — добавить h2 обёртку
<section>
  <h2 className="sr-only">Features</h2> {/* скрытый заголовок */}
  <div className="grid md:grid-cols-3">
    <div>
      <h3>Secure</h3> {/* теперь валидно */}
    </div>
  </div>
</section>
```

### Добавить файлы в public/

```
public/
├── robots.txt          # User-agent: *\nAllow: /\nSitemap: https://.../sitemap.xml
├── sitemap.xml         # XML sitemap
├── manifest.json       # PWA manifest
├── og-image.png        # 1200x630 Open Graph image
├── favicon.ico
└── apple-touch-icon.png
```

---

## 5. Резюме

| Категория | Оценка | Примечание |
|-----------|--------|------------|
| **SEO Технический** | ⚠️ 6/10 | Нет критичных файлов, неполные OG/Twitter tags |
| **SEO Контент** | ✅ 8/10 | Хорошие title/description |
| **Semantic HTML** | ⚠️ 5/10 | Проблемы с иерархией заголовков |
| **Accessibility** | ❌ 4/10 | Нет ARIA, плохой контраст, нет skip-links |
| **Визуальный дизайн** | ✅ 8/10 | Чистый, современный интерфейс |
| **Адаптивность** | ✅ 8/10 | Хорошие breakpoints |
| **Интерактивность** | ⚠️ 6/10 | Нестабильные focus states, несоответствие стилей |

**Общая оценка: 6.4/10**

---

*Report generated by OpenClaw Subagent*
