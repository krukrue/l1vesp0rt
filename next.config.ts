import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.livesport.cz",
        pathname: "/res/image/data/**",
      },
    ],
  },
};

export default nextConfig;
