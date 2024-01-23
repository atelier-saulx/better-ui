import { Spinner } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
}

export default meta

export const Default: StoryObj<typeof Spinner> = {
  args: {
    size: 48,
  },
}
