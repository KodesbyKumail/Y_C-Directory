import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    ppr: 'incremental'
   },
   devIndicators:{
    appIsrStatus:true,
    buildActivity:true,
    buildActivityPosition: 'bottom-right',
   },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
   },
};

export default nextConfig;
