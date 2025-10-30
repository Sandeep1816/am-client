import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.freepik.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
  experimental: {
    // turbo: false, // disables Turbopack, fallback to Webpack
  },
};

export default nextConfig;
