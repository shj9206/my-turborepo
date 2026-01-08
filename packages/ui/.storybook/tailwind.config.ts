import { uiPreset } from "../tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../../apps/web/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../../apps/web/service/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [uiPreset],
};

