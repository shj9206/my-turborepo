import type { Preview } from "@storybook/react";
import React from "react";
import "../src/index.css";
import { ViewProvider } from "../../../apps/web/app/_provider/viewProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ViewProvider>
        <Story />
      </ViewProvider>
    ),
  ],
};

export default preview;
