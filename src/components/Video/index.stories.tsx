import * as React from 'react'
import { Video } from '../../index.js'

const meta = {
  title: 'Atoms/Video',
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

export const Default = () => {
  return (
    <Video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
  )
}

export const WithCustomThumbnail = () => {
  return (
    <Video
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
      thumbnail="https://plus.unsplash.com/premium_photo-1701767501250-fda0c8f7907f?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  )
}

export const HLS = () => {
  return <Video src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
}
