import type { NextConfig } from "next";
const apiBaseUrl = process.env.API_INTERNAL_URL ?? "http://localhost:8080";
const nextConfig: NextConfig = { agentRules: false, transpilePackages: ["@hexxon/brand", "@hexxon/ui"], async rewrites() { return [{ source: "/api/:path*", destination: `${apiBaseUrl}/:path*` }]; } };
export default nextConfig;
