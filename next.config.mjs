/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:8080/api",
    BASE_URL: "http://localhost:3000",
    IMAGE_URL: "http://localhost:8080/images",
  },
};

export default nextConfig;
