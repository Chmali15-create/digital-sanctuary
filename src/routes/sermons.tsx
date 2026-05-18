import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { TopicCard } from "@/components/TopicCard";
import { sermonTopics } from "@/lib/library-data";
import { useI18n } from "@/lib/i18n";

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
  const { t, tr } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/" label={t("sermons")} eyebrow={t("sectionIIVoice")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-12 max-w-2xl animate-fade-up">
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">{t("themesForSoul")}</h2>
          <p className="mt-4 text-muted-foreground">{t("themesIntro")}</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sermonTopics.map((topic, i) => (
            <TopicCard
              key={topic.id}
              to="/sermons/$topicId"
              params={{ topicId: topic.id }}
              index={i}
              number={String(i + 1).padStart(2, "0")}
              title={tr(topic.title)}
              description={tr(topic.description)}
              count={topic.count}
              label={t("sermonsCount")}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
