// tailwind.config.js
// 이 파일은 Storybook용 레거시 설정입니다.
// 새로운 설정은 packages/ui/tailwind.config.ts를 참조하세요.

const { uiPreset } = require('./packages/ui/tailwind.config.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./apps/storybook/.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [uiPreset],
  plugins: [],
};
