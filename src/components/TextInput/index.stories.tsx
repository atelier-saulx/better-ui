import { TextInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextInput> = {
  title: 'Atoms/Inputs/TextInput',
  component: TextInput,
}

export default meta

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    description: 'Enter some text',
  },
}

export const Small: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    variant: 'small',
  },
}

export const Error: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    error: true,
  },
}

export const Disabled: StoryObj<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
    disabled: true,
  },
}
