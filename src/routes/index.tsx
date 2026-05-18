import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BookOpen, Mic, Sparkles } from "lucide-react";
import { AmbientBackground } from "@/components/AmbientBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Library — Sacred Books & Sermons" },
      { name: "description", content: "A premium reading sanctuary for classical books and sermons, with an integrated in-app PDF reader." },
      { property: "og:title", content: "Lumen Library" },
      { property: "og:description", content: "Sacred books and sermons, beautifully read." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <header className="animate-fade-up text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/80">
              Lumen Library · Est. MMXXVI
            </span>
          </div>
          <h1 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
            A sanctuary of <span className="text-gradient-gold italic">timeless</span>
            <br /> words and voices.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Read curated sacred books and listen to indexed sermons — all delivered
            instantly into an integrated, in‑app reading room.
          </p>
        </header>

        <section className="mt-16 grid gap-6 sm:mt-24 sm:grid-cols-2 sm:gap-8">
          <HomeCard
            to="/books"
            number="I"
            label="Section One"
            title="Books"
            description="A curated index of classical theology, philosophy, and wisdom — browsed by topic and read inside the app."
            icon={<BookOpen className="h-6 w-6" />}
            delay={120}
          />
          <HomeCard
            to="/sermons"
            number="II"
            label="Section Two"
            title="Sermons"
            description="Indexed sermons with their source book and exact page — opened directly to the passage that inspired them."
            icon={<Mic className="h-6 w-6" />}
            delay={220}
          />
        </section>

        <footer className="mt-24 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Read · Reflect · Return
        </footer>
      </main>
    </div>
  );
}

interface HomeCardProps {
  to: string;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function HomeCard({ to, number, label, title, description, icon, delay }: HomeCardProps) {
  return (
    <Link
      to={to as any}
      className="group relative animate-fade-up overflow-hidden rounded-[2rem] glass p-8 transition duration-700 hover:-translate-y-2 hover:ring-gold sm:p-10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 transition duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.16 82 / 0.35), transparent 70%)" }}
      />
      <div className="relative flex items-start justify-between">
        <span className="font-serif text-sm tracking-widest text-primary/80">{number}</span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="relative mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold text-primary-foreground shadow-gold">
        {icon}
      </div>
      <h2 className="relative mt-8 font-serif text-4xl text-foreground sm:text-5xl">{title}</h2>
      <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="relative mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary transition group-hover:gap-3">
        Enter the index
        <span aria-hidden>→</span>
      </div>
    </Link>
  );
}
