import { Button } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Component/Button",
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
