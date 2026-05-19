import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Lumen Library" },
      { name: "description", content: "Indexed sermons grouped by spiritual theme." },
    ],
  }),
  component: () => <Outlet />,
});
