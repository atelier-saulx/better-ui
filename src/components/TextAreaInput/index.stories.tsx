import { TextAreaInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextAreaInput> = {
  title: 'Inputs/TextAreaInput',
  component: TextAreaInput,
}

export default meta

export const Default: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: 'Enter some text if you wish',
    disabled: false,
  },
}

export const Small: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof TextAreaInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    error: true,
  },
}
