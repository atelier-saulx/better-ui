import * as React from "react";
import { Badge } from "./";
import type { Meta, StoryObj } from "@storybook/react";
import { BoltSmall } from "../icons";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    style: "regular",
    size: "regular",
    color: "informative",
    copyable: true,
  },
  argTypes: {
    color: { control: "select" },
  },
};

export const Prefix: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    style: "regular",
    size: "regular",
    color: "informative",
    copyable: true,
    prefix: <BoltSmall />,
  },
  argTypes: {
    color: { control: "select" },
  },
};
