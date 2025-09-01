import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  domains:[process.env.MEDIA_HOST_NAME!]
 }
};

export default nextConfig;
