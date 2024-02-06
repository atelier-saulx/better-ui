import { SetInput } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SetInput> = {
  title: 'Inputs/SetInput',
  component: SetInput,
}

export default meta

export const Default: StoryObj<typeof SetInput> = {
  args: {
    fieldItemType: 'number',
    title: 'Set Numbers',
    type: 'set',
    description: 'A set with numbers',
    value: [1, 2, 3, 6, 9],
    disabled: false,
    // placeholder: 'Select something',
    // label: 'Favourite fruit',
    // description: 'What is your favourite?',
    // disabled: false,
    // options: [
    //   {
    //     label: 'Orange',
    //     value: 'orange',
    //     prefix: '🍊',
    //   },
    //   {
    //     label: 'Banana',
    //     value: 'banana',
    //     prefix: '🍌',
    //   },
    //   ...Array.from({ length: 100 }).map((_, i) => ({
    //     label: `Apple ${i}`,
    //     value: `apple-${i}`,
    //     prefix: '🍎',
    //   })),
    // ],
  },
}
