/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Replit's iframe proxy to load the dev server
  allowedDevOrigins: ['*'],
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // Disable the dev origin check via headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
