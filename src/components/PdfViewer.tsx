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
  const hash = targetPage ? `#page=${targetPage}&zoom=80` : "#zoom=80";
  const src = `${url}${hash}`;
  return (
    <div
      key="pdf-v3-fresh-stream"
      className="w-full h-[calc(100vh-130px)] bg-[#15110E] overflow-hidden rounded-xl border border-[#2C221E] shadow-2xl"
    >
      <embed
        src={src}
        type="application/pdf"
        title={title}
        className="w-full h-full border-none"
        style={{ pointerEvents: "auto" }}
      />
    </div>
  );
}