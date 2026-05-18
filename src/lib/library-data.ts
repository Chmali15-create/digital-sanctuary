import type { Localized } from "./i18n";

const SAMPLE_PDFS = [
  "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  "https://arxiv.org/pdf/1706.03762.pdf",
  "https://www.africau.edu/images/default/sample.pdf",
];
const pickPdf = (i: number) => SAMPLE_PDFS[i % SAMPLE_PDFS.length];

export interface Topic {
  id: string;
  title: Localized;
  description: Localized;
  count: number;
}

export interface Book {
  id: string;
  title: Localized;
  author: Localized;
  year: number;
  pages: number;
  topicId: string;
  pdfUrl: string;
  accent: string;
}

export interface Sermon {
  id: string;
  title: Localized;
  preacher: Localized;
  referenceBook: Localized;
  pageNumber: number;
  topicId: string;
  pdfUrl: string;
  duration: Localized;
}

const L = (en: string, ur: string, ar: string): Localized => ({ en, ur, ar });

export const bookTopics: Topic[] = [
  { id: "theology",   title: L("Systematic Theology", "علم الٰہیات", "اللاهوت المنهجي"),
    description: L("Foundations of doctrine and faith", "عقیدہ و ایمان کی بنیادیں", "أسس العقيدة والإيمان"), count: 12 },
  { id: "philosophy", title: L("Classical Philosophy", "کلاسیکی فلسفہ", "الفلسفة الكلاسيكية"),
    description: L("Ancient thought and reasoning", "قدیم فکر و استدلال", "الفكر القديم والاستدلال"), count: 9 },
  { id: "history",    title: L("Sacred History", "مقدس تاریخ", "التاريخ المقدس"),
    description: L("Chronicles of faith and civilization", "ایمان و تہذیب کی داستانیں", "سجلات الإيمان والحضارة"), count: 14 },
  { id: "poetry",     title: L("Mystical Poetry", "روحانی شاعری", "الشعر الصوفي"),
    description: L("Verses of the soul and divine", "روح اور الٰہی کے اشعار", "أبيات الروح والإلهي"), count: 7 },
  { id: "wisdom",     title: L("Wisdom Literature", "حکمت کا ادب", "أدب الحكمة"),
    description: L("Proverbs, parables, and meditations", "امثال، حکایات اور تفکرات", "أمثال وحكايات وتأملات"), count: 11 },
  { id: "leadership", title: L("Spiritual Leadership", "روحانی قیادت", "القيادة الروحية"),
    description: L("Pastoral and moral guidance", "رہنمائی و اخلاقی ہدایت", "إرشاد رعوي وأخلاقي"), count: 8 },
];

export const sermonTopics: Topic[] = [
  { id: "faith",   title: L("Faith & Trust", "ایمان و توکل", "الإيمان والتوكل"),
    description: L("Anchoring the soul in conviction", "روح کو یقین میں جما دینا", "تثبيت الروح في اليقين"), count: 18 },
  { id: "grace",   title: L("Grace & Redemption", "فضل و نجات", "النعمة والفداء"),
    description: L("The unmerited gift", "بے بہا تحفہ", "العطية بلا استحقاق"), count: 15 },
  { id: "prayer",  title: L("The Inner Life of Prayer", "دعا کی باطنی زندگی", "حياة الصلاة الداخلية"),
    description: L("Communion and contemplation", "ہمراہی و تفکر", "المناجاة والتأمل"), count: 12 },
  { id: "service", title: L("Service & Compassion", "خدمت و رحم دلی", "الخدمة والرحمة"),
    description: L("Love made visible", "محبت کا اظہار", "المحبة المُجسَّدة"), count: 10 },
  { id: "hope",    title: L("Hope in Trials", "آزمائش میں امید", "الرجاء في المحن"),
    description: L("Light through the valley", "وادی میں روشنی", "نور في الوادي"), count: 14 },
  { id: "wisdom",  title: L("Wisdom for Today", "آج کے لیے حکمت", "حكمة لليوم"),
    description: L("Ancient truths, modern lives", "قدیم حقائق، جدید زندگیاں", "حقائق قديمة لحياة معاصرة"), count: 9 },
];

const accents = ["#c9a44c", "#a8763e", "#8e5b3a", "#b88a3e", "#c98f4c", "#9c6b35"];

