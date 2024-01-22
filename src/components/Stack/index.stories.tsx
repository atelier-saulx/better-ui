import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stack, border, borderRadius } from '../../index.js'

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
}

export default meta

export const Default: StoryObj<typeof Stack> = {
  args: {
    gap: 32,
    style: {
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: [<div>Have a nice day!</div>, <div>Have a nice day!</div>],
  },
}

const manyChildren: ReactNode[] = []

for (let i = 0; i < 20; i++) {
  manyChildren.push(<div>Have a nice day! {i}</div>)
}

export const Grid: StoryObj<typeof Stack> = {
  args: {
    grid: true,
    gap: 12,
    style: {
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: manyChildren,
  },
}

export const GridFixedHeight: StoryObj<typeof Stack> = {
  args: {
    grid: 200,
    gap: 12,
    style: {
      border: border(),
      padding: 24,
      minWidth: '750px',
      '& > *': {
        border: border(),
        borderRadius: borderRadius('small'),
        padding: '20px',
      },
    },
    children: manyChildren,
  },
}
