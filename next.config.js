/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MOCK_API_KEY: process.env.MOCK_API_KEY,
    API_KEY: process.env.API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
