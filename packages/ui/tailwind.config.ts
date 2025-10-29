import type { Config } from "tailwindcss";
import colors from "./src/colors";

// UI 패키지의 Tailwind 프리셋
const uiPreset: Partial<Config> = {
  theme: {
    extend: {
      colors,
      // 추가 커스터마이징
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.625rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        "custom-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "custom-md":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "custom-lg":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
};

// UI 패키지 자체 설정
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [uiPreset as Config],
  plugins: [],
};

export default config;
export { uiPreset };
