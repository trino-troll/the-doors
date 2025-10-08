import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['https://lemur-moving-perch.ngrok-free.app'],
    experimental: {
        useCache: true,
    },
};

export default nextConfig;
