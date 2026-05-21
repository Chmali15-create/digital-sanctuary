import { useEffect, useMemo, useState } from "react";
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

const PDF_SOURCE_URL =
  "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v2.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf";

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);
  const sourceUrl = PDF_SOURCE_URL;
  const iframeSrc = useMemo(
    () => (blobUrl ? `${blobUrl}#page=${targetPage}&view=FitH` : null),
    [blobUrl, targetPage],
  );

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadPdf() {
      setIsFetching(true);
      setHasError(false);
      setBlobUrl((currentUrl) => {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        return null;
      });

      try {
        const response = await fetch(sourceUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Unable to load PDF (${response.status})`);
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

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[60%]">{title}</p>
      </div>

      <div className="relative h-[calc(100%-3rem)] bg-background/70">
        {isFetching && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
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