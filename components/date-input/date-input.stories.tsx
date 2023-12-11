import * as React from "react";
import { DateInput } from "./";

const meta = {
  title: "Atoms/Inputs/(WIP) DateInput ",
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

export const SingleDateAndTime = () => {
  return (
    <DateInput
      time
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

export const DateRangeAndTime = () => {
  return (
    <DateInput
      range
      time
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
