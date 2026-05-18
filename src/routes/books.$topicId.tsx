import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { getBookTopic, getBooksByTopic, type Book, type Topic } from "@/lib/library-data";
import { useI18n } from "@/lib/i18n";
import { BookOpen, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/books/$topicId")({
  loader: ({ params }): { topic: Topic; books: Book[] } => {
    const topic = getBookTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic, books: getBooksByTopic(params.topicId) };
  },
  notFoundComponent: () => <NotFound />,
  component: TopicBooks,
});

function NotFound() {
  const { t } = useI18n();
  return <div className="flex min-h-screen items-center justify-center text-foreground">{t("notFoundTopic")}</div>;
}

function TopicBooks() {
  const { topic, books } = Route.useLoaderData() as { topic: Topic; books: Book[] };
  const { t, tr, dir } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/books" label={tr(topic.title)} eyebrow={t("booksTopic")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up">
          <p className="text-muted-foreground">{tr(topic.description)}</p>
        </header>
        <ul className="space-y-4">
          {books.map((b, i) => (
            <li key={b.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                to="/books/$topicId/$bookId"
                params={{ topicId: topic.id, bookId: b.id }}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl glass p-4 transition hover:-translate-y-0.5 hover:ring-gold sm:gap-6 sm:p-5"
              >
                <div
                  className="relative flex h-20 w-14 items-end justify-start overflow-hidden rounded-md p-2 shadow-elegant sm:h-24 sm:w-16"
                  style={{ background: `linear-gradient(160deg, ${b.accent}, oklch(0.18 0.02 50) 80%)` }}
                >
                  <div className="absolute inset-y-0 start-1.5 w-0.5 bg-foreground/20" />
                  <BookOpen className="h-3.5 w-3.5 text-foreground/70" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-serif text-lg text-foreground sm:text-xl">{tr(b.title)}</h3>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {tr(b.author)} · {b.year < 0 ? `${-b.year} ${t("bc")}` : b.year} · {b.pages} {t("pages")}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-gold transition group-hover:gap-3">
                  {t("read")}
                  <ChevronRight className="h-3.5 w-3.5" style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
