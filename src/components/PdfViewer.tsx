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
  // Map our 1-based "app page" (cover = 1) to the PDF's physical page.
  const targetPage = page ? Math.max(1, page + pageOffset) : undefined;
  const hash = targetPage ? `#page=${targetPage}` : "";
  // GitHub release assets redirect to azure blob storage with octet-stream and
 // attachment headers — Mozilla's hosted pdf.js can't embed them reliably.
  // Proxy those through our own same-origin endpoint so the viewer sees a
  // clean inline application/pdf response.
  const needsProxy = /(^|\.)github(usercontent)?\.com$/i.test(new URL(url).hostname);
  const fileUrl = needsProxy
    ? `/api/public/pdf-proxy?url=${encodeURIComponent(url)}`
    : url;
  const src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(fileUrl.startsWith("/") ? new URL(fileUrl, window.location.origin).toString() : fileUrl)}${hash}`;
  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className="h-full w-full rounded-3xl bg-background"
        style={{ border: "none" }}
      />
    </div>
  );
}