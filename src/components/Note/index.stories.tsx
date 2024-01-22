import { Note } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Note> = {
  title: 'Atoms/Note',
  component: Note,
}

export default meta

export const Error: StoryObj<typeof Note> = {
  args: {
    message: 'This is an error',
    variant: 'error',
  },
}

export const Warning: StoryObj<typeof Note> = {
  args: {
    message: 'This is a warning',
    variant: 'warning',
  },
}

export const Positive: StoryObj<typeof Note> = {
  args: {
    message: 'This is positive',
    variant: 'positive',
  },
}

export const Informative: StoryObj<typeof Note> = {
  args: {
    message: 'This is informative',
    variant: 'informative',
  },
}

export const Neutral: StoryObj<typeof Note> = {
  args: {
    message: 'This is neutral',
    variant: 'neutral',
  },
}
