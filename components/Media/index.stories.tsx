import * as React from 'react'
import { Media } from '.'
import type { Meta } from '@storybook/react'
import { styled } from 'inlines'
import { color } from '../../utils/colors'

const meta: Meta<typeof Media> = {
  title: 'Components/Media',
  component: Media,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

function Examples() {
  return (
    <>
      <Media type="directory" />
      <Media type="application/pdf" src="no_extension_just_mime" />
      <Media src="no_mime_just_extension.txt" />
      <Media
        type="image/*"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Media
        type="video/*"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      />
      <Media
        type="video/*"
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        thumbnail="https://plus.unsplash.com/premium_photo-1701767501250-fda0c8f7907f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </>
  )
}

export const Small = () => {
  return (
    <styled.div
      style={{
        display: 'grid',
        gridAutoColumns: '48px',
        gridAutoRows: '48px',
        gap: 16,
        padding: 64,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </styled.div>
  )
}

export const Medium = () => {
  return (
    <styled.div
      style={{
        display: 'grid',
        gridAutoColumns: '200px',
        gridAutoRows: '100px',
        gap: 16,
        padding: 64,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </styled.div>
  )
}

export const Large = () => {
  return (
    <styled.div
      style={{
        display: 'grid',
        gridAutoColumns: '600px',
        gridAutoRows: '400px',
        gap: 16,
        padding: 64,
        '& > *': {
          background: color('background', 'neutral'),
          borderRadius: '4px',
        },
      }}
    >
      <Examples />
    </styled.div>
  )
}
