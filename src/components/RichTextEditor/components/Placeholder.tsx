import React from 'react'
import { styled } from 'inlines'
import { color } from '../../../index.js'

type PlaceholderProps = {
  children?: string
}

export function Placeholder({ children }: PlaceholderProps) {
  return (
    <styled.div
      style={{
        position: 'absolute',
        top: 17,
        left: 18,
        pointerEvents: 'none',
      }}
    >
      <p className="rte-p" style={{ color: color('content', 'secondary') }}>
        {children}
      </p>
    </styled.div>
  )
}
