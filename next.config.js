/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
    ],
  },
};

module.exports = nextConfig;