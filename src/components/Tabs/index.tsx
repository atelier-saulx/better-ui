import * as React from 'react'
import { styled } from 'inlines'
import { Text, border, color } from '../../index.js'

export type TabsProps = {
  data: { value: string; label: string }[]
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
          key={e.value}
          onClick={() => {
            onValueChange(e.value)
          }}
          style={{
            marginBottom: '-1px',
            padding: '10px 12px',
            borderBottom: `2px solid ${value === e.value ? color('interactive', 'primary') : 'transparent'}`,
            '&:hover': {
              background: color('background', 'neutral'),
              ...(value !== e.value && {
                borderBottom: `2px solid ${color('content', 'secondary')}`,
              }),
            },
          }}
        >
          <Text>{e.label}</Text>
        </styled.div>
      ))}
    </div>
  )
}
