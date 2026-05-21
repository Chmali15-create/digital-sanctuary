import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

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

export const PDF_SOURCE_URL =
  "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v2.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03_compressed.pdf";

const REQUESTED_PDF_SOURCE_URL =
  "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v2.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf";

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isRendering, setIsRendering] = useState(false);
  const [hasError, setHasError] = useState(false);

  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);
  const sourceUrl = url || PDF_SOURCE_URL;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      setContainerSize({ width: element.clientWidth, height: element.clientHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;
    const sourceCandidates = Array.from(new Set([sourceUrl, REQUESTED_PDF_SOURCE_URL, PDF_SOURCE_URL]));

    async function loadPdf() {
      setIsFetching(true);
      setHasError(false);
      setBlobUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return null;
      });

      try {
        let response: Response | null = null;

        for (const candidate of sourceCandidates) {
          const proxiedSource = `/api/public/pdf-proxy?url=${encodeURIComponent(candidate)}`;
          response = await fetch(proxiedSource, { signal: controller.signal });
          if (response.ok) break;
        }

        if (!response?.ok) {
          throw new Error(`Unable to load PDF (${response?.status ?? "unknown"})`);
        }

        const responseBlob = await response.blob();
        objectUrl = URL.createObjectURL(responseBlob);
        setBlobUrl(objectUrl);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("PDF blob loading failed", error);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    }

    loadPdf();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [sourceUrl]);

  useEffect(() => {
    if (!blobUrl || !containerSize.width || !containerSize.height) return;

    let cancelled = false;
    let loadingTask: { promise: Promise<unknown>; destroy: () => Promise<void> } | null = null;
    let renderTask: { promise: Promise<void>; cancel: () => void } | null = null;

    async function renderPdfPage() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      setIsRendering(true);
      setHasError(false);

      try {
        const pdfjsLib = await import("pdfjs-dist/build/pdf.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

        loadingTask = pdfjsLib.getDocument({ url: blobUrl });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const pageNumber = Math.min(targetPage, pdf.numPages);
        const pdfPage = await pdf.getPage(pageNumber);
        if (cancelled) return;

        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const availableWidth = Math.max(320, container.clientWidth - 32);
        const availableHeight = Math.max(320, container.clientHeight - 32);
        const scale = Math.max(
          0.75,
          Math.min(2.4, availableWidth / baseViewport.width, availableHeight / baseViewport.height),
        );
        const viewport = pdfPage.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Canvas context unavailable");

        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        renderTask = pdfPage.render({ canvasContext: context, viewport });
        await renderTask.promise;
      } catch (error) {
        if (!cancelled && !(error instanceof Error && error.name === "RenderingCancelledException")) {
          console.error("PDF canvas rendering failed", error);
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    }

    renderPdfPage();

    return () => {
      cancelled = true;
      renderTask?.cancel();
      void loadingTask?.destroy();
    };
  }, [blobUrl, containerSize.height, containerSize.width, targetPage]);

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[60%]">{title}</p>
      </div>

      <div ref={containerRef} className="relative h-[calc(100%-3rem)] overflow-auto bg-background/70 p-4">
        {(isFetching || isRendering) && !hasError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/70 text-muted-foreground backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">PDF لوڈ ہو رہی ہے...</p>
          </div>
        )}

        {hasError && !isFetching && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-muted-foreground">
            <p className="font-serif text-lg text-foreground">PDF لوڈ نہیں ہو سکی</p>
            <p className="max-w-md text-sm">براہ کرم اوپر موجود براہ راست لنک آزمائیں۔</p>
          </div>
        )}

        {!hasError && (
          <div className="flex min-h-full items-center justify-center">
            <canvas
              ref={canvasRef}
              aria-label={title}
              className="max-w-full rounded-lg bg-card shadow-elegant"
            />
          </div>
        )}
      </div>
    </div>
  );
}