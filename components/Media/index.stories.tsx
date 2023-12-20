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
