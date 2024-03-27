import React from 'react'
import {
  IconAlarmClock,
  IconAlertFill,
  IconAnchor,
  Switch,
} from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Switch> = {
  title: 'Inputs/Switch',
  component: Switch,
}

export default meta

export const Body: StoryObj<typeof Switch> = {
  args: {
    // data: ['month', 'week', 'day'],
    selected: 0,
    data: [
      'howdy',
      <IconAlarmClock />,
      <IconAlertFill />,
      <IconAnchor />,
      'Hallo',
    ],
    onChange: (v) => console.log(v),
  },
}
