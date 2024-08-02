/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    MODEL_AI: process.env.MODEL_AI,
    TEMPERATURE_AI: process.env.TEMPERATURE_AI,
    MAX_TOKENS_AI: process.env.MAX_TOKENS_AI,
  },
};

export default nextConfig;
