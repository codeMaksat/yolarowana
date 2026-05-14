/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["localhost", "images.unsplash.com", "flowbite.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;

//"http://localhost:3000/",
