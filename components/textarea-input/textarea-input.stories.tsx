import { TextAreaInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextAreaInput> = {
  title: "Atoms/TextAreaInput",
  component: TextAreaInput,
};

export default meta;

export const Default: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: "Placeholder text",
    label: "Label",
  },
};

export const Small: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: "Placeholder text",
    variant: "small",
  },
};
