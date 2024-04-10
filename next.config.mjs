import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: {
    threshold: 0.05,
    skip: ["useBadHook", /badVariable/g],
  },
};

export default million.next(nextConfig, millionConfig);
