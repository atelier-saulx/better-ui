import { NumberInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

const meta: Meta<typeof NumberInput> = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
}

export default meta

export const Default = () => {
  const [value, setValue] = React.useState(10)

  return (
    <NumberInput
      placeholder="Placeholder"
      label="Label"
      description="Description"
      value={value}
      onChange={setValue}
    />
  )
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
