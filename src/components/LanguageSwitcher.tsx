import { Languages } from "lucide-react";
import { LANGS, useI18n } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/90 transition hover:ring-gold"
        aria-label={t("language")}
      >
        <Languages className="h-3.5 w-3.5 text-primary" />
        <span className="font-medium">{current.native}</span>
        {!compact && <span className="text-muted-foreground">·</span>}
        {!compact && <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{current.code}</span>}
      </button>
      {open && (
        <div className="absolute end-0 mt-2 w-44 overflow-hidden rounded-2xl bg-[#1A1512]/80 backdrop-blur-lg border border-[#2C221E] shadow-xl z-50 animate-fade-up">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-primary/10 ${l.code === lang ? "text-primary" : "text-foreground/90"}`}
              dir={l.dir}
            >
              <span className="font-medium">{l.native}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}