import { Calendar } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  component: Calendar,
}

export default meta

export const Default: StoryObj<typeof Calendar> = {
  args: {},
}
