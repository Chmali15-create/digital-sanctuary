import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);

  useEffect(() => {
    const controller = new AbortController();
    let createdUrl: string | null = null;

    setIsFetching(true);
    setHasError(false);
    setBlobUrl(null);

    async function loadPdf() {
      const proxyUrl = `/api/public/pdf-proxy?url=${encodeURIComponent(url)}`;
      try {
        const response = await fetch(proxyUrl, { signal: controller.signal });
        if (!response.ok) throw new Error(`Proxy responded ${response.status}`);
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: "application/pdf" });
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("PDF stream failed", error);
          setHasError(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsFetching(false);
      }
    }

    void loadPdf();
    return () => {
      controller.abort();
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [url]);

  const iframeSrc = blobUrl ? `${blobUrl}#page=${targetPage}&view=FitH` : null;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[60%]">{title}</p>
      </div>

      <div className="relative h-[calc(100%-3rem)] bg-background/70">
        {isFetching && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="font-serif text-lg text-foreground">Preparing your reading...</p>
          </div>
        )}

        {hasError && !isFetching && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="font-serif text-lg text-foreground">
              We couldn't stream the PDF right now. Please try again in a moment.
            </p>
          </div>
        )}

        {iframeSrc && !hasError && (
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title={title}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            className="h-full w-full bg-background"
          />
        )}
      </div>
    </div>
  );
}