/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "source.unsplash.com",
      "flowbite.s3.amazonaws.com",
    ],
  },

  async redirects() {
    return [
      {
        source: "/tour-turkmenistan-highlights",
        destination: "/tours/turkmenistan-highlights-tour",
        permanent: true,
      },
      {
        source: "/tour-uzbekistan-turkmenistan",
        destination: "/tours/uzbekistan-turkmenistan-tour",
        permanent: true,
      },
      {
        source: "/tour-tajikistan-mountain-highlights",
        destination: "/tours/tajikistan-mountain-highlights",
        permanent: true,
      },
      {
        source: "/tour-pamir-highway",
        destination: "/tours/pamir-highway-adventure",
        permanent: true,
      },
      {
        source: "/tour-kazakhstan-nature-highlights",
        destination: "/tours/kazakhstan-nature-highlights",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;