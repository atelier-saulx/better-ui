import * as React from 'react'
import { hash } from '@saulx/hash'
import { styled, Style } from 'inlines'
import {
  IconCheckLarge,
  IconCopy,
  MUTED_SEMANTIC_COLORS,
  SEMANTIC_COLORS,
  SemanticVariant,
  borderRadius,
  color as getColor,
} from '../../index.js'

export type BadgeProps = {
  children: React.ReactNode
  color?: SemanticVariant | 'auto' | 'auto-muted'
  size?: 'regular' | 'small'
  copyValue?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  style?: Style
}

export function Badge({
  children,
  copyValue,
  color: colorProp = 'informative',
  size = 'regular',
  prefix,
  suffix,
  style,
}: BadgeProps) {
  const [showCheck, setShowCheck] = React.useState(false)

  const color = React.useMemo(() => {
    if (colorProp === 'auto' || colorProp === 'auto-muted') {
      const colors =
        colorProp === 'auto' ? SEMANTIC_COLORS : MUTED_SEMANTIC_COLORS

      const index =
        Math.floor(Math.abs(Math.sin(hash(children))) * (colors.length - 1)) + 1

      return colors[index]
    }

    return colorProp
  }, [colorProp, children])

  return (
    <styled.div
      onClick={
        copyValue
          ? () => {
              navigator.clipboard.writeText(copyValue)
              setShowCheck(true)
            }
          : undefined
      }
      style={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        padding: '0 8px',
        borderRadius: borderRadius('large'),
        fontWeight: 500,
        color: getColor('semantic-color', color),
        background: getColor('semantic-background', color),
        ...(size === 'regular' && {
          fontSize: '14px',
          lineHeight: '24px',
        }),
        ...(size === 'small' && {
          fontSize: '12px',
          lineHeight: '20px',
        }),
        ...(copyValue && {
          cursor: 'copy',
          '&:hover': {
            borderTopRightRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
          },
          '&:hover > .badge-copyable': {
            display: 'flex !important',
          },
        }),
        ...style,
      }}
      onMouseLeave={() => {
        setShowCheck(false)
      }}
    >
      {prefix && prefix}
      {children}
      {suffix && suffix}
      {copyValue && (
        <span
          className="badge-copyable"
          style={{
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            ...(size === 'regular' && {
              height: '24px',
            }),
            ...(size === 'small' && {
              height: '20px',
            }),
            position: 'absolute',
            right: 0,
            top: 0,
            transform: 'translateX(100%)',
            color: getColor('semantic-color', color),
            background: getColor('semantic-background', color),
            borderTopRightRadius: borderRadius('large'),
            borderBottomRightRadius: borderRadius('large'),
            padding: '0 8px 0 0',
          }}
        >
          {showCheck ? (
            <IconCheckLarge
              height={size === 'regular' ? 16 : 12}
              width={size === 'regular' ? 16 : 12}
            />
          ) : (
            <IconCopy
              height={size === 'regular' ? 16 : 12}
              width={size === 'regular' ? 16 : 12}
            />
          )}
        </span>
      )}
    </styled.div>
  )
}