interface BookSeed { id: string; title: Localized; author: Localized; year: number; pages: number; topicId: string; }
const bookSeed: BookSeed[] = [
  { id: "b1",  title: L("The Weight of Glory", "جلال کا بوجھ", "ثِقَل المجد"),                 author: L("C. S. Aurelius", "سی۔ ایس۔ اوریلیئس", "سي. إس. أوريليوس"), year: 1949, pages: 218, topicId: "theology" },
  { id: "b2",  title: L("Confessions of the Eternal", "ابدی کے اعترافات", "اعترافات الأبدي"), author: L("A. Hippo", "اے۔ ہپو", "أ. هيبو"),                              year: 397,  pages: 412, topicId: "theology" },
  { id: "b3",  title: L("Summa Brevis", "خلاصۂ مختصر", "الخلاصة الموجزة"),                     author: L("T. Aquinata", "ٹی۔ ایکوینا", "ت. أكويناتا"),                    year: 1274, pages: 624, topicId: "theology" },
  { id: "b4",  title: L("Meditations on First Cause", "اولین سبب پر تفکرات", "تأملات في العلة الأولى"), author: L("R. Descartesian", "آر۔ دیکارتین", "ر. ديكارتسي"), year: 1641, pages: 184, topicId: "philosophy" },
  { id: "b5",  title: L("The Republic of Souls", "روحوں کی جمہوریہ", "جمهورية الأرواح"),       author: L("Plato of Athens", "افلاطون آتھنز", "أفلاطون الأثيني"),        year: -380, pages: 360, topicId: "philosophy" },
  { id: "b6",  title: L("Nicomachean Virtues", "نیکومیخیائی فضائل", "الفضائل النيقوماخية"),    author: L("Aristotle", "ارسطو", "أرسطو"),                                  year: -340, pages: 298, topicId: "philosophy" },
  { id: "b7",  title: L("Chronicles of the Reformation", "اصلاح کی داستانیں", "سجلات الإصلاح"), author: L("M. Wittenberg", "ایم۔ وٹن برگ", "م. ويتنبرغ"),                  year: 1546, pages: 540, topicId: "history" },
  { id: "b8",  title: L("The Desert Fathers", "صحرا کے بزرگ", "آباء الصحراء"),                 author: L("Anonymous", "گمنام", "مجهول"),                                  year: 350,  pages: 220, topicId: "history" },
  { id: "b9",  title: L("Songs of the Beloved", "محبوب کے گیت", "أناشيد الحبيب"),              author: L("J. of the Cross", "جے۔ آف دی کراس", "يوحنا الصليب"),            year: 1578, pages: 142, topicId: "poetry" },
  { id: "b10", title: L("The Divine Comedy", "الٰہی مزاحیہ", "الكوميديا الإلهية"),             author: L("Dante Alighieri", "دانتے الیگیری", "دانتي أليغييري"),            year: 1320, pages: 798, topicId: "poetry" },
  { id: "b11", title: L("The Imitation", "اقتدا", "الاقتداء"),                                  author: L("T. à Kempis", "ٹی۔ کیمپس", "ت. أكمبيس"),                         year: 1418, pages: 256, topicId: "wisdom" },
  { id: "b12", title: L("Pensées", "افکار", "أفكار"),                                          author: L("B. Pascal", "بی۔ پاسکل", "ب. باسكال"),                          year: 1670, pages: 312, topicId: "wisdom" },
  { id: "b13", title: L("The Rule", "ضابطہ", "القاعدة"),                                       author: L("Benedict of Nursia", "بینیڈکٹ نُرسیا", "بنديكت النورسي"),       year: 530,  pages: 96,  topicId: "leadership" },
  { id: "b14", title: L("Pastoral Care", "رعایتی نگہداشت", "الرعاية الرعوية"),                 author: L("Gregory the Great", "گریگوری اعظم", "غريغوريوس الكبير"),         year: 590,  pages: 174, topicId: "leadership" },
];

export const books: Book[] = bookSeed.map((b, i) => ({
  ...b,
  pdfUrl: pickPdf(i),
  accent: accents[i % accents.length],
}));

interface SermonSeed { id: string; title: Localized; preacher: Localized; referenceBook: Localized; pageNumber: number; topicId: string; duration: Localized; }
const D = (mins: number): Localized => L(`${mins} min`, `${mins} منٹ`, `${mins} دقيقة`);

