import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['trippant-samira-shiny.ngrok-free.dev'],
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${BACKEND_URL}/auth/:path*`,
      },
      {
        source: '/mission',
        destination: `${BACKEND_URL}/mission`,
      },
      {
        source: '/player-missions/:path*',
        destination: `${BACKEND_URL}/player-missions/:path*`,
      },
      {
        source: '/user/:path*',
        destination: `${BACKEND_URL}/user/:path*`,
      },
      {
        source: '/socket.io/:path*',
        destination: `${BACKEND_URL}/socket.io/:path*`,
      },
    ];
  },
};

export default nextConfig;
