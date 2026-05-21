interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
  /**
   * Front-matter offset: how many pages precede the book's own page 1
   * inside the PDF. Defaults to 0 so the very first page of the PDF
   * (cover) is treated as "Page 1" in our UI.
   */
  pageOffset?: number;
}

export const PDF_SOURCE_URL =
  "https://github.com/Chmali15-create/digital-sanctuary/releases/download/v2.0/KHUTBAAT_E_HAKEEM_UL_UMMAT_VOL_03.pdf";

export function PdfViewer({ url, title, page, pageOffset = 0 }: PdfViewerProps) {
  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);
  const sourceUrl = url || PDF_SOURCE_URL;
  const iframeSrc = `${sourceUrl}#page=${targetPage}&view=FitH`;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[60%]">{title}</p>
      </div>

      <div className="relative h-[calc(100%-3rem)] bg-background/70">
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title={title}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          className="h-full w-full bg-background"
        />
      </div>
    </div>
  );
}