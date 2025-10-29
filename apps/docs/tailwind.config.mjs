import { uiPreset } from "@repo/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [uiPreset],
  theme: {
    extend: {
      // docs 앱 전용 추가 커스터마이징
    },
  },
  plugins: [],
};
