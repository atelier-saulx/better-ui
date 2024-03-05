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
    // defaultValue: new Set([
    //   'apple-0',
    //   'apple-2',
    //   'apple-4',
    //   'apple-6',
    //   'apple-8',
    //   'apple-10',
    // ]),
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

export const Disabled: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    options: [],
    disabled: true,
  },
}
