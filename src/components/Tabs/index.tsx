import * as React from 'react'
import { styled } from 'inlines'
import { Text, border, color } from '../../index.js'

export type TabsProps = {
  data: string[]
  value: string
  onValueChange: (value: string) => void
}

export function Tabs({ data, value, onValueChange }: TabsProps) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderBottom: border(),
      }}
    >
      {data.map((e) => (
        <styled.div
          key={e}
          onClick={() => {
            onValueChange(e)
          }}
          style={{
            marginBottom: '-1px',
            padding: '10px 12px',
            borderBottom: `2px solid ${value === e ? color('interactive', 'primary') : 'transparent'}`,
            '&:hover': {
              background: color('background', 'neutral'),
              ...(value !== e && {
                borderBottom: `2px solid ${color('content', 'secondary')}`,
              }),
            },
          }}
        >
          <Text>{e}</Text>
        </styled.div>
      ))}
    </div>
  )
}
