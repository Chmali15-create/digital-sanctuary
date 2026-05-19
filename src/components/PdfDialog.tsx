import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Download, ExternalLink, FileText, X } from "lucide-react";

interface PdfDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  page?: number;
  title: string;
}

export function PdfDialog({ open, onOpenChange, url, page, title }: PdfDialogProps) {
  const isMobile = useIsMobile();
  const [iframeFailed, setIframeFailed] = useState(false);
  const src = `${url}#page=${page ?? 1}&view=FitH`;

  useEffect(() => {
    if (!open) return;
    setIframeFailed(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const showFallback = isMobile || iframeFailed;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-6xl w-[95vw] p-0 gap-0 overflow-hidden rounded-2xl border-primary/20 bg-background/95 backdrop-blur-md shadow-elegant"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-5 w-5 shrink-0 text-primary" />
            <DialogTitle className="truncate font-serif text-base sm:text-lg text-foreground">
              {title}
            </DialogTitle>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {showFallback ? (
          <div className="flex flex-col items-center justify-center gap-5 p-10 text-center">
            <FileText className="h-12 w-12 text-primary" />
            <p className="max-w-sm text-sm text-muted-foreground">
              Your device may not preview PDFs inline. Open or download the file to continue reading.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> Open PDF
              </a>
              <a
                href={url}
                download
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-foreground transition hover:ring-gold"
              >
                <Download className="h-4 w-4" /> Download
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            className="h-[80vh] w-full bg-background"
            style={{ border: 0 }}
            onError={() => setIframeFailed(true)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}