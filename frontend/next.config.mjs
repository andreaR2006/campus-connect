/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: true,
  experimental:{
    appDir: true,
  },
};


export default nextConfig;