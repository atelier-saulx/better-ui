import { CheckboxInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CheckboxInput> = {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
}

export default meta

export const Checkbox: StoryObj<typeof CheckboxInput> = {
  args: {
    label: 'Label',
    description: 'This is the description',
    disabled: false,
  },
}

export const Toggle: StoryObj<typeof CheckboxInput> = {
  args: {
    label: 'Label',
    description: 'This is the description',
    defaultValue: true,
    variant: 'toggle',
    disabled: false,
  },
}
