import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

interface BackBarProps {
  to: string;
  params?: Record<string, string>;
  label: string;
  eyebrow?: string;
}

export function BackBar({ to, params, label, eyebrow }: BackBarProps) {
  const { t, dir } = useI18n();
  return (
    <div className="sticky top-0 z-50 border-b border-border/40 bg-[#1A1512]/40 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 sm:px-8">
        <Link
          to={to as any}
          params={params as any}
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass transition hover:ring-gold"
          aria-label={t("back")}
        >
          <ArrowLeft
            className="h-4 w-4 text-foreground/80 transition group-hover:text-primary"
            style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
          />
        </Link>
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">{eyebrow}</p>
          )}
          <h1 className="truncate font-serif text-lg font-semibold text-foreground sm:text-xl">
            {label}
          </h1>
        </div>
        <LanguageSwitcher compact />
      </div>
    </div>
  );
}
