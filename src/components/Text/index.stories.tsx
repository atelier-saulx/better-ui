import { Text } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
}

export default meta

export const Body: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body',
  },
}

export const h1: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'h1',
  },
}

export const h2: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'h2',
    weight: 'strong',
    as: 'h2',
  },
}

export const h4: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'h4',
  },
}

export const h5: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'h5',
  },
}

export const caption: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'caption',
    weight: 'bold',
  },
}

export const bodylarge: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-large',
  },
}

export const bodySmall: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-large',
  },
}

export const secondarycolor: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-bold',
    color: 'secondary',
  },
}
