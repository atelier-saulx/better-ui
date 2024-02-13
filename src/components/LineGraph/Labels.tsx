import React from 'react'
import { Text } from '../../index.js'
import { prettyNumber } from '@based/pretty-number'

export default ({ labels, labelHeight, valueFormat }) => {
  return labels.map((v, i) => {
    const value = v.label

    return (
      <div
        key={i}
        style={{
          height: labelHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: 600 }}>
            {prettyNumber(value, valueFormat)}
          </Text>
        </div>
      </div>
    )
  })
}
