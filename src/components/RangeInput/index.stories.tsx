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
    // step: 4,
    onChange: (value) => {
      console.log(value)
    },
    disabled: false,
  },
}
