import { Stack } from '.'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
}

export default meta

export const Default: StoryObj<typeof Stack> = {
  args: {
    children: [<div>Have a nice day!</div>, <div>Have a nice day!</div>],
  },
}
