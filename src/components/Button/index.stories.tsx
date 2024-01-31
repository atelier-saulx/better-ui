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
    variant: 'error-muted',
  },
}

export const Icon: StoryObj<typeof Button> = {
  args: {
    children: <IconMoreVertical />,
    variant: 'primary',
    shape: 'square',
  },
}

export const KeyboardShortcut: StoryObj<typeof Button> = {
  args: {
    children: 'Save',
    variant: 'primary',
    keyboardShortcut: 'Cmd+O',
    displayKeyboardShortcut: true,
    onClick: () => {
      alert('onclick triggered')
    },
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
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })
      throw new Error('something went bad')
    },
  },
}

export const ButtonSmall: StoryObj<typeof Button> = {
  args: {
    children: 'Click',
    variant: 'primary',
    size: 'small',
    prefix: <IconCopy />,
    onClick: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })
      throw new Error('something went bad')
    },
  },
}
