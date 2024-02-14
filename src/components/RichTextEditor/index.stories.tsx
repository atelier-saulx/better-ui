import React from 'react'
import type { Meta } from '@storybook/react'
import { RichTextEditor } from '../../index.js'

const meta: Meta<typeof RichTextEditor> = {
  title: 'Inputs/RichTextEditor',
  decorators: [(Story) => <Story />],
}

export default meta

export const Default = () => {
  return (
    <RichTextEditor
      autoFocus
      placeholder="Enter some rich text"
      onChange={(v) => console.log(v)}
    />
  )
}

export const SmallVariant = () => {
  return (
    <RichTextEditor
      variant="small"
      autoFocus
      placeholder="Enter some rich text"
      onChange={(v) => console.log(v)}
    />
  )
}

export const FixedHeightOfContainer = () => {
  return (
    <div style={{ height: 800 }}>
      <RichTextEditor
        autoFocus
        placeholder="Enter some rich text"
        onChange={(v) => console.log(v)}
      />
    </div>
  )
}

export const SetHeightOnRichTextEditor = () => {
  return (
    <RichTextEditor
      height={400}
      autoFocus
      placeholder="Enter some rich text"
      onChange={(v) => console.log(v)}
    />
  )
}
