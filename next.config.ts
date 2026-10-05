import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Pas d’en-tête « X-Powered-By: Next.js » : rien à annoncer aux visiteurs. */
  poweredByHeader: false,
};

export default nextConfig;
