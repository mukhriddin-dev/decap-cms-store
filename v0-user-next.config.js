/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "optim.tildacdn.com",
      },
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
    ],
  },
  // Next.js 15 uchun kerakli konfiguratsiyalar
  experimental: {
    serverComponentsExternalPackages: ["gray-matter", "remark", "remark-html"],
  },
  // React 19 bilan ishlash uchun
  reactStrictMode: true,
}

module.exports = nextConfig

