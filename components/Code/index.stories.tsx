import * as React from 'react'
import { Code } from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { IconSmallBolt } from '../Icons'

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
}

export default meta

export const Default: StoryObj<typeof Code> = {
  args: {
    value: "I'm a badge",
    color: 'dimmer',
  },
  argTypes: {
    color: { control: 'select' },
  },
}
