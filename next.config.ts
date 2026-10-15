import type { NextConfig } from "next";

const repoName = "assetPKK";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? `/${repoName}` : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
