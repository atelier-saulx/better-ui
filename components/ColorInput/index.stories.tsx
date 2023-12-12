import * as React from "react";
import { ColorInput } from "./";

const meta = {
  title: "Atoms/Inputs/(WIP) ColorInput ",
};
export default meta;

export const Default = () => {
  return <ColorInput label="Background color" />;
};

export const Small = () => {
  return <ColorInput variant="small" />;
};

export const Error = () => {
  return <ColorInput error />;
};
