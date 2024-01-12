import * as React from 'react'
import { styled } from 'inlines'
import { border, borderRadius, color } from '../../index.js'
import { GridItem } from './Item.js'
import { GridProps, Item } from './types.js'

// TODO this component is a WIP, API will be changed to match the Table

export type GridProps = {
  variant?: 'row' | 'column'
  items: {
    title: string
    description?: string
    renderAs: 'folder' | 'file' | 'image'
    [key: string]: any
  }[]
  itemAction?: (item: any) => React.ReactNode
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
            <span
              key={i}
              id={item.id}
              // onMouseDown={(e) => dragStart(e, i)}
              onTouchStart={(e) => {
                e.stopPropagation()
                // e.preventDefault()
                touchStart(e, i)
              }}
              style={{ cursor: 'pointer' }}
            >
              <GridItem
                variant={variant}
                key={i}
                item={item}
                itemAction={itemAction}
              />
            </span>
          ) : (
            item
          )}
        </styled.div>
      ))}
    </styled.div>
  )
}
