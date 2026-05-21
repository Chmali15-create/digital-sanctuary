// Sub-sections shown when the user opens "ایمان" (imn_01).
import type { Localized } from "@/lib/i18n";

export interface ImanSubtopic {
  id: string;
  title: Localized;
  reference?: string;
  pdfUrl?: string;
  pdfPage?: number;
  /**
   * Front-matter offset: how many pages precede the book's own page 1
   * inside the PDF (cover + TOC etc). Our UI always treats the very
   * first page of the PDF as "Page 1".
   */
  pdfPageOffset?: number;
}

export const IMAN_PARENT_ID = "imn_01";

export const IMAN_SUBTOPICS: ImanSubtopic[] = [
  { id: "imn1_01", title: { ur: "تفصیل الدین (ایمان وعمل)", en: "Detail of Deen (Faith & Action)", ar: "تفصيل الدين (الإيمان والعمل)" }, reference: "خطبات حکیم الامت: 3/48", pdfUrl: "https://raw.githubusercontent.com/Chmali15-create/digital-sanctuary/main/public/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf", pdfPage: 48, pdfPageOffset: 1 },
  { id: "imn1_02", title: { ur: "شرط الایمان", en: "Condition of Faith", ar: "شرط الإيمان" }, reference: "خطبات حکیم الامت: 6/176" },
  { id: "imn1_03", title: { ur: "شعب الایمان", en: "Branches of Faith", ar: "شعب الإيمان" }, reference: "خطبات حکیم الامت: 6/195" },
  { id: "imn1_04", title: { ur: "المودۃ الرحمانیہ (ایمان و عمل صالح کا ثمرہ: مودت)", en: "Divine Love: Fruit of Faith & Good Deeds", ar: "المودة الرحمانية (ثمرة الإيمان والعمل الصالح)" }, reference: "خطبات حکیم الامت: 14/354" },
  { id: "imn1_05", title: { ur: "طریق الاقرب (قرب الہی کا ذریعہ: ایمان و عمل صالح)", en: "Path of Nearness to Allah: Faith & Good Deeds", ar: "طريق القرب (الإيمان والعمل الصالح)" }, reference: "خطبات حکیم الامت: 15/113" },
  { id: "imn1_06", title: { ur: "ایمان کی حقیقت اور اس کی شناخت", en: "Reality of Faith and Its Recognition", ar: "حقيقة الإيمان وتعريفه" }, reference: "خطبات جمعہ و عیدین: 103" },
  { id: "imn1_07", title: { ur: "ایمان کی کسوٹی", en: "Touchstone of Faith", ar: "محك الإيمان" }, reference: "خطبات مودودی: 70" },
  { id: "imn1_08", title: { ur: "شعب الایمان", en: "Branches of Faith", ar: "شعب الإيمان" }, reference: "خطبات حکیم الاسلام: 3/225" },
  { id: "imn1_09", title: { ur: "حیوٰۃ طیبہ (ایمانی زندگی، عقل)", en: "Pure Life (Life of Faith & Reason)", ar: "الحياة الطيبة (حياة الإيمان والعقل)" }, reference: "خطبات حکیم الاسلام: 3/351" },
  { id: "imn1_10", title: { ur: "ایمان کی حفاظت۔ فتنوں کے دور میں", en: "Protecting Faith in Times of Tribulation", ar: "حفظ الإيمان في زمن الفتن" }, reference: "اسلامی تعلیمات: 127" },
  { id: "imn1_11", title: { ur: "ایمان سب سے بڑی دولت ہے", en: "Faith is the Greatest Wealth", ar: "الإيمان أعظم الثروات" }, reference: "خطبات عارفی: 19" },
  { id: "imn1_12", title: { ur: "ایمان، تقویٰ، صدق", en: "Faith, Piety & Truthfulness", ar: "الإيمان، التقوى، الصدق" }, reference: "خطبات محمود: 1/189" },
  { id: "imn1_13", title: { ur: "ایمان تقویٰ", en: "Faith & Piety", ar: "الإيمان والتقوى" }, reference: "خطبات محمود: 3/2" },
  { id: "imn1_14", title: { ur: "ایمان اور اس کی قیمت", en: "Faith and Its Value", ar: "الإيمان وقيمته" }, reference: "خطبات علی میاں: 5/332، خطبات مفکر اسلام: 5/217" },
  { id: "imn1_15", title: { ur: "اللہ کی سب سے بڑی نعمت ایمان", en: "Faith: Allah's Greatest Blessing", ar: "الإيمان أعظم نعم الله" }, reference: "خطبات علی میاں: 3/240" },
  { id: "imn1_16", title: { ur: "ایمان اور اس کی قیمت", en: "Faith and Its Value", ar: "الإيمان وقيمته" }, reference: "خطبات علی میاں: 5/332" },
  { id: "imn1_17", title: { ur: "اللہ کی سب سے بڑی نعمت ایمان ہے", en: "Faith is Allah's Greatest Blessing", ar: "الإيمان أعظم نعمة من الله" }, reference: "خطبات علی میاں: 7/381" },
  { id: "imn1_18", title: { ur: "ایمان جان سے زیادہ عزیز ہونا چاہیے", en: "Faith Should Be Dearer Than Life", ar: "الإيمان أعز من الروح" }, reference: "خطبات مفکر اسلام: 6/359" },
  { id: "imn1_19", title: { ur: "ایمان اور عمل صالح", en: "Faith and Righteous Deeds", ar: "الإيمان والعمل الصالح" }, reference: "خطبات قاسمی: 2/424" },
  { id: "imn1_20", title: { ur: "صحابہ نے پہلے ایمان، پھر قرآن سیکھا!", en: "Companions Learned Faith Before Quran", ar: "الصحابة تعلموا الإيمان قبل القرآن" }, reference: "اصلاحی مواعظ: 7/45" },
  { id: "imn1_21", title: { ur: "ایمان کی کسوٹی", en: "Touchstone of Faith", ar: "محك الإيمان" }, reference: "خطبات الرشید: 1/56" },
  { id: "imn1_22", title: { ur: "ہمارا ایمان کیسا ہو", en: "How Our Faith Should Be", ar: "كيف يكون إيماننا" }, reference: "خطبات اسلم: 7/76" },
  { id: "imn1_23", title: { ur: "ایمان", en: "Faith (Iman)", ar: "الإيمان" }, reference: "خطبات حکیم العصر: 5/27" },
  { id: "imn1_24", title: { ur: "ایمان کی قدر و قیمت (حصہ اول)", en: "Value of Faith (Part 1)", ar: "قيمة الإيمان (الجزء الأول)" }, reference: "خطبات حکیم العصر: 5/51" },
  { id: "imn1_27", title: { ur: "ایمان کی قدر و قیمت (حصہ دوم)", en: "Value of Faith (Part 2)", ar: "قيمة الإيمان (الجزء الثاني)" } },
  { id: "imn1_28", title: { ur: "علامت ایمان", en: "Sign of Faith", ar: "علامة الإيمان" } },
  { id: "imn1_29", title: { ur: "علامت ایمان", en: "Sign of Faith", ar: "علامة الإيمان" } },
  { id: "imn1_30", title: { ur: "دولت ایمان (خطاب رمضان)", en: "Wealth of Faith (Ramadan Sermon)", ar: "ثروة الإيمان (خطبة رمضان)" } },
  { id: "imn1_31", title: { ur: "ایمان اور باہمی محبت", en: "Faith and Mutual Love", ar: "الإيمان والمحبة المتبادلة" } },
  { id: "imn1_32", title: { ur: "ایمان کامل کی چار علامتیں", en: "Four Signs of Perfect Faith", ar: "أربع علامات للإيمان الكامل" } },
  { id: "imn1_33", title: { ur: "زبانی ایمان قابل قبول نہیں", en: "Verbal Faith Alone is Not Accepted", ar: "الإيمان اللساني غير مقبول" } },
  { id: "imn1_34", title: { ur: "ایمان کی عظمت", en: "Greatness of Faith", ar: "عظمة الإيمان" } },
  { id: "imn1_35", title: { ur: "ایمانی زندگی کے تقاضے", en: "Demands of a Life of Faith", ar: "مقتضيات الحياة الإيمانية" } },
  { id: "imn1_36", title: { ur: "نفسانی، انسانی اور ایمانی زندگی", en: "Carnal, Human and Faithful Life", ar: "الحياة النفسانية والإنسانية والإيمانية" } },
  { id: "imn1_37", title: { ur: "حصول حیات طیبہ کے مدارج", en: "Stages of Attaining the Pure Life", ar: "مراتب حصول الحياة الطيبة" } },
  { id: "imn1_38", title: { ur: "یقین کامل کی اہمیت", en: "Importance of Complete Certainty", ar: "أهمية اليقين الكامل" } },
  { id: "imn1_39", title: { ur: "تکمیل ایمان", en: "Perfection of Faith", ar: "تكميل الإيمان" } },
  { id: "imn1_40", title: { ur: "ناقص اور کامل انسان", en: "The Imperfect and the Perfect Human", ar: "الإنسان الناقص والكامل" } },
  { id: "imn1_41", title: { ur: "اہمیت ایمان", en: "Importance of Faith", ar: "أهمية الإيمان" } },
  { id: "imn1_42", title: { ur: "من قال لا الہ الا اللہ دخل الجنۃ", en: "Whoever Says La ilaha illallah Enters Paradise", ar: "من قال لا إله إلا الله دخل الجنة" } },
  { id: "imn1_43", title: { ur: "ایمان کی شیرینی", en: "Sweetness of Faith", ar: "حلاوة الإيمان" } },
  { id: "imn1_44", title: { ur: "عقل سلیم اور ایمان باللہ: قیامت کی ہولناکی", en: "Sound Reason & Belief in Allah: Horrors of Qiyamah", ar: "العقل السليم والإيمان بالله: أهوال القيامة" } },
  { id: "imn1_45", title: { ur: "باایمان زندگی اور خدائی مدد", en: "Faithful Life and Divine Help", ar: "الحياة الإيمانية والمعونة الإلهية" } },
  { id: "imn1_46", title: { ur: "بندوں کی حفاظت کے لیے اللہ تعالی کا عملہ", en: "Allah's Staff Protecting His Servants", ar: "ملائكة الله لحفظ العباد" } },
  { id: "imn1_47", title: { ur: "قانون الہی پر عمل پیرا ہونے کا نام ایمان ہے", en: "Faith is Acting Upon Divine Law", ar: "الإيمان هو العمل بالقانون الإلهي" } },
  { id: "imn1_48", title: { ur: "بنیادی عقائد", en: "Fundamental Beliefs", ar: "العقائد الأساسية" } },
  { id: "imn1_49", title: { ur: "مفہوم و اقسام ایمان", en: "Meaning and Types of Faith", ar: "مفهوم وأنواع الإيمان" } },
  { id: "imn1_50", title: { ur: "اللہ پر ایمان (صفات الٰہی)", en: "Belief in Allah (Divine Attributes)", ar: "الإيمان بالله (الصفات الإلهية)" } },
  { id: "imn1_51", title: { ur: "فرشتوں پر ایمان", en: "Belief in Angels", ar: "الإيمان بالملائكة" } },
  { id: "imn1_52", title: { ur: "آسمانی کتابوں پر ایمان", en: "Belief in Heavenly Books", ar: "الإيمان بالكتب السماوية" } },
  { id: "imn1_53", title: { ur: "ایمانیات پر ایک مجموعی نظر", en: "Overview of Beliefs (Imaniyat)", ar: "نظرة عامة على الإيمانيات" } },
];
