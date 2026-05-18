import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ur" | "ar";

export interface Localized {
  en: string;
  ur: string;
  ar: string;
}

export const LANGS: { code: Lang; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ur", label: "Urdu", native: "اردو", dir: "rtl" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

export const UI: Record<string, Localized> = {
  brand: {
    en: "Lumen Library · Est. MMXXVI",
    ur: "لیومن لائبریری · قائم شدہ ۲۰۲۶",
    ar: "مكتبة لومن · تأسست ٢٠٢٦",
  },
  heroTitle1: { en: "A sanctuary of", ur: "ایک پناہ گاہ", ar: "ملاذ" },
  heroTitleAccent: { en: "timeless", ur: "ابدی", ar: "خالد" },
  heroTitle2: { en: "words and voices.", ur: "الفاظ و آوازوں کی۔", ar: "للكلمات والأصوات." },
  heroSubtitle: {
    en: "Read curated sacred books and listen to indexed sermons — all delivered instantly into an integrated, in-app reading room.",
    ur: "منتخب مقدس کتابیں پڑھیں اور فہرست شدہ خطبات سنیں — سب کچھ ایپ کے اندر ایک خوبصورت مطالعہ کے کمرے میں۔",
    ar: "اقرأ كتبًا مقدسة مختارة واستمع إلى خطب مفهرسة — كل ذلك يُقدَّم فورًا في غرفة قراءة متكاملة داخل التطبيق.",
  },
  sectionOne: { en: "Section One", ur: "حصہ اول", ar: "القسم الأول" },
  sectionTwo: { en: "Section Two", ur: "حصہ دوم", ar: "القسم الثاني" },
  books: { en: "Books", ur: "کتابیں", ar: "الكتب" },
  sermons: { en: "Sermons", ur: "خطبات", ar: "الخطب" },
  booksDesc: {
    en: "A curated index of classical theology, philosophy, and wisdom — browsed by topic and read inside the app.",
    ur: "کلاسیکی الٰہیات، فلسفہ اور حکمت کی منتخب فہرست — موضوع کے لحاظ سے دیکھیں اور ایپ میں پڑھیں۔",
    ar: "فهرس مختار للاهوت الكلاسيكي والفلسفة والحكمة — تُتصفح حسب الموضوع وتُقرأ داخل التطبيق.",
  },
  sermonsDesc: {
    en: "Indexed sermons with their source book and exact page — opened directly to the passage that inspired them.",
    ur: "خطبات اپنی ماخذ کتاب اور صفحہ نمبر کے ساتھ — براہ راست متعلقہ اقتباس پر کھلتے ہیں۔",
    ar: "خطب مفهرسة مع كتابها المصدر ورقم الصفحة الدقيق — تُفتح مباشرة على المقطع الملهم.",
  },
  enterIndex: { en: "Enter the index", ur: "فہرست میں داخل ہوں", ar: "ادخل الفهرس" },
  footer: { en: "Read · Reflect · Return", ur: "پڑھیں · غور کریں · لوٹیں", ar: "اقرأ · تأمّل · عُد" },
  topicsIndex: { en: "The index of topics", ur: "موضوعات کی فہرست", ar: "فهرس المواضيع" },
  topicsIndexAccent: { en: "index", ur: "فہرست", ar: "الفهرس" },
  topicsIntro: {
    en: "Choose a subject to reveal the works gathered beneath it.",
    ur: "موضوع منتخب کریں تاکہ اس کے تحت جمع کی گئی تخلیقات سامنے آئیں۔",
    ar: "اختر موضوعًا لتظهر الأعمال المجموعة تحته.",
  },
  themesForSoul: { en: "Themes for the soul", ur: "روح کے موضوعات", ar: "مواضيع للروح" },
  themesAccent: { en: "soul", ur: "روح", ar: "الروح" },
  themesIntro: {
    en: "Each theme opens to sermons indexed with their source book and page.",
    ur: "ہر موضوع کے تحت خطبات اپنی ماخذ کتاب اور صفحے کے ساتھ درج ہیں۔",
    ar: "يفتح كل موضوع على خطب مفهرسة مع كتابها المصدر وصفحتها.",
  },
  volumes: { en: "Volumes", ur: "جلدیں", ar: "مجلدات" },
  sermonsCount: { en: "Sermons", ur: "خطبات", ar: "خطب" },
  read: { en: "Read", ur: "پڑھیں", ar: "اقرأ" },
  open: { en: "Open", ur: "کھولیں", ar: "افتح" },
  pages: { en: "pages", ur: "صفحات", ar: "صفحات" },
  page: { en: "p.", ur: "ص.", ar: "ص." },
  ref: { en: "Ref.", ur: "حوالہ", ar: "المرجع" },
  back: { en: "Back", ur: "واپس", ar: "رجوع" },
  booksTopic: { en: "Books · Topic", ur: "کتابیں · موضوع", ar: "كتب · موضوع" },
  sermonsTopic: { en: "Sermons · Topic", ur: "خطبات · موضوع", ar: "خطب · موضوع" },
  sectionILibrary: { en: "Section I — The Library", ur: "حصہ اول — لائبریری", ar: "القسم الأول — المكتبة" },
  sectionIIVoice: { en: "Section II — The Voice", ur: "حصہ دوم — آواز", ar: "القسم الثاني — الصوت" },
  loading: { en: "Preparing your reading…", ur: "آپ کا مطالعہ تیار کیا جا رہا ہے…", ar: "نُحضّر قراءتك…" },
  fetching: { en: "Fetching", ur: "حاصل کیا جا رہا ہے", ar: "جارٍ التحميل" },
  unableLoad: { en: "Unable to load this PDF", ur: "یہ PDF لوڈ نہیں ہو سکی", ar: "تعذّر تحميل ملف PDF" },
  tryDirect: { en: "Try direct link", ur: "براہ راست لنک آزمائیں", ar: "جرّب الرابط المباشر" },
  bc: { en: "BC", ur: "ق.م", ar: "ق.م" },
  notFoundTopic: { en: "Topic not found", ur: "موضوع نہیں ملا", ar: "الموضوع غير موجود" },
  notFoundBook: { en: "Book not found", ur: "کتاب نہیں ملی", ar: "الكتاب غير موجود" },
  notFoundSermon: { en: "Sermon not found", ur: "خطبہ نہیں ملا", ar: "الخطبة غير موجودة" },
  language: { en: "Language", ur: "زبان", ar: "اللغة" },
};

interface I18nCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: keyof typeof UI) => string;
  tr: (v: Localized | string | undefined) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved && LANGS.some((l) => l.code === saved)) setLangState(saved);
  }, []);

  const dir = LANGS.find((l) => l.code === lang)!.dir;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.dataset.lang = lang;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };

  const t = (key: keyof typeof UI) => UI[key]?.[lang] ?? UI[key]?.en ?? String(key);
  const tr = (v: Localized | string | undefined) => {
    if (!v) return "";
    if (typeof v === "string") return v;
    return v[lang] ?? v.en;
  };

  return <Ctx.Provider value={{ lang, dir, setLang, t, tr }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}