import * as React from "react";
import { Dropdown } from "./";
import { Button } from "../button";
import { IconMoreVertical, IconCopy, IconDelete } from "../icons";

const meta = {
  title: "Atoms/Dropdown",
};
export default meta;

export const Default = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button shape="square" variant="neutral">
          <IconMoreVertical />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
          onClick={() => {
            alert("copy");
          }}
          icon={<IconCopy />}
        >
          Copy
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            alert("delete");
          }}
          icon={<IconDelete />}
        >
          Delete
        </Dropdown.Item>
        {Array.from({ length: 100 }).map((_, i) => (
          <Dropdown.Item
            onClick={() => {
              alert(`delete ${i}`);
            }}
            icon={<IconDelete />}
          >
            Delete {i}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  );
};
