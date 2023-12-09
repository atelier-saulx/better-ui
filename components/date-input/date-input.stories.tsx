import * as React from "react";
import { DateInput } from "./";

const meta = {
  title: "Atoms/(WIP) DateInput ",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

export const SingleDate = () => {
  return (
    <DateInput
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export const DateRange = () => {
  return (
    <DateInput
      range
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
