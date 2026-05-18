import { createFileRoute, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { PdfViewer } from "@/components/PdfViewer";
import { getBook, getBookTopic } from "@/lib/library-data";

export const Route = createFileRoute("/books/$topicId/$bookId")({
  loader: ({ params }) => {
    const book = getBook(params.bookId);
    const topic = getBookTopic(params.topicId);
    if (!book || !topic) throw notFound();
    return { book, topic };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.book.title ?? "Reading"} — Lumen Library` }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Book not found
    </div>
  ),
  component: BookReader,
});

function BookReader() {
  const { book, topic } = Route.useLoaderData();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar
        to="/books/$topicId"
        params={{ topicId: topic.id }}
        label={book.title}
        eyebrow={`${book.author} · ${topic.title}`}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-3 py-6 sm:px-6">
        <PdfViewer url={book.pdfUrl} title={book.title} />
      </main>
    </div>
  );
}