/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
      // Disable the 'react/no-unescaped-entities' rule for the build
      rules: {
        'react/no-unescaped-entities': 'off',
      },
    },
  };
  
  export default nextConfig;
  