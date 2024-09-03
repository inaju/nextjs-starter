/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  env: {
    NEXT_AWS_ACCESS_KEY: process.env.NEXT_AWS_ACCESS_KEY,
    NEXT_AWS_SECRET_KEY: process.env.NEXT_AWS_SECRET_KEY,
    NEXT_IMGBB_API_KEY: process.env.NEXT_IMGBB_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY: process.env.R2_ACCESS_KEY,
    R2_SECRET_KEY: process.env.R2_SECRET_KEY,
    R2_BUCKET: process.env.R2_BUCKET,
  },
  transpilePackages: ["geist"],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ["komi-web.s3.us-east-2.amazonaws.com", "img.freepik.com", "i.ibb.co", "komi.c0ef8d154a5955ab7af6a8a756a2043f.r2.cloudflarestorage.com", "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
