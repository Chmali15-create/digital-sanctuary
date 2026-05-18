import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { getSermonTopic, getSermonsByTopic, type Sermon, type Topic } from "@/lib/library-data";
import { SERMON_TOPICS, type SermonTopicEntry } from "@/lib/sermon-topics-full";
import { getSermonSection, isSermonSection } from "@/lib/sermon-sections";
import { useI18n } from "@/lib/i18n";
import { ArrowUpRight, BookMarked, Clock, ChevronRight } from "lucide-react";

type LoaderData =
  | { kind: "section"; sectionTitle: string; items: SermonTopicEntry[] }
  | { kind: "topic"; topic: Topic; sermons: Sermon[] };

export const Route = createFileRoute("/sermons/")({
  loader: ({ params }): LoaderData => {
    if (isSermonSection(params.topicId)) {
      const sec = getSermonSection(params.topicId);
      if (!sec) throw notFound();
      return { kind: "section", sectionTitle: sec.section.title, items: sec.items };
    }
    const existing = getSermonTopic(params.topicId);
    if (existing) {
      return { kind: "topic", topic: existing, sermons: getSermonsByTopic(params.topicId) };
    }
    const entry = SERMON_TOPICS.find((t) => t.id === params.topicId);
    if (!entry) throw notFound();
    const topic: Topic = {
      id: entry.id,
      title: { en: entry.title, ur: entry.title, ar: entry.title },
      description: { en: `Page ${entry.page}`, ur: `صفحہ ${entry.page}`, ar: `صفحة ${entry.page}` },
      count: 0,
    };
    return { kind: "topic", topic, sermons: [] };
  },
  notFoundComponent: () => <NotFound />,
  component: TopicOrSection,
});

function NotFound() {
  const { t } = useI18n();
  return <div className="flex min-h-screen items-center justify-center text-foreground">{t("notFoundTopic")}</div>;
}

function TopicOrSection() {
  const data = Route.useLoaderData() as LoaderData;
  if (data.kind === "section") return <SectionView sectionTitle={data.sectionTitle} items={data.items} />;
  return <TopicSermons topic={data.topic} sermons={data.sermons} />;
}

function SectionView({ sectionTitle, items }: { sectionTitle: string; items: SermonTopicEntry[] }) {
  const { t, dir } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/sermons" label={sectionTitle} eyebrow={t("sermonsTopic")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up text-right" dir="rtl">
          <h2 className="font-serif text-3xl text-foreground sm:text-4xl" lang="ur">{sectionTitle}</h2>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-primary/70">
            {items.length} {t("sermonsCount")}
          </p>
        </header>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" dir="rtl">
          {items.map((it, i) => (
            <Link
              key={it.id}
              to="/sermons/$topicId"
              params={{ topicId: it.id }}
              className="group relative flex items-start justify-between gap-3 rounded-2xl glass p-4 text-right transition duration-300 hover:-translate-y-0.5 hover:ring-gold sm:p-5 animate-fade-up"
              style={{
                animationDelay: `${Math.min(i * 25, 600)}ms`,
                contentVisibility: "auto",
                containIntrinsicSize: "0 88px",
              }}
            >
              <span className="shrink-0 font-serif text-[11px] tabular-nums text-primary/60 pt-0.5">
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="flex-1 text-base leading-snug text-foreground sm:text-lg" lang="ur">
                {it.title}
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-foreground/40 transition group-hover:text-primary"
                style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function TopicSermons({ topic, sermons }: { topic: Topic; sermons: Sermon[] }) {
  const { t, tr, dir } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/sermons" label={tr(topic.title)} eyebrow={t("sermonsTopic")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up">
          <p className="text-muted-foreground">{tr(topic.description)}</p>
        </header>
        {sermons.length === 0 && (
          <div className="rounded-3xl glass p-10 text-center animate-fade-up">
            <p className="font-serif text-xl text-foreground">{tr(topic.title)}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t("loading")}</p>
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
