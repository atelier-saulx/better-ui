import * as React from "react";
import { Button } from "./";
import type { Meta, StoryObj } from "@storybook/react";
import { Copy } from "../icons";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    variant: "primary",
    size: "medium",
    onClick: () => {
      alert("hello");
    },
  },
};

export const PrefixAndSuffix: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    variant: "primary",
    size: "medium",
    prefix: <Copy />,
    suffix: <Copy />,
    onClick: () => {
      alert("hello");
    },
  },
};

export const AsyncOnClick: StoryObj<typeof Button> = {
  args: {
    children: "Click",
    variant: "primary",
    size: "medium",
    prefix: <Copy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
      throw new Error("something went bad");
    },
  },
};
