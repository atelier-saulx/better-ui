import * as React from 'react'
import { border, color } from '../../utils/colors'
import { Text } from '../Text'
import { IconMoreHorizontal } from '../Icons'
import { styled } from 'inlines'
import { Button } from '../Button'
import { Folder } from '../Icons/extras'

export type GridProps = {
  variant?: 'row' | 'column'
  children: React.ReactNode
}

const GridContext = React.createContext<{ variant: GridProps['variant'] }>({
  variant: 'row',
})

export function Grid({ variant = 'column', children }: GridProps) {
  return (
    <GridContext.Provider value={{ variant }}>
      <div
        style={{
          display: 'grid',
          gap: variant === 'column' ? 16 : 0,
          gridTemplateColumns: variant === 'column' ? 'repeat(3, 1fr)' : '1fr',
        }}
      >
        {children}
      </div>
    </GridContext.Provider>
  )
}

export function GridItem({ title, description }: any) {
  const { variant } = React.useContext(GridContext)

  return (
    <styled.div
      style={{
        padding: 16,
        display: 'flex',
        ...(variant === 'column' && {
          borderRadius: 'var(--radius-tiny)',
          border: border(),
          flexDirection: 'column',
        }),
        ...(variant === 'row' && {
          borderBottom: border(),
          flexDirection: 'row',
        }),
        '&:hover .optionsButton': {
          opacity: '100% !important',
        },
      }}
    >
      <div
        style={{
          background: color('background', 'neutral'),
          borderRadius: 'var(--radius-tiny)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          ...(variant === 'column' && {
            aspectRatio: '16/9',
            marginBottom: 12,
            padding: 16,
          }),
          ...(variant === 'row' && {
            marginLeft: -16,
            marginRight: 12,
            padding: 8,
            height: 48,
            width: 48,
          }),
        }}
      >
        <Folder />
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
          <Text variant="bodyBold" color="primary">
            {title}
          </Text>
          {variant === 'column' && (
            <div
              className="optionsButton"
              style={{
                display: 'flex',
                opacity: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </div>
          )}
        </div>
        <Text color="secondary">{description}</Text>
      </div>
      {variant === 'row' && (
        <div
          className="optionsButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            paddingLeft: 12,
            marginLeft: 'auto',
          }}
        >
          <Button variant="icon-only">
            <IconMoreHorizontal />
          </Button>
        </div>
      )}
    </styled.div>
  )
}
