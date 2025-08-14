/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/:path*",
          has: [{ type: "host", value: "shieldinternet.org" }],
          destination: "https://www.computers4people.org/shield",
          permanent: true,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "www.shieldinternet.org" }],
          destination: "https://www.computers4people.org/shield",
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  