import { NumberInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NumberInput> = {
  title: "Atoms/NumberInput",
  component: NumberInput,
};

export default meta;

export const Default: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: "Placeholder text",
    label: "Label",
    step: 4,
    onChange: (value) => {
      console.log(value);
    },
  },
};
