import { createFileRoute, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { PdfViewer } from "@/components/PdfViewer";
import { getBook, getBookTopic, type Book, type Topic } from "@/lib/library-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/books/$topicId/$bookId")({
  loader: ({ params }): { book: Book; topic: Topic } => {
    const book = getBook(params.bookId);
    const topic = getBookTopic(params.topicId);
    if (!book || !topic) throw notFound();
    return { book, topic };
  },
  notFoundComponent: () => <NotFound />,
  component: BookReader,
});

function NotFound() {
  const { t } = useI18n();
  return <div className="flex min-h-screen items-center justify-center text-foreground">{t("notFoundBook")}</div>;
}

function BookReader() {
  const { book, topic } = Route.useLoaderData() as { book: Book; topic: Topic };
  const { tr } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar
        to="/books/$topicId"
        params={{ topicId: topic.id }}
        label={tr(book.title)}
        eyebrow={`${tr(book.author)} · ${tr(topic.title)}`}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-3 py-6 sm:px-6">
        <PdfViewer url={book.pdfUrl} title={tr(book.title)} />
      </main>
    </div>
  );
}
