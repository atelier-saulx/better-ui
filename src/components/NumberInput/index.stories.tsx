import { NumberInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof NumberInput> = {
  title: 'Atoms/Inputs/NumberInput',
  component: NumberInput,
}

export default meta

export const Default: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: "What's your number?",
    step: 4,
    onChange: (value) => {
      console.log(value)
    },
    disabled: true,
  },
}

export const Small: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof NumberInput> = {
  args: {
    placeholder: 'Placeholder text',
    error: true,
  },
}
