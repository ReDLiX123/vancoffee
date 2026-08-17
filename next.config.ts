import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "vancoffee";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactCompiler: true,
};

export default nextConfig;
