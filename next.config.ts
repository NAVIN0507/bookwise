import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
      protocol:'https',
      hostname:"m.media-amazon.com"
      },
      {
        protocol:'https',
        hostname:'ik.imageKit.io',
        port:''
      }
    ]
  },
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true
  }
};


export default nextConfig;
