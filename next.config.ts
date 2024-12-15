import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/server-side-page',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
