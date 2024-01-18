import type { Meta, StoryObj } from '@storybook/react'
import { PieGraph } from '../../index.js'

const meta: Meta<typeof PieGraph> = {
  title: 'Atoms/Graphs/PieGraph',
  component: PieGraph,
}

export default meta

export const Default: StoryObj<typeof PieGraph> = {
  args: {
    data: [
      {
        label: 'Apples',
        value: 25455,
        color: 'coral',
      },
      {
        label: 'Sugar',
        value: 5484,
        color: 'darkolivegreen',
      },
      {
        label: 'Flour',
        value: 999,
        color: 'blue',
      },
      {
        label: 'Cinnamon',
        value: 2566,
        color: 'darkslateblue',
      },
    ],
  },
}
