import * as React from "react";
import { Button } from "."
import type { Meta, StoryObj } from "@storybook/react";
import { IconCopy } from "../Icons";
import { IconMoreVertical } from "../Icons";

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

export const IconOnly: StoryObj<typeof Button> = {
  args: {
    children: <IconMoreVertical />,
    variant: "neutral",
    size: "medium",
    shape: "square",
  },
};

export const IconOnlyNoBorder: StoryObj<typeof Button> = {
  args: {
    children: <IconCopy />,
    variant: "neutral-transparent",
    size: "small",
    shape: "square",
  },
};

export const Link: StoryObj<typeof Button> = {
  args: {
    children: "This is a link",
    variant: "neutral-link",
    size: "medium",
    shape: "square",
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
    prefix: <IconCopy />,
    suffix: <IconCopy />,
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
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
      throw new Error("something went bad");
    },
  },
};
