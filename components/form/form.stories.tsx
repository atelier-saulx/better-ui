import * as React from "react";
import { Form } from "./";

const meta = {
  title: "Component/Form",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        defaultValues={{
          name: "name",
          select: "hu",
          nested_stuff: {
            something: "asd",
            somethingElse: "usa",
          },
        }}
        fields={{
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
        }}
        onChange={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
};
