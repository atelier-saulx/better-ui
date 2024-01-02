import * as React from 'react'
import { ScrollArea } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof ScrollArea> = {
  title: 'Atoms/ScrollArea',
  component: ScrollArea,
}

export default meta

export const Default: StoryObj<typeof ScrollArea> = {
  args: {
    children: (
      <styled.div style={{ width: 420 }}>
        <styled.div style={{ height: 270, background: '#003840' }} />
        <styled.div style={{ height: 270, background: '#005A5B' }} />
        <styled.div style={{ height: 270, background: '#007369' }} />
        <styled.div style={{ height: 270, background: '#008C72' }} />
        <styled.div style={{ height: 270, background: '#02A676' }} />
      </styled.div>
    ),
    style: { maxHeight: 324 },
  },
}
