/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["picsum.photos", "images.unsplash.com"], // add all external image hosts you use
  },
};

module.exports = nextConfig;
