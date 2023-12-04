import * as React from "react";
import { Container } from "./";
import { Avatar } from "../avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal } from "../icons";
import { IconButton } from "../icon-button";
import { Button } from "../button";
import { Dropdown } from "../dropdown";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
};

export default meta;

export const ListItem: StoryObj<typeof Container> = {
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

export const ListItemWithOnClick: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    onClick: () => {
      alert("clicked");
    },
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

export const ListItemWithChildren: StoryObj<typeof Container> = {
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
    children: <Button>This is a button</Button>,
  },
};

export const ListItemWithChildrenNoDivider: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    divider: false,
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
    children: <Button>This is a button</Button>,
  },
};

export const ListItemSimple: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
  },
};

export const Expandable: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    expandable: true,
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
    children: <Button>This is a button</Button>,
  },
};
