import * as React from 'react'
import { styled, Style } from 'inlines'
import { Color, color as genColor } from '../../index.js'

export type SpinnerProps = {
  size?: number
  style?: Style
  color?: Color['interactive'] | 'inherit'
}

export function Spinner({ size = 64, style, color = 'primary' }: SpinnerProps) {
  return (
    <styled.div
      style={{
        position: 'relative',
        height: size,
        width: size,
        color: color === 'inherit' ? 'inherit' : genColor('interactive', color),
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          style={{
            animation: '750ms spin linear infinite',
          }}
          fill="none"
        >
          <path
            d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </styled.div>
  )
}
