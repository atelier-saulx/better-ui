import { SetInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SetInput> = {
  title: 'Inputs/SetInput',
  component: SetInput,
}

export default meta

export const Default: StoryObj<typeof SetInput> = {
  args: {
    fieldItemType: 'number',
    label: 'Set Numbers',
    description: 'A set with numbers',
    value: [1, 2, 3, 6, 9],
    disabled: false,
  },
}

export const Strings: StoryObj<typeof SetInput> = {
  args: {
    label: 'Set of strings',
    description: 'A set with strings',
    value: ['flurp', 'snurp', 'derp'],
    onChange: (v) => {},
  },
}

export const Options: StoryObj<typeof SetInput> = {
  args: {
    label: 'Options',
    description: 'Set with predefined options',
    options: ['cars', 'drinks', 'animals', 'shoes', 'bags'],
    onChange: (v) => {},
  },
}
