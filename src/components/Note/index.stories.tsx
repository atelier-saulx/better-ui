import { Note } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Note> = {
  title: 'Atoms/Note',
  component: Note,
}

export default meta

export const Error: StoryObj<typeof Note> = {
  args: {
    children: 'This is an error',
    variant: 'error',
  },
}

export const Warning: StoryObj<typeof Note> = {
  args: {
    children: 'This is a warning',
    variant: 'warning',
  },
}

export const Positive: StoryObj<typeof Note> = {
  args: {
    children: 'This is positive',
    variant: 'positive',
  },
}

export const Informative: StoryObj<typeof Note> = {
  args: {
    children: 'This is informative',
    variant: 'informative',
  },
}

export const Neutral: StoryObj<typeof Note> = {
  args: {
    children: 'This is neutral',
    variant: 'neutral',
  },
}
