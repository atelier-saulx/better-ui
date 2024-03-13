import { RangeInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RangeInput> = {
  title: 'Inputs/RangeInput',
  component: RangeInput,
}

export default meta

export const Default: StoryObj<typeof RangeInput> = {
  args: {
    label: 'Label',
    description: "What's your number?",
    max: 400,
    value: 40,
    step: 40,
    prefix: '🐸',
    showMinMaxNumber: true,
    alwaysShowLabel: true,
    onChange: (value) => {
      console.log(value)
    },
    // disabled: true,
  },
}

export const Example: StoryObj<typeof RangeInput> = {
  args: {
    label: 'Label',
    description: "What's your number?",
    alwaysShowLabel: true,
    showMinMaxNumber: true,
    onChange: (value) => {
      console.log(value)
    },
    disabled: false,
    items: [
      { id: 'x', title: 'Doctor X', index: 0 },
      { id: 'doom', title: 'Dr. Doom', index: 1 },
      { id: 'mario', title: 'Super Mario World', index: 2 },
    ],
  },
}
