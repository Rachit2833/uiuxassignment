/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nwsfywcbwulcsggurrwc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/Profile//**",
      },
    ],
  },
};

export default nextConfig;
