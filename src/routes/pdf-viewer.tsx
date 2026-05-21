import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { PDF_SOURCE_URL, PdfViewer } from "@/components/PdfViewer";
import { useI18n } from "@/lib/i18n";

interface PdfSearch {
  url: string;
  title?: string;
  page?: number;
  pageOffset?: number;
}

export const Route = createFileRoute("/pdf-viewer")({
  validateSearch: (search: Record<string, unknown>): PdfSearch => ({
    url: String(search.url ?? ""),
    title: search.title ? String(search.title) : undefined,
    page: search.page ? Number(search.page) : undefined,
    pageOffset: search.pageOffset !== undefined ? Number(search.pageOffset) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "PDF Viewer — Lumen Library" },
      { name: "description", content: "In-app PDF viewer for sermons and books." },
    ],
  }),
  component: PdfViewerPage,
});

function PdfViewerPage() {
  const { url, title, page, pageOffset } = Route.useSearch();
  const navigate = useNavigate();
  const { t, dir } = useI18n();
  const displayTitle = title || "Document";

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="sticky top-0 z-30 glass-strong border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => window.history.length > 1 ? window.history.back() : navigate({ to: "/" })}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass transition hover:ring-gold"
            aria-label={t("back")}
          >
            <ArrowLeft
              className="h-4 w-4 text-foreground/80 transition group-hover:text-primary"
              style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
            />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80">PDF</p>
            <h1 className="truncate font-serif text-base font-semibold text-foreground sm:text-lg">
              {displayTitle}
            </h1>
          </div>
          {url && (
            <a
              href={PDF_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-foreground hover:ring-gold"
            >
              {t("tryDirect")} <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
      <main className="relative z-10 mx-auto max-w-7xl px-3 py-4 sm:px-6">
        {url ? (
          <PdfViewer url={url} title={displayTitle} page={page} pageOffset={pageOffset} />
        ) : (
          <div className="rounded-3xl glass p-10 text-center">
            <p className="font-serif text-xl text-foreground">{t("unableLoad")}</p>
            <p className="mt-2 text-sm text-muted-foreground">No PDF URL was provided.</p>
          </div>
        )}
      </main>
    </div>
  );
}