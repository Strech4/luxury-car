import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '5pbobm981t.ufs.sh',
        port: '',
      },
    ],
  },
};

export default nextConfig;
