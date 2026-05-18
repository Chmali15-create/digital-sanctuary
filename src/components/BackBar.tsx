import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface BackBarProps {
  to: string;
  params?: Record<string, string>;
  label: string;
  eyebrow?: string;
}

export function BackBar({ to, params, label, eyebrow }: BackBarProps) {
  return (
    <div className="sticky top-0 z-30 glass-strong border-b border-border/40">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4 sm:px-8">
        <Link
          to={to as any}
          params={params as any}
          className="group flex h-10 w-10 items-center justify-center rounded-full glass transition hover:ring-gold"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4 text-foreground/80 transition group-hover:-translate-x-0.5 group-hover:text-primary" />
        </Link>
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">{eyebrow}</p>
          )}
          <h1 className="truncate font-serif text-lg font-semibold text-foreground sm:text-xl">
            {label}
          </h1>
        </div>
      </div>
    </div>
  );
}