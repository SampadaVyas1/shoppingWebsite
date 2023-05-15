/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/login": { page: "/login" },
      "/home": { page: "/" },
      "/messages": { page: "/messages" },
      "/candidates": { page: "/candidates" },
      "/team": { page: "/team/recruiters" },
    };
  },
};

module.exports = nextConfig;
