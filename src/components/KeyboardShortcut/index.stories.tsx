import * as React from 'react'
import { KeyboardShortcut } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof KeyboardShortcut> = {
  title: 'Atoms/KeyboardShortcut',
  component: KeyboardShortcut,
}

export default meta

export const Default = () => {
  return <KeyboardShortcut shortcut="Cmd+D" />
}

export const Simple = () => {
  return <KeyboardShortcut shortcut="C" />
}

export const Modifier = () => {
  return <KeyboardShortcut shortcut="Cmd+B" />
}

export const DoubleModifier = () => {
  return <KeyboardShortcut shortcut="Cmd+Alt+A" />
}
