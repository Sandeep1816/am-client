import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.freepik.com",           // previous domain
      "encrypted-tbn0.gstatic.com", // new domain
       "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;
