import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev-mode floating "N" indicator that shows in the
  // bottom-left during `next dev`. It's a dev-only artifact.
  devIndicators: false,
};

export default nextConfig;
