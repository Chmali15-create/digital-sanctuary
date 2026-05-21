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
  const appPage = Math.max(1, page ?? 49);
  const targetPage = Math.max(1, appPage + pageOffset);

  const gviewSrc = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true#page=${targetPage}`;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <div className="flex h-12 items-center justify-between border-b border-border/40 px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Page {appPage}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[60%]">{title}</p>
      </div>

      <div className="relative h-[calc(100%-3rem)] bg-background/70">
        <iframe
          key={gviewSrc}
          src={gviewSrc}
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