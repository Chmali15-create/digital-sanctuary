import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
}

export function PdfViewer({ url, title, page }: PdfViewerProps) {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);

  const viewerSrc = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true${
    page ? `#page=${page}` : ""
  }`;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30 blur-xl" />
            <Loader2 className="relative h-12 w-12 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <p className="font-serif text-xl text-foreground">{t("loading")}</p>
            <p className="text-sm text-muted-foreground">{t("fetching")} “{title}”</p>
          </div>
        </div>
      )}
      <iframe
        src={viewerSrc}
        title={title}
        onLoad={() => setLoaded(true)}
        className="h-full w-full rounded-3xl bg-background"
        style={{ border: 0 }}
      />
    </div>
  );
}