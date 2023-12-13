import * as React from 'react'
import { Badge } from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { IconSmallBolt } from '../Icons'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
}

export default meta

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'informative',
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const PrefixAndSuffix: StoryObj<typeof Badge> = {
  args: {
    children: "I'm a badge",
    size: 'regular',
    color: 'informative',
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
