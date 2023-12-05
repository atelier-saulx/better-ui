import { Thumbnail } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Thumbnail> = {
  title: "Atoms/Thumbnail",
  component: Thumbnail,
};

export default meta;

export const Image: StoryObj<typeof Thumbnail> = {
  args: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "large",
    shape: "circle",
  },
};

export const Placeholder: StoryObj<typeof Thumbnail> = {
  args: {
    text: "AB",
    size: "large",
    shape: "square",
  },
};

export const Counter: StoryObj<typeof Thumbnail> = {
  args: {
    text: "AB",
    size: "large",
    shape: "square",
    count: 8,
  },
};
