import { MultiSelectInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MultiSelectInput> = {
  title: 'Inputs/MultiSelectInput',
  component: MultiSelectInput,
}

export default meta

export const Default: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    onChange: console.log,
    options: [
      {
        label: 'Orange',
        value: 'orange',
      },
      {
        label: 'Banana',
        value: 'banana',
      },
      ...Array.from({ length: 100 }).map((_, i) => ({
        label: `Apple ${i}`,
        value: `apple-${i}`,
      })),
    ],
  },
}

export const SimpleOptions: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    onChange: console.log,
    options: [
      'orange',
      'banana',
      ...Array.from({ length: 100 }).map((_, i) => `apple-${i}`),
    ],
  },
}

export const Small: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    onChange: console.log,
    variant: 'small',
    options: [
      {
        label: 'Orange',
        value: 'orange',
      },
      {
        label: 'Banana',
        value: 'banana',
      },
      ...Array.from({ length: 100 }).map((_, i) => ({
        label: `Apple ${i}`,
        value: `apple-${i}`,
      })),
    ],
  },
}

export const Disabled: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    options: [],
    disabled: true,
  },
}
