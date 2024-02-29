import React from 'react'
import type { Meta } from '@storybook/react'
import { RichTextEditor } from '../../index.js'
import { Provider } from '@based/react'
import based from '@based/client'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof RichTextEditor> = {
  title: 'Inputs/RichTextEditor',
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  return <RichTextEditor autoFocus placeholder="Enter some rich text" />
}

export const SmallVariant = () => {
  return (
    <RichTextEditor
      variant="small"
      autoFocus
      placeholder="Enter some rich text"
    />
  )
}

export const FixedHeightOfContainer = () => {
  return (
    <div style={{ height: 800 }}>
      <RichTextEditor autoFocus placeholder="Enter some rich text" />
    </div>
  )
}

export const SetHeightOnRichTextEditor = () => {
  return (
    <RichTextEditor height={400} autoFocus placeholder="Enter some rich text" />
  )
}
