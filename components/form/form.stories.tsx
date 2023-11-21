import { Form } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Form> = {
  title: "Component/Form",
  component: Form,
};

export default meta;

export const Default: StoryObj<typeof Form> = {
  args: {
    fields: {
      name: { label: "Name", type: "text" },
      select: { label: "Country", type: "select" },
      "nested_stuff.something": { label: "Nested name", type: "text" },
      "nested_stuff.somethingElse": { label: "Nester country", type: "select" },
    },
  },
};
