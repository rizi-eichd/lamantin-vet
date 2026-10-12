import type { NextConfig } from "next";
const staticHosting = process.env.NEXT_PUBLIC_STATIC_HOSTING === "true";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(staticHosting
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        images: { unoptimized: true },
        turbopack: { root: process.env.PAGES_PROJECT_ROOT },
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                { key: "X-Frame-Options", value: "DENY" },
              ],
            },
          ];
        },
      }),
};
export default nextConfig;
