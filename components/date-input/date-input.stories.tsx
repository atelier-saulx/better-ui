import * as React from "react";
import { DateInput } from "./";

const meta = {
  title: "Atoms/Inputs/(WIP) DateInput ",
};
export default meta;

export const SingleDate = () => {
  return (
    <DateInput
      label="Single date"
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
      label="Single date and time"
      onChange={(value) => {
        console.log(value);
      }}
      defaultValue={new Date("1999/11/03 08:00").getTime()}
    />
  );
};

export const DateRange = () => {
  return (
    <DateInput
      range
      label="Range"
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
      label="Range and time"
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export const Error = () => {
  return (
    <DateInput
      error
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};

export const Small = () => {
  return (
    <DateInput
      variant="small"
      onChange={(value) => {
        console.log(value);
      }}
    />
  );
};
