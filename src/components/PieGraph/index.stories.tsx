import type { Meta, StoryObj } from '@storybook/react'
import { PieGraph } from '../../index.js'

const meta: Meta<typeof PieGraph> = {
  title: 'Atoms/PieGraph',
  component: PieGraph,
}

export default meta

export const Default: StoryObj<typeof PieGraph> = {
  args: {
    data: [
      {
        label: 'foo',
        value: 25455,
      },
      {
        label: 'Sugar',
        value: 5484,
      },
      {
        label: 'asd',
        value: 999,
      },
      {
        label: 'Cinnamon',
        value: 2566,
      },
    ],
  },
}
