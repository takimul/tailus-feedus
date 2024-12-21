// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["www.themealdb.com"],
//   },
// };

// export default nextConfig;


//update 1

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.themealdb.com"], // Allows Next.js to optimize images from this domain
  },
  reactStrictMode: true,  // Enables React Strict Mode (optional, but recommended)
  swcMinify: true,       // Uses SWC for minification, which is faster than Terser
};

export default nextConfig;
