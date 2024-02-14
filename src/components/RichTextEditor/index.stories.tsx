import type { Meta, StoryObj } from '@storybook/react'
import { RichTextEditor } from '../../index.js'

const meta: Meta<typeof RichTextEditor> = {
  title: 'Inputs/RichTextEditor',
  component: RichTextEditor,
}

export default meta

export const Default: StoryObj<typeof RichTextEditor> = {
  args: {
    height: 540,
    autoFocus: true,
    placeholder: 'Enter some rich text...',
    onChange: (html) => {
      console.log('onchange html --> ', html)
    },
  },
}
