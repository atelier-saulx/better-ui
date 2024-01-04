import * as React from 'react'
import { styled } from 'inlines'
import { Text, border, borderRadius, color, textVariants } from '../../index.js'
import { Folder, Paper } from '../Icons/extras.js'

export function Item({
  item,
  itemAction,
  variant,
}: {
  item: {
    title: string
    description?: string
    renderAs: 'folder' | 'file' | 'image'
    [key: string]: any
  }
  itemAction?: (item: any) => React.ReactNode
  variant?: 'row' | 'column'
}) {
  return (
    <styled.div
      style={{
        padding: 16,
        display: 'flex',
        backgroundColor: color('background', 'screen'),
        ...(variant === 'column' && {
          borderRadius: borderRadius('tiny'),
          border: border(),
          flexDirection: 'column',
        }),
        ...(variant === 'row' && {
          borderBottom: border(),
          flexDirection: 'row',
        }),
        // '&:hover .optionsButton': {
        //   opacity: '100% !important',
        // },
      }}
    >
      <div
        style={{
          background: color('background', 'neutral'),
          borderRadius: borderRadius('tiny'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          ...(variant === 'column' && {
            aspectRatio: '16 / 9',
            width: '100%',
            marginBottom: 12,
          }),
          ...(variant === 'row' && {
            marginLeft: -16,
            marginRight: 12,
            height: 48,
            width: 48,
            padding: 4,
          }),
        }}
      >
        {item.renderAs === 'folder' && (
          <Folder style={{ height: variant === 'column' ? 64 : 28 }} />
        )}
        {item.renderAs === 'file' && (
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Paper style={{ height: variant === 'column' ? 76 : 32 }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...textVariants.bodyStrong,
                color: color('interactive', 'primary'),
                textTransform: 'uppercase',
                userSelect: 'none',
                fontSize: variant === 'column' ? 14 : 8,
              }}
            >
              {item.title.split('.')[1]}
            </div>
          </div>
        )}
        {item.renderAs === 'image' && (
          <img
            draggable={false}
            src={item.image}
            style={{
              userSelect: 'none',
              width: '100%',
              objectFit: variant === 'column' ? 'contain' : 'cover',
              aspectRatio: '16 / 9',
              padding: variant === 'column' ? 16 : 0,
            }}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          minHeight: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Text
            variant="bodyBold"
            color="primary"
            style={{ wordBreak: 'break-all', userSelect: 'none' }}
          >
            {item.title}
          </Text>
          {variant === 'column' && itemAction && (
            <div
              className="optionsButton"
              style={{
                display: 'flex',
                // opacity: 0,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 12,
              }}
            >
              {itemAction(item)}
            </div>
          )}
        </div>
        <Text
          color="secondary"
          style={{ wordBreak: 'break-all', userSelect: 'none' }}
        >
          {item.description}
        </Text>
      </div>
      {variant === 'row' && itemAction && (
        <styled.div
          className="optionsButton"
          style={{
            display: 'flex',
            // opacity: 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 12,
            marginLeft: 'auto',
          }}
        >
          {itemAction(item)}
        </styled.div>
      )}
    </styled.div>
  )
}
