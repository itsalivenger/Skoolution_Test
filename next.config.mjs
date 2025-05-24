import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve('./node_modules/.cache/webpack'),
      };
    }
    return config;
  },
};

export default nextConfig;
