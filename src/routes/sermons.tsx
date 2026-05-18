import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { TopicCard } from "@/components/TopicCard";
import { sermonTopics } from "@/lib/library-data";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Lumen Library" },
      { name: "description", content: "Indexed sermons grouped by spiritual theme." },
    ],
  }),
  component: SermonsIndex,
});

function SermonsIndex() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/" label="Sermons" eyebrow="Section II — The Voice" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-12 max-w-2xl animate-fade-up">
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">
            Themes for the <span className="text-gradient-gold italic">soul</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each theme opens to sermons indexed with their source book and page.
          </p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sermonTopics.map((t, i) => (
            <TopicCard
              key={t.id}
              to="/sermons/$topicId"
              params={{ topicId: t.id }}
              index={i}
              number={String(i + 1).padStart(2, "0")}
              title={t.title}
              description={t.description}
              count={t.count}
              label="Sermons"
            />
          ))}
        </div>
      </main>
    </div>
  );
}