import * as React from "react";
import { Container } from "./";
import { Thumbnail } from "../Thumbnail";
import type { Meta, StoryObj } from "@storybook/react";
import { IconMoreHorizontal } from "../Icons";
import { Button } from "../button";
import { Dropdown } from "../dropdown";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
};

export default meta;

// <SelectMenu items={['x','y','z', { value: 'root', label: 'bla'}]} onChange={(value: string) => {}} />

export const ListItem: StoryObj<typeof Container> = {
  args: {
    title: "This is a title",
    description: "This is a description",
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
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
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
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
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
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
    prefix: <Thumbnail text="AB" />,
    suffix: (
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button variant="neutral-transparent" shape="square">
            <IconMoreHorizontal />
          </Button>
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
