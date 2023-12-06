import * as React from "react";
import { Dropdown } from "./";
import { Button } from "../button";
import { MoreVertical, Copy, Delete } from "../icons";

const meta = {
  title: "Atoms/Dropdown",
};
export default meta;

export const Default = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button shape="square" variant="neutral">
          <MoreVertical />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
          onClick={() => {
            alert("copy");
          }}
          icon={<Copy />}
        >
          Copy
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            alert("delete");
          }}
          icon={<Delete />}
        >
          Delete
        </Dropdown.Item>
        {Array.from({ length: 100 }).map((_, i) => (
          <Dropdown.Item
            onClick={() => {
              alert(`delete ${i}`);
            }}
            icon={<Delete />}
          >
            Delete {i}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  );
};
