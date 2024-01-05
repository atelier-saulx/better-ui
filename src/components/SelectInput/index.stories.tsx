import { SelectInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SelectInput> = {
  title: 'Atoms/Inputs/SelectInput',
  component: SelectInput,
}

export default meta

export const Default: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    description: 'What is your favourite?',
    options: [
      {
        label: 'Orange',
        value: 'orange',
        prefix: '🍊',
      },
      {
        label: 'Banana',
        value: 'banana',
        prefix: '🍌',
      },
      ...Array.from({ length: 100 }).map((_, i) => ({
        label: `Apple ${i}`,
        value: `apple-${i}`,
        prefix: '🍎',
      })),
    ],
  },
}

export const Simple: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    options: ['orange', 'banana', 'apple'],
  },
}

export const Small: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    options: ['orange', 'banana', 'apple'],
    variant: 'small',
  },
}

export const Error: StoryObj<typeof SelectInput> = {
  args: {
    placeholder: 'Select something',
    options: ['orange', 'banana', 'apple'],
    error: true,
  },
}
