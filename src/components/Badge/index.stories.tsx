import * as React from 'react'
import { Badge, IconSmallBolt } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Badge> & { description: string } = {
  title: 'Atoms/Badge',
  description: 'Hello bla',
  component: Badge,
}

export default meta

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'auto-muted',
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const PrefixAndSuffix: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'auto',
    prefix: <IconSmallBolt />,
    suffix: <IconSmallBolt />,
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const Copyable: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a copyable badge",
    size: 'regular',
    color: 'informative',
    prefix: <IconSmallBolt />,
    copyValue: 'this got copied from a badge',
  },
  argTypes: {
    color: { control: 'select' },
  },
}
