import { Button } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
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

export const AsyncOnClick: StoryObj<typeof Button> = {
  args: {
    children: "Click",
    type: "primary",
    size: "medium",
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
      throw new Error("something went bad")
    },
  },
};
