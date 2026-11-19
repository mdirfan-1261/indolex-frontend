/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/who-we-serve/bank-officers',
        destination: '/who-we-serve/recovery-agents',
        permanent: true,
      },
      {
        source: '/who-we-serve/asset-reconstruction',
        destination: '/who-we-serve/resolution-professionals',
        permanent: true,
      },
      {
        source: '/who-we-serve/panel-advocates',
        destination: '/who-we-serve/legal-counsels',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;