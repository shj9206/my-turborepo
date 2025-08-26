// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "./apps/storybook/.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
