import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { IconCopy, IconMoreVertical, Button } from '../../index.js'

/** Use buttons for clickable things */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
}

export default meta

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'medium',
    onClick: () => {
      alert('hello')
    },
  },
}

export const Icon: StoryObj<typeof Button> = {
  args: {
    children: <IconMoreVertical />,
    variant: 'neutral',
    size: 'medium',
    shape: 'square',
  },
}

export const IconOnly: StoryObj<typeof Button> = {
  args: {
    children: <IconCopy />,
    variant: 'icon-only',
  },
}

export const Link: StoryObj<typeof Button> = {
  args: {
    children: 'This is a link',
    variant: 'neutral-link',
    size: 'medium',
    shape: 'square',
    onClick: () => {
      alert('hello')
    },
  },
}

export const PrefixAndSuffix: StoryObj<typeof Button> = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'medium',
    prefix: <IconCopy />,
    suffix: <IconCopy />,
    onClick: () => {
      alert('hello')
    },
  },
}

export const AsyncOnClick: StoryObj<typeof Button> = {
  args: {
    children: 'Click',
    variant: 'primary',
    size: 'medium',
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })
      throw new Error('something went bad')
    },
  },
}
