import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'app', 'lib']
  },
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
