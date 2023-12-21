import { Code } from '.'
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
}

export default meta

const json = JSON.stringify({ hello: 'bla', x: 1, y: 2, z: 4 }, null, 2)

export const Default: StoryObj<typeof Code> = {
  args: {
    value: json,
    language: 'json',
  },
  argTypes: {
    color: { control: 'select' },
  },
}

export const CopyButton: StoryObj<typeof Code> = {
  args: {
    value: json,
    language: 'json',
    copy: true,
    color: 'muted',
  },
  argTypes: {
    color: { control: 'select' },
    language: { control: 'select' },
  },
}
