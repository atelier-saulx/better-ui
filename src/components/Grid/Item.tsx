import * as React from 'react'
import { styled } from 'inlines'
import { Text, borderRadius, color, textVariants } from '../../index.js'
import { Folder, Paper } from '../Icons/extras.js'
import { Item, GridProps } from './types.js'

export const GridItem = (p: {
  item: Item
  variant: GridProps['variant']
  itemAction: GridProps['itemAction']
}) => {
  return (
    <>
      <styled.div
        style={{
          background: color('background', 'neutral'),
          borderRadius: borderRadius('tiny'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          ...(p.variant === 'column' && {
            aspectRatio: '16 / 9',
            width: '100%',
            marginBottom: 12,
          }),
          ...(p.variant === 'row' && {
            marginLeft: -16,
            marginRight: 12,
            height: 48,
            width: 48,
            padding: 4,
          }),
        }}
      >
        {p.item.renderAs === 'folder' && (
          <Folder style={{ height: p.variant === 'column' ? 64 : 28 }} />
        )}
        {p.item.renderAs === 'file' && (
          <styled.div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper style={{ height: p.variant === 'column' ? 76 : 32 }} />
            <styled.div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...textVariants['body-strong'],
                color: color('interactive', 'primary'),
                textTransform: 'uppercase',
                fontSize: p.variant === 'column' ? 14 : 8,
              }}
            >
              {p.item.title.split('.')[1]}
            </styled.div>
          </styled.div>
        )}
        {p.item.renderAs === 'image' && (
          <img
            src={p.item.image}
            style={{
              width: '100%',
              objectFit: p.variant === 'column' ? 'contain' : 'cover',
              aspectRatio: '16 / 9',
              padding: p.variant === 'column' ? 16 : 0,
            }}
          />
        )}
      </styled.div>
      <styled.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          minHeight: 48,
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            variant="body-bold"
            color="primary"
            style={{ wordBreak: 'break-all' }}
          >
            {p.item.title}
          </Text>
          {p.variant === 'column' && p.itemAction && (
            <styled.div
              className="optionsButton"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 12,
              }}
            >
              {p.itemAction(p.item)}
            </styled.div>
          )}
        </styled.div>
        <Text
          color="secondary"
          variant="body"
          style={{ wordBreak: 'break-all' }}
        >
          {p.item.description}
        </Text>
      </styled.div>
      {p.variant === 'row' && p.itemAction && (
        <styled.div
          className="optionsButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 12,
            marginLeft: 'auto',
          }}
        >
          {p.itemAction(p.item)}
        </styled.div>
      )}
    </>
  )
}
