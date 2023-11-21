import { TextInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextInput> = {
  title: "Foundation/TextInput",
  component: TextInput,
};

export default meta;

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: "Placeholder text",
    label: "Label",
  },
};
