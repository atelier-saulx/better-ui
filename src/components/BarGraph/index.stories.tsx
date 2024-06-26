import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BarGraph } from '../../index.js'
import { color } from '../../index.js'

const meta: Meta<typeof BarGraph> = {
  title: 'Atoms/BarGraph',
  component: BarGraph,
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            background: color('background', 'muted'),
            height: '300px',
            width: '100%',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta

export const Horizontal: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,
    muted: true,
    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: 4,
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'foo',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const Vertical: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,
    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: 4,
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'foo',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const StackedVertical: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,

    variant: 'vertical',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'red', value: 1 },
          { label: 'yellow', value: 2 },
          { label: 'blue', value: 4 },
        ],
      },
      {
        label: 'Sugar',
        value: 3,
      },
      {
        label: 'Flour',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}

export const StackedHorizontal: StoryObj<typeof BarGraph> = {
  args: {
    legend: true,

    variant: 'horizontal',
    data: [
      {
        label: 'Apples',
        value: [
          { label: 'red', value: 1 },
          { label: 'yellow', value: 2 },
          { label: 'blue', value: 4 },
        ],
      },
      {
        label: 'Sugar',
        value: 4,
      },
      {
        label: 'Flour',
        value: 2,
      },
      {
        label: 'Cinnamon',
        value: 1,
      },
    ],
  },
}
