import { createFileRoute, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { BackBar } from "@/components/BackBar";
import { PdfViewer } from "@/components/PdfViewer";
import { getSermon, getSermonTopic, type Sermon, type Topic } from "@/lib/library-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sermons/$topicId/$sermonId")({
  loader: ({ params }): { sermon: Sermon; topic: Topic } => {
    const sermon = getSermon(params.sermonId);
    const topic = getSermonTopic(params.topicId);
    if (!sermon || !topic) throw notFound();
    return { sermon, topic };
  },
  notFoundComponent: () => <NotFound />,
  component: SermonReader,
});

function NotFound() {
  const { t } = useI18n();
  return <div className="flex min-h-screen items-center justify-center text-foreground">{t("notFoundSermon")}</div>;
}

function SermonReader() {
  const { sermon, topic } = Route.useLoaderData() as { sermon: Sermon; topic: Topic };
  const { t, tr } = useI18n();
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <BackBar
        to="/sermons/$topicId"
        params={{ topicId: topic.id }}
        label={tr(sermon.title)}
        eyebrow={`${tr(sermon.preacher)} · ${t("ref")} ${tr(sermon.referenceBook)}, ${t("page")} ${sermon.pageNumber}`}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-3 py-6 sm:px-6">
        <PdfViewer url={sermon.pdfUrl} title={tr(sermon.title)} page={sermon.pageNumber} />
      </main>
    </div>
  );
}
