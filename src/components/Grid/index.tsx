import * as React from 'react'
import { styled } from 'inlines'
import { border, borderRadius } from '../../index.js'
import { GridItem } from './Item.js'
import { GridProps, Item } from './types.js'

// TODO this component is a WIP, API will be changed to match the Table

const isItem = (item: Item | React.ReactNode): item is Item => {
  return !React.isValidElement(item)
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
          {isItem(item) ? (
            <GridItem
              variant={variant}
              key={i}
              item={item}
              itemAction={itemAction}
            />
          ) : (
            item
          )}
        </styled.div>
      ))}
    </styled.div>
  )
}
