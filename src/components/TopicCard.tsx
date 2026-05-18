import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface TopicCardProps {
  to: string;
  params: Record<string, string>;
  index: number;
  number: string;
  title: string;
  description: string;
  count: number;
  label: string;
}

export function TopicCard({ to, params, index, number, title, description, count, label }: TopicCardProps) {
  return (
    <Link
      to={to as any}
      params={params as any}
      className="group relative block animate-fade-up rounded-3xl glass p-6 transition duration-500 hover:-translate-y-1 hover:ring-gold sm:p-7"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-serif text-sm tabular-nums text-primary/80">{number}</span>
        <ArrowUpRight className="h-4 w-4 text-foreground/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="mt-6 font-serif text-2xl leading-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
        <span className="font-serif text-sm text-primary">{count}</span>
      </div>
    </Link>
  );
}