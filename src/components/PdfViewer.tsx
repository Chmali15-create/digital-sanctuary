import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
}

export function PdfViewer({ url, title, page }: PdfViewerProps) {
  const { t } = useI18n();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let createdUrl: string | null = null;
    setBlobUrl(null);
    setProgress(0);
    setError(null);

    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body?.getReader();
        if (!reader) {
          const blob = await res.blob();
          if (cancelled) return;
          createdUrl = URL.createObjectURL(blob);
          setBlobUrl(createdUrl);
          setProgress(100);
          return;
        }
        const chunks: BlobPart[] = [];
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value as BlobPart);
            received += value.length;
            if (total) setProgress(Math.min(99, Math.round((received / total) * 100)));
            else setProgress((p) => Math.min(95, p + 3));
          }
        }
        if (cancelled) return;
        const blob = new Blob(chunks, { type: "application/pdf" });
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
        setProgress(100);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load PDF");
      }
    })();

    return () => {
      cancelled = true;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, [url]);

  const viewerSrc = blobUrl ? `${blobUrl}#page=${page ?? 1}&view=FitH` : "";

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      {!blobUrl && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30 blur-xl" />
            <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <p className="font-serif text-xl text-foreground">{t("loading")}</p>
            <p className="text-sm text-muted-foreground">{t("fetching")} “{title}”</p>
          </div>
          <div className="h-1.5 w-64 overflow-hidden rounded-full bg-secondary/40">
            <div
              className="h-full bg-gradient-gold transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs tabular-nums text-muted-foreground">{progress}%</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <div>
            <p className="font-serif text-lg text-foreground">{t("unableLoad")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-foreground hover:ring-gold"
          >
            {t("tryDirect")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
      {blobUrl && (
        <iframe
          src={viewerSrc}
          title={title}
          className="h-full w-full rounded-3xl bg-background"
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}