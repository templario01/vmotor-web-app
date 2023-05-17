/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "es.chrysler.com" }],
  },
};

module.exports = nextConfig;
