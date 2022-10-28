/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
};
