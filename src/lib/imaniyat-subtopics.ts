// Sub-sections shown when the user opens "ایمانیات (عقائد و نظریات)".
import type { Localized } from "@/lib/i18n";

export interface ImaniyatSubtopic { id: string; title: Localized; }

export const IMANIYAT_PARENT_ID = "_Toc29194034";

export const IMANIYAT_SUBTOPICS: ImaniyatSubtopic[] = [
  { id: "imn_01", title: { ur: "ایمان", en: "Faith (Iman)", ar: "الإيمان" } },
  { id: "imn_02", title: { ur: "اسلام", en: "Islam", ar: "الإسلام" } },
  { id: "imn_03", title: { ur: "مسلمان اور مؤمن کی پہچان و صفات", en: "Identity & Attributes of a Muslim and Mu'min", ar: "صفات المسلم والمؤمن" } },
  { id: "imn_04", title: { ur: "کلمہ طیبہ: مفہوم اور تقاضے", en: "Kalimah Tayyibah: Meaning & Demands", ar: "الكلمة الطيبة: المفهوم والمقتضيات" } },
  { id: "imn_05", title: { ur: "توحید و صفاتِ باری تعالیٰ", en: "Tawheed & Attributes of Allah", ar: "التوحيد وصفات الله تعالى" } },
  { id: "imn_06", title: { ur: "شرک: مذمت، حقیقت، صور و اقسام", en: "Shirk: Condemnation, Reality & Types", ar: "الشرك: الذم، الحقيقة والأنواع" } },
  { id: "imn_07", title: { ur: "تخلیقِ انسان و کائنات", en: "Creation of Humans & Universe", ar: "خلق الإنسان والكون" } },
  { id: "imn_08", title: { ur: "نبوت و رسالت", en: "Prophethood & Messengership", ar: "النبوة والرسالة" } },
  { id: "imn_09", title: { ur: "عصمتِ انبیاء", en: "Infallibility of Prophets (Ismah)", ar: "عصمة الأنبياء" } },
  { id: "imn_10", title: { ur: "ختمِ نبوت", en: "Finality of Prophethood", ar: "ختم النبوة" } },
  { id: "imn_11", title: { ur: "توہینِ رسالت", en: "Blasphemy / Insulting Prophethood", ar: "توهين الرسالة" } },
  { id: "imn_12", title: { ur: "حجیتِ حدیث و سنت", en: "Authority of Hadith & Sunnah", ar: "حجية الحديث والسنة" } },
  { id: "imn_13", title: { ur: "سنت کی اہمیت و ضرورت", en: "Importance & Necessity of Sunnah", ar: "أهمية السنة وضرورتها" } },
  { id: "imn_14", title: { ur: "سنت و بدعت، رسوم، تشبہ", en: "Sunnah vs Innovation (Bid'ah) & Rituals", ar: "السنة والبدعة والرسوم والتشبه" } },
  { id: "imn_15", title: { ur: "فقہ اسلامی (حقیقت و عظمت، تدوین، قانونِ اسلام وغیرہ)", en: "Islamic Jurisprudence (Fiqh): Reality, Codification & Law", ar: "الفقه الإسلامي: حقيقته، تدوينه وقوانينه" } },
  { id: "imn_16", title: { ur: "اجتہاد و تقلید", en: "Ijtihad & Taqlid", ar: "الاجتهاد والتقليد" } },
  { id: "imn_17", title: { ur: "شانِ صحابہ و اہل بیت رضی اللہ عنہم", en: "Status of Companions & Ahl al-Bayt (R.A)", ar: "مكانة الصحابة وأهل البيت رضي الله عنهم" } },
  { id: "imn_18", title: { ur: "عقیدہ آخرت / معاد و قیامت", en: "Belief in Hereafter & Resurrection", ar: "عقيدة الآخرة والمعاد والقيامة" } },
  { id: "imn_19", title: { ur: "علاماتِ قیامت: دجال، یاجوج ماجوج، دخان، نزولِ مسیح وغیرہ", en: "Signs of Qiyamah: Dajjal, Yajuj Majuj, Descent of Isa (A.S)", ar: "علامات الساعة: الدجال، يأجوج ومأجوج، نزول عيسى عليه السلام" } },
  { id: "imn_20", title: { ur: "حشر کی ہولناکیاں", en: "Horrors of the Day of Judgment", ar: "أهوال الحشر" } },
  { id: "imn_21", title: { ur: "جنت و جہنم، جزا و سزا", en: "Paradise, Hell, Reward & Punishment", ar: "الجنة والنار، الجزاء والعقاب" } },
  { id: "imn_22", title: { ur: "موت", en: "Death", ar: "الموت" } },
  { id: "imn_23", title: { ur: "قبر و برزخ", en: "Grave & Barzakh (Intermediary Realm)", ar: "القبر والبرزخ" } },
  { id: "imn_24", title: { ur: "حیات النبی ﷺ", en: "Life of the Prophet ﷺ in Barzakh", ar: "حياة النبي ﷺ" } },
  { id: "imn_25", title: { ur: "وصیت و میراث اور ایصالِ ثواب", en: "Will, Inheritance & Isal-e-Sawab", ar: "الوصية والميراث وإيصال الثواب" } },
  { id: "imn_26", title: { ur: "تقدیر", en: "Divine Decree (Taqdir)", ar: "القدر" } },
  { id: "imn_27", title: { ur: "قرآن: اعجاز (معجزہ ہونا)، عظمت و تاثیر، حقوق و آداب، تلاوت و حفظ، فہم، عمل و ہدایت، تعلیم", en: "The Quran: Inimitability, Greatness, Rights, Recitation, Understanding & Teaching", ar: "القرآن: إعجازه، عظمته، حقوقه، تلاوته، فهمه وتعليمه" } },
  { id: "imn_28", title: { ur: "عقائد کی درستگی اور معیارِ عقائد وغیرہ سے متعلق خطبات", en: "Sermons on Correction & Standards of Beliefs", ar: "خطب في تصحيح العقائد ومعاييرها" } },
];