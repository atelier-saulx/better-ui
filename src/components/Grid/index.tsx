import * as React from 'react'
import { styled } from 'inlines'
import { border, borderRadius } from '../../index.js'
import { GridItem } from './Item.js'
import { GridProps } from './types.js'

// TODO this component is a WIP, API will be changed to match the Table

const isReactNode = (
  renderAs: string | React.ReactNode
): renderAs is React.ReactNode => {
  return typeof renderAs !== 'string'
}

export function Grid({
  variant = 'column',
  items,
  itemAction,
}: // onChange,
GridProps) {
  return (
    <styled.div
      style={{
        display: 'grid',
        gap: variant === 'column' ? 16 : 0,
        gridTemplateColumns: variant === 'column' ? 'repeat(3, 1fr)' : '1fr',
      }}
    >
      {items.map((item, i) => (
        <styled.div
          style={{
            padding: 16,
            display: 'flex',
            ...(variant === 'column' && {
              borderRadius: borderRadius('tiny'),
              border: border(),
              flexDirection: 'column',
            }),
            ...(variant === 'row' && {
              borderBottom: border(),
              flexDirection: 'row',
            }),
          }}
        >
          {isReactNode(item.renderAs) ? (
            item.renderAs
          ) : (
            <GridItem
              variant={variant}
              key={i}
              item={item}
              itemAction={itemAction}
            />
          )}
        </styled.div>
      ))}
    </styled.div>
  )
}
