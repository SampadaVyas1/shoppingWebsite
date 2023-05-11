/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