const sermonSeed: SermonSeed[] = [
  { id: "s1",  title: L("The Unshakable Anchor", "اٹل لنگر", "المرساة الراسخة"),
    preacher: L("Rev. E. Hartwell", "ریورنڈ ای۔ ہارٹویل", "القس إ. هارتويل"),
    referenceBook: L("The Weight of Glory", "جلال کا بوجھ", "ثِقَل المجد"), pageNumber: 42, topicId: "faith", duration: D(38) },
  { id: "s2",  title: L("When the Mountain Will Not Move", "جب پہاڑ نہ ہلے", "حين لا يتزحزح الجبل"),
    preacher: L("Rev. M. Brennan", "ریورنڈ ایم۔ برینن", "القس م. برينان"),
    referenceBook: L("Confessions of the Eternal", "ابدی کے اعترافات", "اعترافات الأبدي"), pageNumber: 118, topicId: "faith", duration: D(45) },
  { id: "s3",  title: L("Mustard Seed Faith", "رائی کے دانے جتنا ایمان", "إيمان بحجم حبة الخردل"),
    preacher: L("Rev. E. Hartwell", "ریورنڈ ای۔ ہارٹویل", "القس إ. هارتويل"),
    referenceBook: L("Pensées", "افکار", "أفكار"), pageNumber: 87, topicId: "faith", duration: D(29) },
  { id: "s4",  title: L("Grace That Finds Us", "وہ فضل جو ہمیں ڈھونڈ نکالے", "النعمة التي تجدنا"),
    preacher: L("Rev. J. Caldwell", "ریورنڈ جے۔ کالڈویل", "القس ج. كالدويل"),
    referenceBook: L("Summa Brevis", "خلاصۂ مختصر", "الخلاصة الموجزة"), pageNumber: 204, topicId: "grace", duration: D(41) },
  { id: "s5",  title: L("The Prodigal Father", "فیاض باپ", "الأب الكريم"),
    preacher: L("Rev. M. Brennan", "ریورنڈ ایم۔ برینن", "القس م. برينان"),
    referenceBook: L("The Imitation", "اقتدا", "الاقتداء"), pageNumber: 73, topicId: "grace", duration: D(35) },
  { id: "s6",  title: L("Stillness Before the Throne", "تخت کے سامنے سکوت", "السكون أمام العرش"),
    preacher: L("Rev. A. Whitfield", "ریورنڈ اے۔ وائٹ فیلڈ", "القس أ. ويتفيلد"),
    referenceBook: L("Songs of the Beloved", "محبوب کے گیت", "أناشيد الحبيب"), pageNumber: 56, topicId: "prayer", duration: D(27) },
  { id: "s7",  title: L("The Lord's Pattern", "رب کا نمونہ", "نمط الرب"),
    preacher: L("Rev. J. Caldwell", "ریورنڈ جے۔ کالڈویل", "القس ج. كالدويل"),
    referenceBook: L("The Rule", "ضابطہ", "القاعدة"), pageNumber: 22, topicId: "prayer", duration: D(33) },
  { id: "s8",  title: L("Hands That Heal", "شفا بخش ہاتھ", "أيادٍ تشفي"),
    preacher: L("Rev. A. Whitfield", "ریورنڈ اے۔ وائٹ فیلڈ", "القس أ. ويتفيلد"),
    referenceBook: L("Pastoral Care", "رعایتی نگہداشت", "الرعاية الرعوية"), pageNumber: 91, topicId: "service", duration: D(30) },
  { id: "s9",  title: L("The Cup of Cold Water", "ٹھنڈے پانی کا پیالہ", "كأس الماء البارد"),
    preacher: L("Rev. E. Hartwell", "ریورنڈ ای۔ ہارٹویل", "القس إ. هارتويل"),
    referenceBook: L("The Desert Fathers", "صحرا کے بزرگ", "آباء الصحراء"), pageNumber: 134, topicId: "service", duration: D(26) },
  { id: "s10", title: L("Through the Valley", "وادی سے گزرتے ہوئے", "عبر الوادي"),
    preacher: L("Rev. M. Brennan", "ریورنڈ ایم۔ برینن", "القس م. برينان"),
    referenceBook: L("The Divine Comedy", "الٰہی مزاحیہ", "الكوميديا الإلهية"), pageNumber: 312, topicId: "hope", duration: D(44) },
  { id: "s11", title: L("Morning Will Come", "صبح آئے گی", "سيأتي الصباح"),
    preacher: L("Rev. A. Whitfield", "ریورنڈ اے۔ وائٹ فیلڈ", "القس أ. ويتفيلد"),
    referenceBook: L("Meditations on First Cause", "اولین سبب پر تفکرات", "تأملات في العلة الأولى"), pageNumber: 65, topicId: "hope", duration: D(37) },
  { id: "s12", title: L("Wisdom in the Marketplace", "بازار میں حکمت", "حكمة في السوق"),
    preacher: L("Rev. J. Caldwell", "ریورنڈ جے۔ کالڈویل", "القس ج. كالدويل"),
    referenceBook: L("Nicomachean Virtues", "نیکومیخیائی فضائل", "الفضائل النيقوماخية"), pageNumber: 142, topicId: "wisdom", duration: D(32) },
];

export const sermons: Sermon[] = sermonSeed.map((s, i) => ({ ...s, pdfUrl: pickPdf(i + 1) }));

export const getBookTopic    = (id: string) => bookTopics.find((t) => t.id === id);
export const getSermonTopic  = (id: string) => sermonTopics.find((t) => t.id === id);
export const getBook         = (id: string) => books.find((b) => b.id === id);
export const getSermon       = (id: string) => sermons.find((s) => s.id === id);
export const getBooksByTopic   = (topicId: string) => books.filter((b) => b.topicId === topicId);
export const getSermonsByTopic = (topicId: string) => sermons.filter((s) => s.topicId === topicId);
