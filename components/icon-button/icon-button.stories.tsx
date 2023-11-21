import * as React from "react";
import { IconButton } from "./";
import { MoreVertical } from "../icons";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconButton> = {
  title: "Foundation/IconButton",
  component: IconButton,
};

export default meta;

export const Default: StoryObj<typeof IconButton> = {
  args: {
    children: <MoreVertical />,
    type: "primary",
    size: "medium",
    onClick: () => {
      alert("hello");
    },
  },
};
