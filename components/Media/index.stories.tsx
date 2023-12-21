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

const base64 =
  'data:image/png;base64,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'

export default meta

function Examples() {
  return (
    <>
      <Media type="directory" />
      <Media type="application/pdf" src="no_extension_just_mime" />
      <Media src="no_mime_just_extension.txt" />
      <Media src="no_mime_just_extension.docx" />
      <Media variant="cover" src="https://i.imgur.com/t1bWmmC.jpeg" />
      <Media variant="cover" src="https://i.imgur.com/t1bWmmC.jpg" />
      <Media variant="cover" src="https://i.imgur.com/slJCr8Q.png" />
      <Media variant="cover" src="https://i.imgur.com/t1bWmmC.gif" />

      <Media src={base64} />

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
