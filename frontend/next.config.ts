import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
   allowedDevOrigins: ["localhost"],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
