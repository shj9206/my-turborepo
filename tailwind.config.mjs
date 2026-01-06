// tailwind.config.mjs
// 이 파일은 Storybook용 설정입니다.
// 새로운 설정은 packages/ui/tailwind.config.ts를 참조하세요.

import {
  red,
  orange,
  yellow,
  lime,
  green,
  teal,
  turquo,
  aqua,
  blue,
  pink,
  purple,
  gray,
} from "./packages/ui/src/colors/data.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./apps/storybook/.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red,
        orange,
        yellow,
        lime,
        green,
        teal,
        turquo,
        aqua,
        blue,
        pink,
        purple,
        gray,
      },
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
  plugins: [],
};
