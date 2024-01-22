import { format } from 'date-fns'
import * as React from 'react'
import { borderRadius, color } from '../../utils/colors.js'
import { textVariants } from '../Text/index.js'
// import { borderRadius, color, textVariants } from '../../index.js'

export type CurrentDayProps = {
  value: number // ms since unix epoch (so basically new Date().getTime())
}

export function CurrentDay({ value }: CurrentDayProps) {
  return (
    <div
      style={{
        background: color('background', 'neutral'),
        borderRadius: borderRadius('medium'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        width: 64,
      }}
    >
      <div style={{ ...textVariants.body, fontSize: 16 }}>
        {format(new Date(value), 'MMM')}
      </div>
      <div style={{ ...textVariants['body-strong'], fontSize: 20 }}>
        {format(new Date(value), 'd')}
      </div>
    </div>
  )
}
