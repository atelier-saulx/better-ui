import * as React from 'react'
import { hash } from '@saulx/hash'
import { styled, Style } from 'inlines'
import {
  IconCheckLarge,
  SemanticBackgroundColors,
  SEMANTIC_COLORS,
  SemanticColors,
  borderRadius,
  color as getColor,
  hashSemanticColor,
} from '../../index.js'

export type BadgeProps = {
  children: React.ReactNode
  color?: SemanticColors | 'auto' | 'auto-muted'
  size?: 'regular' | 'small'
  copyValue?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  style?: Style
  noCheckedIcon?: boolean
}

export function Badge({
  children,
  copyValue,
  color = 'informative',
  size = 'regular',
  prefix,
  noCheckedIcon,
  suffix,
  style,
}: BadgeProps) {
  const [showCheck, setShowCheck] = React.useState(false)

  // const color = React.useMemo(() => {
  //   if (colorProp === 'auto' || colorProp === 'auto-muted') {
  //     const colors =
  //       colorProp === 'auto' ? SEMANTIC_COLORS : MUTED_SEMANTIC_COLORS
  //     const index =
  //       Math.floor(Math.abs(Math.sin(hash(children))) * (colors.length - 1)) + 1
  //     return colors[index]
  //   }
  //   return colorProp
  // }, [colorProp, children])

  if (showCheck && !noCheckedIcon) {
    const icon = <IconCheckLarge size={size === 'regular' ? 16 : 12} />
    if (prefix && !suffix) {
      prefix = icon
    } else {
      suffix = icon
    }
  }

  return (
    <styled.div
      onClick={
        copyValue
          ? (e: Event) => {
              e.stopPropagation()
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
        color:
          color === 'auto'
            ? hashSemanticColor((children as string) || 'xx', true)
            : color === 'auto-muted'
              ? hashSemanticColor((children as string) || 'xx', false)
              : getColor('semantic-color', color),
        background:
          color === 'auto'
            ? hashSemanticColor((children as string) || '', false)
            : color === 'auto-muted'
              ? hashSemanticColor((children as string) || '', true)
              : getColor('semantic-background', color),
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
          userSelect: 'none',
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
    </styled.div>
  )
}
