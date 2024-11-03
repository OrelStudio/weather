/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orelstudio.github.io'
      }
    ]
  }
};

export default nextConfig;
