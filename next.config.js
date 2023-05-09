/** @type {import('next').NextConfig} */
const nextConfig = {
  icons: {
    unoptimized: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
      },
  ],
  },
};

module.exports = nextConfig;
