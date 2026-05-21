import { createFileRoute } from "@tanstack/react-router";

const ALLOWED_HOSTS = new Set([
  "github.com",
  "release-assets.githubusercontent.com",
  "objects.githubusercontent.com",
  "raw.githubusercontent.com",
  "cdn.jsdelivr.net",
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
          headers: {
            // Forward range for partial requests (pdf.js streaming)
            ...(request.headers.get("range") ? { range: request.headers.get("range")! } : {}),
          },
          redirect: "follow",
        });

        const headers = new Headers();
        headers.set("content-type", "application/pdf");
        headers.set("access-control-allow-origin", "*");
        headers.set("access-control-expose-headers", "content-length, content-range, accept-ranges");
        headers.set("cache-control", "public, max-age=3600");
        const len = upstream.headers.get("content-length");
        const range = upstream.headers.get("content-range");
        const ar = upstream.headers.get("accept-ranges");
        if (len) headers.set("content-length", len);
        if (range) headers.set("content-range", range);
        if (ar) headers.set("accept-ranges", ar);

        return new Response(upstream.body, { status: upstream.status, headers });
      },
    },
  },
});