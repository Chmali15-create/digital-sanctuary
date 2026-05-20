interface PdfViewerProps {
  url: string;
  title: string;
  page?: number;
}

export function PdfViewer({ url, title, page }: PdfViewerProps) {
  const src = page ? `${url}#page=${page}` : url;
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