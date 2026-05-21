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
  const pdfJsSrc = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}${hash}`;
  const directSrc = `${url}${hash}`;
  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <object
        data={directSrc}
        type="application/pdf"
        width="100%"
        height="100%"
        className="h-full w-full rounded-3xl bg-background"
      >
        <iframe
          src={pdfJsSrc}
          title={title}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          className="h-full w-full rounded-3xl bg-background"
        />
      </object>
    </div>
  );
}