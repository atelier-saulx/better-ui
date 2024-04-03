import React from 'react'
import { Text, border, color } from '../../index.js'
import { styled } from 'inlines'
import { prettyDate } from '@based/pretty-date'
import { format } from 'date-fns'

export const ItemInfo = ({ data }) => {
  const { x, y, startField, endField, labelField } = data

  console.log(data, '🥮')

  return (
    <styled.div
      style={{
        width: 260,
        height: 100,
        position: 'absolute',
        zIndex: 111,
        top: y,
        left: x,
        background: color('background', 'screen'),
        border: border(),
        padding: '8px 16px',
        borderRadius: 4,
      }}
    >
      <Text variant="sub-title">{labelField}</Text>
      <Text variant="body-light" color="secondary">
        {prettyDate(+format(new Date(startField), 'T'), 'date-time-text')} -
      </Text>
      <Text variant="body-light" color="secondary">
        {endField}
      </Text>
    </styled.div>
  )
}
