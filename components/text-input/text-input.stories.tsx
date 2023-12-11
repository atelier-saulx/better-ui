import { TextInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextInput> = {
  title: "Atoms/TextInput",
  component: TextInput,
};

export default meta;

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: "Placeholder text",
    label: "Label",
  },
};

export const Small: StoryObj<typeof TextInput> = {
  args: {
    placeholder: "Placeholder text",
    variant: "small",
  },
};
