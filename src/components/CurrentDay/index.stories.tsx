import { CurrentDay } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CurrentDay> = {
  title: 'Atoms/CurrentDay',
  component: CurrentDay,
}

export default meta

export const Default: StoryObj<typeof CurrentDay> = {
  args: { value: new Date().getTime() },
  // args: { value: 345435435345345 },
}
