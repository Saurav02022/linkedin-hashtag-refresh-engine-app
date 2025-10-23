import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Optimize images for production
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.licdn.com",
        pathname: "/**",
      },
    ],
  },

  // Webpack configuration for Puppeteer
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "puppeteer-core": "commonjs puppeteer-core",
      });
    }
    return config;
  },
};

export default nextConfig;
