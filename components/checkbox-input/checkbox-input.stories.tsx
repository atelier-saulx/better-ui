import { CheckboxInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckboxInput> = {
  title: "Atoms/CheckboxInput",
  component: CheckboxInput,
};

export default meta;

export const Checkbox: StoryObj<typeof CheckboxInput> = {
  args: {
    label: "Label",
    description: "This is the description",
  },
};

export const Toggle: StoryObj<typeof CheckboxInput> = {
  args: {
    label: "Label",
    description: "This is the description",
    defaultValue: true,
    variant: "toggle",
  },
};