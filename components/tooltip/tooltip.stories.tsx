import * as React from "react";
import { Button } from "../button";
import { Tooltip } from "./";

const meta = {
  title: "Foundation/Tooltip",
};
export default meta;

export const Default = () => {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
};
