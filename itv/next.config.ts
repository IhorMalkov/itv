import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('puppeteer', 'puppeteer-extra', 'puppeteer-extra-plugin-stealth');
        }
        return config;
    }
};

export default nextConfig;
