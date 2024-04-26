/** @type {import('next').NextConfig} */
const nextConfig = {
/*
  env: {
    BASE_URL_APP: 'fwaws01.fuzionworx.com',
    BASE_URL_API: 'fwaws01.fuzionworx.com',
  },
*/
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
/*
  async headers() {
    return [
      {
       // matching all API routes
       // https://vercel.com/guides/how-to-enable-cors
       source: "/api/:path*",
       headers: [
          {
            key: "Access-Control-Allow-Origin",
           value: "localhost,fwaws01.fuzionforx.com",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
         {
           key: "Access-Control-Allow-Credentials",
           value: "true"
         },
         {
            key: "Access-Control-Allow-Headers",
           value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
         },
       ],
      },
    ];
  },
*/
}

module.exports = nextConfig
