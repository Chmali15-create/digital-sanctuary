import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_HOSTS = new Set([
  "github.com",
  "raw.githubusercontent.com",
  "objects.githubusercontent.com",
  "release-assets.githubusercontent.com",
]);

export const Route = createFileRoute("/api/public/pdf-proxy")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const target = url.searchParams.get("url");
        if (!target) return new Response("Missing url", { status: 400 });

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
          headers: { "User-Agent": "Mozilla/5.0 PdfProxy" },
        });
        if (!upstream.ok || !upstream.body) {
          return new Response("Upstream error", { status: 502 });
        }

        const headers = new Headers();
        headers.set("Content-Type", "application/pdf");
        const len = upstream.headers.get("content-length");
        if (len) headers.set("Content-Length", len);
        headers.set("Cache-Control", "public, max-age=86400");
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Content-Disposition", "inline");

        return new Response(upstream.body, { status: 200, headers });
      },
    },
  },
});