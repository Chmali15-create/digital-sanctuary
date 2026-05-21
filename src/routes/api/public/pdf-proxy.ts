import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_HOSTS = new Set([
  "github.com",
  "objects.githubusercontent.com",
  "raw.githubusercontent.com",
  "release-assets.githubusercontent.com",
]);

export const Route = createFileRoute("/api/public/pdf-proxy")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const target = searchParams.get("url");
        if (!target) {
          return new Response("Missing url", { status: 400 });
        }

        let parsed: URL;
        try {
          parsed = new URL(target);
        } catch {
          return new Response("Invalid url", { status: 400 });
        }

        if (!ALLOWED_HOSTS.has(parsed.hostname)) {
          return new Response("Host not allowed", { status: 403 });
        }

        const upstream = await fetch(parsed.toString(), {
          redirect: "follow",
          headers: { Accept: "application/pdf,*/*" },
        });

        if (!upstream.ok || !upstream.body) {
          return new Response("Upstream failed", { status: 502 });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline",
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
    },
  },
});