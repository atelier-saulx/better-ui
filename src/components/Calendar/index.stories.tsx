import * as React from 'react'
import { Calendar } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  component: Calendar,
}

export default meta

export const Default = () => {
  return <Calendar />
}
