import { SelectInput } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SelectInput> = {
  title: "Component/SelectInput",
  component: SelectInput,
};

export default meta;

export const Default: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: "Select something",
    label: "Favourite fruit",
    options: [
      {
        label: "Orange",
        value: "orange",
        prefix: "🍊",
      },
      {
        label: "Banana",
        value: "banana",
        prefix: "🍌",
      },
      ...Array.from({ length: 100 }).map((_, i) => ({
        label: `Apple ${i}`,
        value: `apple-${i}`,
        prefix: "🍎",
      })),
    ],
  },
};
