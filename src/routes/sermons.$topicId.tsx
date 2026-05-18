import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { getSermonTopic, getSermonsByTopic } from "@/lib/library-data";
import { BookMarked, Clock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/sermons/$topicId")({
  loader: ({ params }) => {
    const topic = getSermonTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic, sermons: getSermonsByTopic(params.topicId) };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.topic.title ?? "Sermons"} — Lumen Library` }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Topic not found
    </div>
  ),
  component: TopicSermons,
});

function TopicSermons() {
  const { topic, sermons } = Route.useLoaderData();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/sermons" label={topic.title} eyebrow="Sermons · Topic" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up">
          <p className="text-muted-foreground">{topic.description}</p>
        </header>
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
                    <h3 className="font-serif text-lg text-foreground sm:text-xl">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.preacher}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/30 px-3 py-1">
                        <BookMarked className="h-3 w-3 text-primary" />
                        <span className="text-foreground/80">{s.referenceBook}</span>
                        <span className="text-primary">· p. {s.pageNumber}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {s.duration}
                      </span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-1 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-gold transition group-hover:gap-2 sm:inline-flex">
                    Open <ChevronRight className="h-3.5 w-3.5" />
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