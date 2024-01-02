import * as React from 'react'
import { Page } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof Page> = {
  title: 'Atoms/Page',
  component: Page,
}

export default meta

export const Default: StoryObj<typeof Page> = {
  args: {
    children: (
      <styled.div
        style={{
          width: 540,
          '& > div': {
            height: '270px',
          },
        }}
      >
        <styled.div style={{ background: '#f5f5f5' }}>🦍</styled.div>
        <styled.div style={{ background: '#afafaf' }}>🐳</styled.div>
        <styled.div style={{ background: '#f5f5f5' }}>🦀</styled.div>
        <styled.div style={{ background: '#afafaf' }}>🦧</styled.div>
        <styled.div style={{ background: '#f5f5f5' }}>🐍</styled.div>
      </styled.div>
    ),
  },
}
