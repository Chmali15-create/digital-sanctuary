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
  const embedSrc = `${sourceUrl}#page=${targetPage}&zoom=80`;

  return (
    <div className="w-full h-[calc(100vh-5rem)] overflow-hidden rounded-xl bg-[#1A1512]">
      <embed
        key={embedSrc}
        src={embedSrc}
        type="application/pdf"
        title={title}
        aria-label={`${title} — Page ${appPage}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}