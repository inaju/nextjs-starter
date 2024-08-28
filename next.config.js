/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  env: {
    NEXT_IMGBB_API_KEY: process.env.NEXT_IMGBB_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
  },
  transpilePackages: ["geist"],
  images: {
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: '/*/**',
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: '/*/**',
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: '/*/**',
      },
    ],
  },
}

module.exports = nextConfig
