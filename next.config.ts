import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/ai-tech',
        destination: '/category/ai-tech',
        permanent: true,
      },
      {
        source: '/smart-home',
        destination: '/category/smart-home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
