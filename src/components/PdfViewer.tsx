import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Use jsDelivr-hosted worker matching installed pdfjs-dist version.
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
  /**
   * Number of front-matter / cover pages in the PDF before the book's
   * own "page 1" begins. Defaults to 0.
   */
  pageOffset?: number;
}

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const initialPage = page ? Math.max(1, page + pageOffset) : 1;
  const [numPages, setNumPages] = useState<number>(0);
  const [current, setCurrent] = useState<number>(initialPage);
  const [width, setWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(Math.min(el.clientWidth - 32, 1100));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (delta: number) => {
    setCurrent((p) => Math.min(Math.max(1, p + delta), numPages || p));
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-5rem)] w-full overflow-auto rounded-3xl glass-strong shadow-elegant"
    >
      <div className="flex min-h-full flex-col items-center justify-start gap-4 p-4">
        <Document
          file={url}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={
            <div className="flex items-center gap-2 py-20 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading {title}…</span>
            </div>
          }
          error={
            <div className="py-20 text-center text-sm text-destructive">
              Failed to load PDF.
            </div>
          }
        >
          <Page
            pageNumber={current}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>

      {numPages > 0 && (
        <div className="pointer-events-none sticky bottom-3 z-10 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-[#2C221E] bg-[#1A1512]/80 px-3 py-1.5 text-sm text-foreground shadow-xl backdrop-blur-lg">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={current <= 1}
              className="rounded-full p-1.5 hover:bg-white/10 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="tabular-nums">
              {Math.max(1, current - pageOffset)} / {Math.max(1, numPages - pageOffset)}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={current >= numPages}
              className="rounded-full p-1.5 hover:bg-white/10 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}