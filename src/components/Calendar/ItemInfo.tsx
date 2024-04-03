import React from 'react'
import { Text, border, color, Button, IconClose } from '../../index.js'
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
        minHeight: 100,
        position: 'absolute',
        zIndex: 111,
        top: y,
        left: x,
        background: color('background', 'screen'),
        border: border(),
        padding: '8px 8px 16px 8px',
        borderRadius: 4,
      }}
    >
      <styled.div style={{ textAlign: 'right' }}>
        <Button
          variant="neutral-transparent"
          shape="square"
          style={{
            backgroundColor: color('background', 'muted'),
            borderRadius: '50%',
          }}
        >
          <IconClose />
        </Button>
      </styled.div>
      <Text variant="sub-title" style={{ marginBottom: 8 }}>
        {labelField}
      </Text>
      <Text variant="body-light" color="secondary">
        {prettyDate(+format(new Date(startField), 'T'), 'date-time-text')} -
      </Text>
      <Text variant="body-light" color="secondary">
        {prettyDate(+format(new Date(endField), 'T'), 'date-time-text')}
      </Text>
    </styled.div>
  )
}
