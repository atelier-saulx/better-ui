import React from 'react'
import { Dropdown } from '../Dropdown/index.js'
import { styled } from 'inlines'

export const ItemInfo = ({ data }) => {
  const { x, y, startField, endField, labelField } = data
  return (
    <styled.div
      style={{
        width: 260,
        height: 100,
        position: 'absolute',
        top: y,
        left: x,
        background: 'yellow',
      }}
    >
      {labelField}
      {startField}
      {endField}
    </styled.div>
  )
}
