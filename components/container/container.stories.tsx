import * as React from "react";
import { Container } from "./";
import { Avatar } from "../avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal } from "../icons";
import { IconButton } from "../icon-button";
import { Dropdown } from "../dropdown";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
};

export default meta;

export const Default: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
  },
};

export const PrefixAndSuffix: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    prefix: <Avatar placeholder="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <IconButton type="secondary">
            <MoreHorizontal />
          </IconButton>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert("item 1 clicked");
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert("item 1 clicked");
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
  },
};

export const AlwaysExpanded: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    expandable: false,
    prefix: <Avatar placeholder="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <IconButton type="secondary">
            <MoreHorizontal />
          </IconButton>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item
            onClick={() => {
              alert("item 1 clicked");
            }}
          >
            Item 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              alert("item 1 clicked");
            }}
          >
            Item 2
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>
    ),
  },
};
