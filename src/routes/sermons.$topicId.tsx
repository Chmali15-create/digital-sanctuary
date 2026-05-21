import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { getSermonTopic, getSermonsByTopic, type Sermon, type Topic } from "@/lib/library-data";
import { SERMON_TOPICS } from "@/lib/sermon-topics-full";
import { IMANIYAT_SUBTOPICS, IMANIYAT_PARENT_ID } from "@/lib/imaniyat-subtopics";
import { IBADAT_SUBTOPICS, IBADAT_PARENT_ID } from "@/lib/ibadat-subtopics";
import { IMAN_SUBTOPICS, IMAN_PARENT_ID } from "@/lib/iman-subtopics";
import { useI18n } from "@/lib/i18n";
import { BookMarked, Clock, ChevronRight, ArrowUpRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/sermons/$topicId")({
  loader: ({ params }): { topic: Topic; sermons: Sermon[] } => {
    const existing = getSermonTopic(params.topicId);
    if (existing) {
      return { topic: existing, sermons: getSermonsByTopic(params.topicId) };
    }
    const entry = SERMON_TOPICS.find((t) => t.id === params.topicId);
    if (entry) {
      const topic: Topic = {
        id: entry.id,
        title: entry.title,
        description: { en: `Page ${entry.page}`, ur: `صفحہ ${entry.page}`, ar: `صفحة ${entry.page}` },
        count: 0,
      };
      return { topic, sermons: [] };
    }
    const sub =
      IMANIYAT_SUBTOPICS.find((s) => s.id === params.topicId) ||
      IBADAT_SUBTOPICS.find((s) => s.id === params.topicId) ||
      IMAN_SUBTOPICS.find((s) => s.id === params.topicId);
    if (sub) {
      const topic: Topic = {
        id: sub.id,
        title: sub.title,
        description: { en: "", ur: "", ar: "" },
        count: 0,
      };
      return { topic, sermons: [] };
    }
    throw notFound();
  },
  notFoundComponent: () => <NotFound />,
  component: TopicSermons,
});

function NotFound() {
  const { t } = useI18n();
  return <div className="flex min-h-screen items-center justify-center text-foreground">{t("notFoundTopic")}</div>;
}

function TopicSermons() {
  const { topic, sermons } = Route.useLoaderData() as { topic: Topic; sermons: Sermon[] };
  const { t, tr, dir } = useI18n();
  const isImaniyat = topic.id === IMANIYAT_PARENT_ID;
  const isIbadat = topic.id === IBADAT_PARENT_ID;
  const isIman = topic.id === IMAN_PARENT_ID;
  const subList = isImaniyat
    ? IMANIYAT_SUBTOPICS
    : isIbadat
      ? IBADAT_SUBTOPICS
      : isIman
        ? IMAN_SUBTOPICS
        : null;
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/sermons" label={tr(topic.title)} eyebrow={t("sermonsTopic")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up">
          <p className="text-muted-foreground">{tr(topic.description)}</p>
        </header>
        {subList && (
          <div
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            dir={dir}
          >
            {subList.map((sub, i) => {
              const reference = (sub as { reference?: string }).reference;
              const pdfUrl = (sub as { pdfUrl?: string }).pdfUrl;
              const pdfPage = (sub as { pdfPage?: number }).pdfPage;
              const pdfPageOffset = (sub as { pdfPageOffset?: number }).pdfPageOffset;
              const commonClass = `group relative flex items-center justify-between gap-3 rounded-2xl glass p-4 transition duration-300 hover:-translate-y-0.5 hover:ring-gold sm:p-5 animate-fade-up ${dir === "rtl" ? "text-right" : "text-left"}`;
              const inner = (
                <>
                  <span className="shrink-0 font-serif text-xs tabular-nums text-primary/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-base leading-snug text-foreground sm:text-lg break-words">
                    {tr(sub.title)}
                  </span>
                  {reference && (
                    <span
                      className="shrink-0 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-medium tabular-nums text-primary/70 sm:text-xs"
                      dir="rtl"
                    >
                      {reference}
                    </span>
                  )}
                  {pdfUrl ? (
                    <BookOpen className="h-4 w-4 shrink-0 text-primary/70 transition group-hover:text-primary" />
                  ) : (
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-foreground/40 transition group-hover:text-primary"
                      style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
                    />
                  )}
                </>
              );
              if (pdfUrl) {
                return (
                  <Link
                    key={sub.id}
                    to="/pdf-viewer"
                    search={{ url: pdfUrl, page: pdfPage, pageOffset: pdfPageOffset, title: tr(sub.title) }}
                    className={commonClass}
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    {inner}
                  </Link>
                );
              }
              return (
              <Link
                key={sub.id}
                to="/sermons/$topicId"
                params={{ topicId: sub.id }}
                className={commonClass}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {inner}
              </Link>
              );
            })}
          </div>
        )}
        {!subList && sermons.length === 0 && (
          <div className="rounded-3xl glass p-10 text-center animate-fade-up">
            <p className="font-serif text-xl text-foreground">{tr(topic.title)}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("loading")}
            </p>
          </div>
        )}
        <ul className="space-y-4">
          {sermons.map((s, i) => (
            <li key={s.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                to="/sermons/$topicId/$sermonId"
                params={{ topicId: topic.id, sermonId: s.id }}
                className="group block rounded-2xl glass p-5 transition hover:-translate-y-0.5 hover:ring-gold sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-foreground sm:text-xl">{tr(s.title)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tr(s.preacher)}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/30 px-3 py-1">
                        <BookMarked className="h-3 w-3 text-primary" />
                        <span className="text-foreground/80">{tr(s.referenceBook)}</span>
                        <span className="text-primary">· {t("page")} {s.pageNumber}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {tr(s.duration)}
                      </span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-1 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-gold transition group-hover:gap-2 sm:inline-flex">
                    {t("open")}
                    <ChevronRight className="h-3.5 w-3.5" style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
