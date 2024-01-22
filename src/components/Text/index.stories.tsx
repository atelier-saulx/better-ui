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
    color: 'secondary',
  },
}

export const title: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title',
  },
}

export const titlePage: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title-page',
    weight: 'strong',
    as: 'h2',
  },
}

export const titleModal: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'title-modal',
  },
}

export const bodyBold: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-bold',
  },
}

export const bodyStrong: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'body-strong',
  },
}

export const caption: StoryObj<typeof Text> = {
  args: {
    children: 'Have a nice day!',
    variant: 'caption',
  },
}
