import * as React from 'react'
import { styled, Style } from 'inlines'
import { BasedSchemaContentMediaType } from '@based/schema'

export type MediaProps = {
  variant?: 'cover' | 'contain'
  src?: string
  thumbnail?: string
  type?: BasedSchemaContentMediaType | 'directory'
  style?: Style
}

// 16:8

/* 
  <div style={{ width: 500, height: 500 }}>
    <Media src="bla.jpg" variant="cover" />
  </div>

   <div style={{ width: 500, height: 500, border: '1px solid red' }}>
    <Media src="bla.jpg" variant="default" />
  </div>
*/

export function Media({}: MediaProps) {
  // ref useEffect // state getBoundingClientRect()

  // size breakpoints
  // ICON (48px)
  // MID (as in a grid / thumnail in youtube)
  // LARGE

  // for video
  // ICON => only play button with thumb
  // MID => the one you made now with seekbar at the bottom
  // LARGE => full size vid player

  // for audio round progress bar (make as sep component)

  // for icons max size for MID / LARGE (but large is bigger)

  return 'LULLZ'
}
