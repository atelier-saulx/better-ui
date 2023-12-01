import { Header } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof Header> = {
  args: {},
};
