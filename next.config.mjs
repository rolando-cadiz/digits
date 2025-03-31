/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'github.com',
        },
        {
          protocol: 'https',
          hostname: 'avatars0.githubusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'www.ics.hawaii.edu',
        },
      ],
    },
  };
  
  export default nextConfig;
  