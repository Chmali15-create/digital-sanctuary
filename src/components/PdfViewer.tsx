interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
}

export function PdfViewer({ url, title, page }: PdfViewerProps) {
  const viewerSrc = `https://docs.google.com/gview?url=${url}&embedded=true${
    page ? `#page=${page}` : ""
  }`;

  return (
    <div className="relative h-[calc(100vh-5rem)] w-full overflow-hidden rounded-3xl glass-strong shadow-elegant">
      <iframe
        src={viewerSrc}
        title={title}
        className="absolute inset-0 h-full w-full rounded-3xl bg-background"
        style={{ border: 0 }}
      />
      <embed
        src={url}
        type="application/pdf"
        className="absolute inset-0 -z-10 h-full w-full rounded-3xl"
      />
    </div>
  );
}