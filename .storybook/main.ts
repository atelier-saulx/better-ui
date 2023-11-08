import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.tsx"],
  addons: ["@storybook/addon-controls", "@storybook/addon-viewport"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};

export default config;
