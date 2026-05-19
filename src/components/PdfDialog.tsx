import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, Eye, FileText, X } from "lucide-react";

interface PdfDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  page?: number;
  title: string;
}

export function PdfDialog({ open, onOpenChange, url, page, title }: PdfDialogProps) {
  const src = `${url}#page=${page ?? 1}`;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="z-50 max-w-6xl w-[95vw] p-0 gap-0 overflow-hidden rounded-2xl border-primary/20 bg-background/95 backdrop-blur-sm shadow-elegant"
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

        <div className="flex flex-col gap-3 p-4">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm text-primary/90 transition hover:bg-primary/10"
          >
            <Eye className="h-3.5 w-3.5" />
            PDF not loading? Click here to view directly
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="w-full h-[75vh] min-h-[500px] flex items-center justify-center bg-muted/20 rounded-lg overflow-hidden border border-border">
            {open && (
              <object data={src} type="application/pdf" className="w-full h-full">
                <iframe
                  src={src}
                  className="w-full h-full"
                  frameBorder={0}
                  title={title}
                />
              </object>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}