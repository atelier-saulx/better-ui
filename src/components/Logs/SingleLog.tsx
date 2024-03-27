import React from 'react'
import { styled } from 'inlines'
import { Stack, Text, hashNonSemanticColor, color } from '../../index.js'
import { format } from 'date-fns'

type SingleLogProps = {
  msg: any
  ts?: number
  srvc?: string
  idx?: number
}

export const SingleLog = ({ msg, ts, srvc, idx }: SingleLogProps) => {
  return (
    <styled.div
      style={{
        display: 'block',
        '& p': {
          display: 'inline',
          fontFamily: 'monospace !important',
          fontSize: '13px !important',
        },
      }}
    >
      <Text variant="body" style={{ color: color('content', 'secondary') }}>
        {format(ts, 'HH:mm:ss')}
      </Text>
      <Text
        style={{
          color: hashNonSemanticColor(srvc),
          whiteSpace: 'nowrap',
          marginLeft: '8px',
          marginRight: '8px',
          fontWeight: '600',
        }}
      >
        {srvc}:
      </Text>
      <Text>{msg}</Text>
    </styled.div>
  )
}
