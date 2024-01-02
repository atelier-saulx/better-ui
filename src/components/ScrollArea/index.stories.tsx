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
        <styled.div style={{ height: 200, background: 'red' }}>xxx</styled.div>
        <styled.div style={{ height: 200, background: 'orange' }}>
          xxx
        </styled.div>
        <styled.div style={{ height: 200, background: 'yellow' }}>
          xxx
        </styled.div>
      </styled.div>
    ),
    style: { maxHeight: 300, background: 'lightblue' },
  },
}
