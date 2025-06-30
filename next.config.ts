import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optionally, you can specify pathname patterns if needed
        // pathname: '/dut0oeco5/image/upload/**',
      },
    ],
    // Optional: Configure image quality and formats
    formats: ['image/avif', 'image/webp'],
    // Optional: Configure device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default nextConfig;
