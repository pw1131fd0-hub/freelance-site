import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance optimizations */
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  turbopack: {},
};

export default nextConfig;
