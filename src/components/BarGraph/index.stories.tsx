import type { Meta, StoryObj } from '@storybook/react'
import { BarGraph } from '../../index.js'

const meta: Meta<typeof BarGraph> = {
  title: 'Atoms/Graphs/BarGraph',
  component: BarGraph,
}

export default meta

export const Horizontal: StoryObj<typeof BarGraph> = {
  args: {
    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: 4,
        color: 'coral',
      },
      {
        label: 'Sugar',
        value: 3,
        color: 'darkolivegreen',
      },
      {
        label: 'Flour',
        value: 2,
        color: 'blue',
      },
      {
        label: 'Cinnamon',
        value: 1,
        color: 'darkslateblue',
      },
    ],
  },
}

export const Vertical: StoryObj<typeof BarGraph> = {
  args: {
    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: 4,
        color: 'coral',
      },
      {
        label: 'Sugar',
        value: 3,
        color: 'darkolivegreen',
      },
      {
        label: 'Flour',
        value: 2,
        color: 'blue',
      },
      {
        label: 'Cinnamon',
        value: 1,
        color: 'darkslateblue',
      },
    ],
  },
}

export const StackedVertical: StoryObj<typeof BarGraph> = {
  args: {
    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'Red', color: 'red', value: 1 },
          { label: 'yellow', color: 'yellow', value: 2 },
          { label: 'blue', color: 'blue', value: 4 },
        ],
        color: 'coral',
      },
      {
        label: 'Sugar',
        value: 3,
        color: 'darkolivegreen',
      },
      {
        label: 'Flour',
        value: 2,
        color: 'blue',
      },
      {
        label: 'Cinnamon',
        value: 1,
        color: 'darkslateblue',
      },
    ],
  },
}

export const StackedHorizontal: StoryObj<typeof BarGraph> = {
  args: {
    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'Red', color: 'red', value: 21 },
          { label: 'yellow', color: 'yellow', value: 2 },
          { label: 'blue', color: 'blue', value: 4 },
        ],
        color: 'coral',
      },
      {
        label: 'Sugar',
        value: 4,
        color: 'darkolivegreen',
      },
      {
        label: 'Flour',
        value: 2,
        color: 'blue',
      },
      {
        label: 'Cinnamon',
        value: 1,
        color: 'darkslateblue',
      },
    ],
  },
}
