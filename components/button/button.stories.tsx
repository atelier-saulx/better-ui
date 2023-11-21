import { Button } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Foundation/Button",
  component: Button,
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    type: "primary",
    size: "medium",
    onClick: () => {
      alert("hello");
    },
  },
};
