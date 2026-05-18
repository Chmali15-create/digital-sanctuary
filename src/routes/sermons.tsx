import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { useI18n } from "@/lib/i18n";
import { SERMON_TOPICS } from "@/lib/sermon-topics-full";
import { ArrowUpRight } from "lucide-react";

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
  const { t, dir } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar to="/" label={t("sermons")} eyebrow={t("sectionIIVoice")} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8">
        <header className="mb-12 max-w-2xl animate-fade-up">
          <h2 className="font-serif text-4xl text-foreground sm:text-5xl">{t("themesForSoul")}</h2>
          <p className="mt-4 text-muted-foreground">{t("themesIntro")}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-primary/70">
            {SERMON_TOPICS.length} {t("sermonsCount")}
          </p>
        </header>
        <div
          className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          dir="rtl"
        >
          {SERMON_TOPICS.map((topic, i) => (
            <Link
              key={topic.id}
              to="/sermons/$topicId"
              params={{ topicId: topic.id }}
              className="group relative flex items-start justify-between gap-3 rounded-2xl glass p-4 text-right transition duration-300 hover:-translate-y-0.5 hover:ring-gold sm:p-5"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "0 96px",
              }}
            >
              <span className="shrink-0 font-serif text-xs tabular-nums text-primary/70 pt-0.5">
                {String(i + 1).padStart(3, "0")}
              </span>
              <span className="flex-1 font-[var(--font-urdu)] text-base leading-snug text-foreground sm:text-lg" lang="ur">
                {topic.title}
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
