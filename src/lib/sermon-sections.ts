import { SERMON_TOPICS, type SermonTopicEntry } from "./sermon-topics-full";

// Ordered list of top-level section TOC IDs from the index document.
// Each section's subtopics are all entries between this ID and the next.
export const SECTION_IDS: string[] = [
  "_Toc29194034", // ایمانیات (عقائد و نظریات)
  "_Toc29194059", // عبادات
  "_Toc29194082", // معاملات
  "_Toc29194138", // آداب معاشرت / آداب انسانیت
  "_Toc29194161", // آداب
  "_Toc29194175", // اخلاق و صفات حسنہ
  "_Toc29194201", // اخلاق و صفات سیئہ
  "_Toc29194266", // ذکر و فکر
  "_Toc29194057", // عمل
  "_Toc45012053", // اصلاح و تزکیہ اور مسائل سلوک
  "_Toc45012074", // شخصیات و اکابر
  "_Toc45012075", // سیرت آنحضرتﷺ
  "_Toc29194285", // انبیاء علیہم السلام
  "_Toc29194296", // صحابہ و صحابیات
  "_Toc29194297", // اکابرین و اولیاء
  "_Toc29194310", // مہینے و ایام
  "_Toc29194322", // خطبہ
  "_Toc45012142", // جدیدیات و فکریات
  "_Toc29194251", // اسلامی نظام اور امت مسلمہ
  "_Toc45012162", // تفسیر سور وآیات
  "_Toc29194345", // خواتیم و دروس
  "_Toc29194090", // تعلیم و تعلم
  "_Toc45012186", // ادیان و مذاہب
  "_Toc45012198", // متفرقات
];

const SECTION_SET = new Set(SECTION_IDS);

export interface SermonSection {
  section: SermonTopicEntry;
  items: SermonTopicEntry[];
}

let cached: SermonSection[] | null = null;

export function getSermonSections(): SermonSection[] {
  if (cached) return cached;
  // Build index → position map
  const positionById = new Map<string, number>();
  SERMON_TOPICS.forEach((t, i) => positionById.set(t.id, i));

  // Order sections by their actual position in SERMON_TOPICS so ranges are contiguous.
  const ordered = [...SECTION_IDS]
    .filter((id) => positionById.has(id))
    .sort((a, b) => (positionById.get(a) ?? 0) - (positionById.get(b) ?? 0));

  const result: SermonSection[] = ordered.map((id, idx) => {
    const start = positionById.get(id)!;
    const nextId = ordered[idx + 1];
    const end = nextId ? positionById.get(nextId)! : SERMON_TOPICS.length;
    const slice = SERMON_TOPICS.slice(start + 1, end);
    return {
      section: SERMON_TOPICS[start],
      items: slice.filter((t) => !SECTION_SET.has(t.id)),
    };
  });

  cached = result;
  return result;
}

export function isSermonSection(id: string): boolean {
  return SECTION_SET.has(id);
}

export function getSermonSection(id: string): SermonSection | undefined {
  return getSermonSections().find((s) => s.section.id === id);
}
