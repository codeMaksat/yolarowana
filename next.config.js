/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  experimental: {
    serverComponentsExternalPackages: ["@sparticuz/chromium"],

    outputFileTracingIncludes: {
      "/api/tours/[slug]/pdf": [
        "./node_modules/@sparticuz/chromium/bin/**/*",
      ],
    },
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@sparticuz/chromium");
    }

    return config;
  },
};

module.exports = nextConfig;