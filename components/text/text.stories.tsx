import { Text } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
};

export default meta;

export const Default: StoryObj<typeof Text> = {
  args: {
    children: "Have a nice day!",
    variant: "normal400",
  },
};
