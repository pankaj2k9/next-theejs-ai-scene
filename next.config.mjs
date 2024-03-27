/** @type {import('next').NextConfig} */
// next.config.mjs

// ES Module syntax to set up your Next.js configuration
const nextConfig = {
    reactStrictMode: true,
    // other Next.js config options
    
    // Async headers function
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application
          source: "/:path*",
          headers: [
            { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  


// /** @type {import('next').NextConfig} */
// import withTM from 'next-transpile-modules';

// const modulesToTranspile = ['three'];

// const nextConfig = {
// };

// export default withTM(modulesToTranspile)(nextConfig);

// const withTM = require('next-transpile-modules')(['three']);

// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   // Your Next.js configuration
// };

// module.exports = withTM(nextConfig);
