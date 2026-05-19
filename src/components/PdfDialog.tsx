import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, ExternalLink, Loader2, RotateCw, ShieldCheck, X } from "lucide-react";

interface PdfDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  page?: number;
  title: string;
}

const PDF_FILE_PATH = "/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf";
const PDF_DIRECT_SRC = "/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf#page=48";
const PDF_PAGE = 48;
const WORKER_SRC = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();

type PdfLoadingTask = {
  promise: Promise<{
    getPage: (pageNumber: number) => Promise<{
      getViewport: (options: { scale: number }) => { width: number; height: number };
      render: (options: {
        canvas: HTMLCanvasElement;
        canvasContext: CanvasRenderingContext2D;
        viewport: { width: number; height: number };
      }) => { cancel: () => void; promise: Promise<void> };
    }>;
  }>;
  destroy: () => Promise<void>;
};

export function PdfDialog({ open, onOpenChange, title }: PdfDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [viewerState, setViewerState] = useState<"loading" | "ready" | "fallback">("loading");
  const [retryKey, setRetryKey] = useState(0);
  const pdfTitle = title || "خطباتِ حکیم الامت - تفصیلِ دین";

  const openPdf = () => {
    const link = document.createElement("a");
    link.href = PDF_DIRECT_SRC;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setViewerState("loading");
      return;
    }

    let cancelled = false;
    let loadingTask: PdfLoadingTask | null = null;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    const renderPdf = async () => {
      try {
        setViewerState("loading");
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;

        loadingTask = pdfjs.getDocument(PDF_FILE_PATH) as unknown as PdfLoadingTask;
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(PDF_PAGE);
        const canvas = canvasRef.current;
        const frame = frameRef.current;
        const context = canvas?.getContext("2d");

        if (cancelled || !canvas || !frame || !context) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const availableWidth = Math.max(frame.clientWidth - 24, 320);
        const scale = Math.min(availableWidth / baseViewport.width, 1.65);
        const viewport = page.getViewport({ scale });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(outputScale, 0, 0, outputScale, 0, 0);
        const activeRenderTask = page.render({ canvas, canvasContext: context, viewport });
        renderTask = activeRenderTask;
        await activeRenderTask.promise;

        if (!cancelled) setViewerState("ready");
      } catch (error) {
        if (!cancelled) setViewerState("fallback");
      }
    };

    void renderPdf();

    return () => {
      cancelled = true;
      renderTask?.cancel();
      void loadingTask?.destroy();
    };
  }, [open, retryKey]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-50 bg-background/65 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 flex h-[92vh] w-[96vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-elegant duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:h-[90vh]">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-secondary/30 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <BookOpen className="h-5 w-5 shrink-0 text-primary" />
              <DialogTitle className="truncate font-serif text-base text-foreground sm:text-lg" dir="rtl">
                خطباتِ حکیم الامت - تفصیلِ دین
              </DialogTitle>
              <DialogDescription className="sr-only">
                PDF.js reader with protected fallback for blocked browser preview modes.
              </DialogDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setRetryKey((key) => key + 1)}
                aria-label="Reload PDF"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-foreground"
              >
                <RotateCw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div ref={frameRef} className="relative min-h-0 flex-1 overflow-auto bg-muted/20 p-3 sm:p-4">
            <div className="mx-auto flex min-h-[520px] w-full justify-center rounded-xl border border-border bg-background p-3 shadow-inner">
              {open && viewerState !== "fallback" && (
                <canvas ref={canvasRef} className="h-auto max-w-full self-start rounded-md bg-background shadow-lg" />
              )}
            </div>

            {viewerState === "loading" && (
              <div className="absolute inset-3 flex items-center justify-center rounded-xl border border-border bg-background/90 sm:inset-4">
                <div className="flex flex-col items-center gap-3 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="font-serif text-lg text-foreground">Preparing protected PDF viewer…</p>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Rendering page 48 securely inside the app with PDF.js, without iframe or object embeds.
                  </p>
                </div>
              </div>
            )}

            {viewerState === "fallback" && (
              <div className="absolute inset-3 flex items-center justify-center rounded-xl border border-border bg-background p-5 sm:inset-4">
                <div className="max-w-lg rounded-2xl border border-primary/25 bg-primary/5 p-6 text-center shadow-gold">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground">Secured PDF Browser Shield Active</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Your browser blocked the in-app PDF renderer in this sandbox. Opening it in a new sandboxed helper tab bypasses local iframe block limitations while keeping the direct file path intact.
                  </p>
                  <button
                    type="button"
                    onClick={openPdf}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition hover:-translate-y-0.5 sm:w-auto"
                  >
                    <BookOpen className="h-4 w-4" />
                    Open PDF in Protected Viewer
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <a
                    href={PDF_DIRECT_SRC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-xs text-primary/80 underline-offset-4 hover:underline"
                  >
                    Direct PDF link: /KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf#page=48
                  </a>
                </div>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}