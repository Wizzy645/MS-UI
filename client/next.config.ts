import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Add this block to disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add any other config options here, if needed
  reactStrictMode: true,
};

export default nextConfig;
