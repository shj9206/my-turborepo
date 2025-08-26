import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  async viteFinal(config, { configType }) {
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    return config;
  },
};

export default config;
