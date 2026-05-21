import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useI18n } from "@/lib/i18n";

const SECURE_PDF_SOURCE = "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v3.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_06_compressed.pdf";
const SECURE_PDF_EMBED_SRC = "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v3.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_06_compressed.pdf#page=177&zoom=80";

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
  const { title } = Route.useSearch();
  const navigate = useNavigate();
  const { t, dir } = useI18n();
  const displayTitle = title || "شرط الایمان";

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="sticky top-0 z-50 border-b border-border/40 bg-[#1A1512]/40 backdrop-blur-lg">
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
          <a
            href={SECURE_PDF_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-foreground hover:ring-gold"
          >
            {t("tryDirect")} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
      <main className="relative z-10 mx-auto max-w-7xl px-3 py-4 sm:px-6">
        <div key="pdf-secure-stream" className="w-full h-[calc(100vh-130px)] bg-[#15110E] overflow-hidden rounded-xl border border-[#2C221E] shadow-2xl">
          <embed
            src={SECURE_PDF_EMBED_SRC}
            type="application/pdf"
            className="w-full h-full border-none"
          />
        </div>
      </main>
    </div>
  );
}