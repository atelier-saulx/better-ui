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
        <styled.div
          style={{ background: '#f6f6f6', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f1f1f1', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f9f9f9', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#ffe596', height: 200, width: 700 }}
        />
        <styled.div
          style={{ background: '#f3f3f3', height: 200, width: 700 }}
        />
      </styled.div>
    ),
    style: { maxHeight: 324 },
  },
}
