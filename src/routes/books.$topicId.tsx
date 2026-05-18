import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { getBookTopic, getBooksByTopic } from "@/lib/library-data";
import { BookOpen, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/books/$topicId")({
  loader: ({ params }) => {
    const topic = getBookTopic(params.topicId);
    if (!topic) throw notFound();
    return { topic, books: getBooksByTopic(params.topicId) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.topic.title ?? "Books"} — Lumen Library` },
      { name: "description", content: loaderData?.topic.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Topic not found
    </div>
  ),
  component: TopicBooks,
});

function TopicBooks() {
  const { topic, books } = Route.useLoaderData();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/books" label={topic.title} eyebrow="Books · Topic" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-10 max-w-2xl animate-fade-up">
          <p className="text-muted-foreground">{topic.description}</p>
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
                  style={{
                    background: `linear-gradient(160deg, ${b.accent}, oklch(0.18 0.02 50) 80%)`,
                  }}
                >
                  <div className="absolute inset-y-0 left-1.5 w-0.5 bg-foreground/20" />
                  <BookOpen className="h-3.5 w-3.5 text-foreground/70" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-serif text-lg text-foreground sm:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {b.author} · {b.year < 0 ? `${-b.year} BC` : b.year} · {b.pages} pages
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground shadow-gold transition group-hover:gap-3">
                  Read <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}