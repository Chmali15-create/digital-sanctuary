// Sample PDFs hosted with CORS-friendly headers
const SAMPLE_PDFS = [
  "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
  "https://arxiv.org/pdf/1706.03762.pdf",
  "https://www.africau.edu/images/default/sample.pdf",
];
const pickPdf = (i: number) => SAMPLE_PDFS[i % SAMPLE_PDFS.length];

export interface Topic {
  id: string;
  title: string;
  description: string;
  count: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  topicId: string;
  pdfUrl: string;
  accent: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  referenceBook: string;
  pageNumber: number;
  topicId: string;
  pdfUrl: string;
  duration: string;
}

export const bookTopics: Topic[] = [
  { id: "theology", title: "Systematic Theology", description: "Foundations of doctrine and faith", count: 12 },
  { id: "philosophy", title: "Classical Philosophy", description: "Ancient thought and reasoning", count: 9 },
  { id: "history", title: "Sacred History", description: "Chronicles of faith and civilization", count: 14 },
  { id: "poetry", title: "Mystical Poetry", description: "Verses of the soul and divine", count: 7 },
  { id: "wisdom", title: "Wisdom Literature", description: "Proverbs, parables, and meditations", count: 11 },
  { id: "leadership", title: "Spiritual Leadership", description: "Pastoral and moral guidance", count: 8 },
];

export const sermonTopics: Topic[] = [
  { id: "faith", title: "Faith & Trust", description: "Anchoring the soul in conviction", count: 18 },
  { id: "grace", title: "Grace & Redemption", description: "The unmerited gift", count: 15 },
  { id: "prayer", title: "The Inner Life of Prayer", description: "Communion and contemplation", count: 12 },
  { id: "service", title: "Service & Compassion", description: "Love made visible", count: 10 },
  { id: "hope", title: "Hope in Trials", description: "Light through the valley", count: 14 },
  { id: "wisdom", title: "Wisdom for Today", description: "Ancient truths, modern lives", count: 9 },
];

const bookSeed: Omit<Book, "pdfUrl" | "accent">[] = [
  { id: "b1", title: "The Weight of Glory", author: "C. S. Aurelius", year: 1949, pages: 218, topicId: "theology" },
  { id: "b2", title: "Confessions of the Eternal", author: "A. Hippo", year: 397, pages: 412, topicId: "theology" },
  { id: "b3", title: "Summa Brevis", author: "T. Aquinata", year: 1274, pages: 624, topicId: "theology" },
  { id: "b4", title: "Meditations on First Cause", author: "R. Descartesian", year: 1641, pages: 184, topicId: "philosophy" },
  { id: "b5", title: "The Republic of Souls", author: "Plato of Athens", year: -380, pages: 360, topicId: "philosophy" },
  { id: "b6", title: "Nicomachean Virtues", author: "Aristotle", year: -340, pages: 298, topicId: "philosophy" },
  { id: "b7", title: "Chronicles of the Reformation", author: "M. Wittenberg", year: 1546, pages: 540, topicId: "history" },
  { id: "b8", title: "The Desert Fathers", author: "Anonymous", year: 350, pages: 220, topicId: "history" },
  { id: "b9", title: "Songs of the Beloved", author: "J. of the Cross", year: 1578, pages: 142, topicId: "poetry" },
  { id: "b10", title: "The Divine Comedy", author: "Dante Alighieri", year: 1320, pages: 798, topicId: "poetry" },
  { id: "b11", title: "The Imitation", author: "T. à Kempis", year: 1418, pages: 256, topicId: "wisdom" },
  { id: "b12", title: "Pensées", author: "B. Pascal", year: 1670, pages: 312, topicId: "wisdom" },
  { id: "b13", title: "The Rule", author: "Benedict of Nursia", year: 530, pages: 96, topicId: "leadership" },
  { id: "b14", title: "Pastoral Care", author: "Gregory the Great", year: 590, pages: 174, topicId: "leadership" },
];

const accents = ["#c9a44c", "#a8763e", "#8e5b3a", "#b88a3e", "#c98f4c", "#9c6b35"];

export const books: Book[] = bookSeed.map((b, i) => ({
  ...b,
  pdfUrl: pickPdf(i),
  accent: accents[i % accents.length],
}));

const sermonSeed: Omit<Sermon, "pdfUrl">[] = [
  { id: "s1", title: "The Unshakable Anchor", preacher: "Rev. E. Hartwell", referenceBook: "The Weight of Glory", pageNumber: 42, topicId: "faith", duration: "38 min" },
  { id: "s2", title: "When the Mountain Will Not Move", preacher: "Rev. M. Brennan", referenceBook: "Confessions of the Eternal", pageNumber: 118, topicId: "faith", duration: "45 min" },
  { id: "s3", title: "Mustard Seed Faith", preacher: "Rev. E. Hartwell", referenceBook: "Pensées", pageNumber: 87, topicId: "faith", duration: "29 min" },
  { id: "s4", title: "Grace That Finds Us", preacher: "Rev. J. Caldwell", referenceBook: "Summa Brevis", pageNumber: 204, topicId: "grace", duration: "41 min" },
  { id: "s5", title: "The Prodigal Father", preacher: "Rev. M. Brennan", referenceBook: "The Imitation", pageNumber: 73, topicId: "grace", duration: "35 min" },
  { id: "s6", title: "Stillness Before the Throne", preacher: "Rev. A. Whitfield", referenceBook: "Songs of the Beloved", pageNumber: 56, topicId: "prayer", duration: "27 min" },
  { id: "s7", title: "The Lord's Pattern", preacher: "Rev. J. Caldwell", referenceBook: "The Rule", pageNumber: 22, topicId: "prayer", duration: "33 min" },
  { id: "s8", title: "Hands That Heal", preacher: "Rev. A. Whitfield", referenceBook: "Pastoral Care", pageNumber: 91, topicId: "service", duration: "30 min" },
  { id: "s9", title: "The Cup of Cold Water", preacher: "Rev. E. Hartwell", referenceBook: "The Desert Fathers", pageNumber: 134, topicId: "service", duration: "26 min" },
  { id: "s10", title: "Through the Valley", preacher: "Rev. M. Brennan", referenceBook: "The Divine Comedy", pageNumber: 312, topicId: "hope", duration: "44 min" },
  { id: "s11", title: "Morning Will Come", preacher: "Rev. A. Whitfield", referenceBook: "Meditations on First Cause", pageNumber: 65, topicId: "hope", duration: "37 min" },
  { id: "s12", title: "Wisdom in the Marketplace", preacher: "Rev. J. Caldwell", referenceBook: "Nicomachean Virtues", pageNumber: 142, topicId: "wisdom", duration: "32 min" },
];

export const sermons: Sermon[] = sermonSeed.map((s, i) => ({ ...s, pdfUrl: pickPdf(i + 1) }));

export const getBookTopic = (id: string) => bookTopics.find((t) => t.id === id);
export const getSermonTopic = (id: string) => sermonTopics.find((t) => t.id === id);
export const getBook = (id: string) => books.find((b) => b.id === id);
export const getSermon = (id: string) => sermons.find((s) => s.id === id);
export const getBooksByTopic = (topicId: string) => books.filter((b) => b.topicId === topicId);
export const getSermonsByTopic = (topicId: string) => sermons.filter((s) => s.topicId === topicId);