import { createFileRoute, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { PdfViewer } from "@/components/PdfViewer";
import { getSermon, getSermonTopic, type Sermon, type Topic } from "@/lib/library-data";

export const Route = createFileRoute("/sermons/$topicId/$sermonId")({
  loader: ({ params }): { sermon: Sermon; topic: Topic } => {
    const sermon = getSermon(params.sermonId);
    const topic = getSermonTopic(params.topicId);
    if (!sermon || !topic) throw notFound();
    return { sermon, topic };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.sermon.title ?? "Sermon"} — Lumen Library` }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      Sermon not found
    </div>
  ),
  component: SermonReader,
});

function SermonReader() {
  const { sermon, topic } = Route.useLoaderData() as { sermon: Sermon; topic: Topic };
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar
        to="/sermons/$topicId"
        params={{ topicId: topic.id }}
        label={sermon.title}
        eyebrow={`${sermon.preacher} · Ref. ${sermon.referenceBook}, p. ${sermon.pageNumber}`}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-3 py-6 sm:px-6">
        <PdfViewer url={sermon.pdfUrl} title={sermon.title} page={sermon.pageNumber} />
      </main>
    </div>
  );
}