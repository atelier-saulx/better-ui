import { LoginPage } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'
import * as React from 'react'

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default: StoryObj<typeof LoginPage> = {
  args: {
    logo: <BasedLogoWithText />,
  },
}
