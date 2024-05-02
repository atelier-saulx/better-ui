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
    onChange: () => {},
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

export const SingleLine: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    onChange: () => {},
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
    style: {
      maxWidth: 274,
    },
    singleLine: true,
  },
}

export const StayOpen: StoryObj<typeof MultiSelectInput> = {
  args: {
    placeholder: 'Select something',
    label: 'Favourite fruit',
    stayOpenWhileSelecting: true,
    onChange: () => {},
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
    onChange: () => {},
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
    onChange: () => {},
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
