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
      <styled.div
        style={{
          width: 420,
          '& > div': {
            height: '270px',
          },
        }}
      >
        <styled.div style={{ background: '#003840', height: 200 }} />
        <styled.div style={{ background: '#005A5B', height: 200 }} />
        <styled.div style={{ background: '#007369', height: 200 }} />
        <styled.div style={{ background: '#008C72', height: 200 }} />
        <styled.div style={{ background: '#02A676', height: 200 }} />
      </styled.div>
    ),
    style: { maxHeight: 324 },
  },
}