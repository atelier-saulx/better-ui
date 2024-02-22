import React from 'react'
import { prettyNumber } from '@based/pretty-number'
import { prettyDate } from '@based/pretty-date'
import { Text } from '../../index.js'

const XAxis = ({ maxX, minX, xFormat, width }) => {
  const d = maxX - minX
  const amount = Math.floor(width / 150)
  const rW = width / amount
  const c = []
  // let prevValue
  for (let i = 0; i < amount; i++) {
    const value = (d * (i + 1)) / amount + minX

    if (xFormat === 'date-time-human') {
      c.push(prettyDate(value, 'date-time-human'))
    } else if (xFormat === 'date') {
      c.push([
        prettyDate(value, 'time-precise'),
        ' - ',
        prettyDate(value, 'date'),
      ])
    } else {
      c.push(prettyNumber(value, 'number-short'))
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      {c.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              minWidth: rW,
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: 15,
            }}
          >
            <Text style={{ fontSize: 13 }}>{v}</Text>
          </div>
        )
      })}
    </div>
  )
}

export default XAxis
