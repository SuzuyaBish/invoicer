/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com"
      },
      {
        protocol: "https",
        hostname: "dysejqtnehxxlhcerkrp.supabase.co"
      }
    ],
  },
}

module.exports = nextConfig
