import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
  /**
   * Number of front-matter / cover pages in the PDF before the book's
   * own "page 1" begins. Defaults to 0, meaning the very first page of
   * the PDF (the cover) is treated as page 1 in our UI.
   */
  pageOffset?: number;
}

type PdfFile = { data: Uint8Array } | null;

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfFile, setPdfFile] = useState<PdfFile>(null);
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState(720);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);
  const renderedPage = numPages ? Math.min(targetPage, numPages) : targetPage;

  const documentOptions = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    [],
  );

  const loadPdf = useCallback(async () => {
    const controller = new AbortController();

    setIsFetching(true);
    setHasError(false);
    setPdfFile(null);
    setNumPages(undefined);

    try {
      const response = await fetch(url, {
        mode: "cors",
        cache: "force-cache",
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`PDF request failed with ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      setPdfFile({ data: new Uint8Array(buffer) });
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error("PDF render failed", error);
        setHasError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsFetching(false);
      }
    }

    return () => controller.abort();
  }, [url]);

  useEffect(() => {
    const abortLoad = loadPdf();
    return () => {
      void abortLoad.then((abort) => abort?.());
    };
  }, [loadPdf]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        setContainerWidth(Math.max(320, Math.min(entry.contentRect.width - 32, 980)));
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const directHref = `${url}#page=${targetPage}`;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground">
          {numPages ? `${renderedPage} / ${numPages}` : `Opening page ${targetPage}`}
        </p>
      </div>

      <div ref={containerRef} className="h-[calc(100%-3rem)] overflow-auto bg-background/70 px-3 py-5">
        {isFetching && !hasError && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="font-serif text-lg text-foreground">Preparing your reading...</p>
          </div>
        )}

        {!isFetching && hasError && <PdfFallback href={directHref} title={title} />}

        {!hasError && pdfFile && (
          <Document
            file={pdfFile}
            options={documentOptions}
            loading={null}
            error={<PdfFallback href={directHref} title={title} />}
            onLoadSuccess={({ numPages: loadedPages }) => {
              setNumPages(loadedPages);
              setHasError(false);
            }}
            onLoadError={(error) => {
              console.error("PDF canvas render failed", error);
              setHasError(true);
            }}
            className="mx-auto flex min-h-full justify-center"
          >
            <Page
              pageNumber={renderedPage}
              width={containerWidth}
              renderAnnotationLayer
              renderTextLayer
              loading={
                <div className="flex min-h-[60vh] items-center justify-center text-muted-foreground">
                  <Loader2 className="h-7 w-7 animate-spin text-primary" />
                </div>
              }
              className="overflow-hidden rounded-2xl shadow-elegant"
            />
          </Document>
        )}
      </div>
    </div>
  );
}

function PdfFallback({ href, title }: { href: string; title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md rounded-3xl glass p-8 shadow-elegant">
        <p className="font-serif text-2xl font-semibold text-foreground">Open the PDF directly</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your browser blocked the in-app PDF stream, but the document can still be opened cleanly in a new tab.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in a new tab`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Open PDF in New Tab
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}