import { Confirm } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Confirm> = {
  title: 'Atoms/Confirm',
  component: Confirm,
}

export default meta

export const Default: StoryObj<typeof Confirm> = {
  args: {},
}

export const Icons: StoryObj<typeof Confirm> = {
  args: {
    variant: 'small',
  },
}
