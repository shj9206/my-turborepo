const { join, dirname, resolve } = require("path");

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../apps/web/app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "../../../apps/web"),
    };
    // JSX transform 설정
    config.esbuild = config.esbuild || {};
    config.esbuild.jsx = "automatic";
    return config;
  },
};

module.exports = config;
