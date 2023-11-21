import { Form } from "./";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Form> = {
  title: "Component/Form",
  component: Form,
};

export default meta;

export const Default: StoryObj<typeof Form> = {
  args: {
    defaultValues: {
      name: "name",
      select: "hu",
      nested_stuff: {
        something: "asd",
        somethingElse: "usa",
      },
    },
    fields: {
      name: { label: "Name", type: "text" },
      select: {
        label: "Country",
        type: "select",
        options: [
          { label: "Hungary", value: "hu", prefix: "🇭🇺" },
          { label: "USA", value: "usa", prefix: "🇺🇸" },
        ],
      },
      "nested_stuff.something": { label: "Nested name", type: "text" },
      "nested_stuff.somethingElse": {
        label: "Nester country",
        type: "select",
        options: [
          { label: "Hungary", value: "hu", prefix: "🇭🇺" },
          { label: "USA", value: "usa", prefix: "🇺🇸" },
        ],
      },
    },
    onChange: (values) => {
      console.log(values);
    },
  },
};
