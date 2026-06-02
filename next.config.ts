import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  env: {
    RUNWAYML_API_SECRET: process.env.RUNWAYML_API_SECRET,
  },
};
export default nextConfig;