import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: { extend: { colors: { oxblood: "#561C30", porcelain: "#F4EFE8", ink: "#180F15" } } },
  plugins: [],
};
export default config;
