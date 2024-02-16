import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  IconCheckLarge,
  SemanticColors,
  borderRadius,
  color as getColor,
  color,
  IconId,
  hashSemanticColor,
  hashNonSemanticColor,
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
              ? hashNonSemanticColor((children as string) || 'xx', false)
              : getColor('semantic-color', color),
        background:
          color === 'auto'
            ? hashSemanticColor((children as string) || '', false)
            : color === 'auto-muted'
              ? hashNonSemanticColor((children as string) || '', true)
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

export const BadgeId = (p: { id?: string; style?: Style }) => {
  const id = p.id ?? '-'
  return (
    <Badge
      style={p.style}
      copyValue={p.id}
      color="neutral-muted"
      prefix={
        <IconId
          style={{
            color: color('interactive', 'primary'),
          }}
          size={14}
        />
      }
    >
      {id}
    </Badge>
  )
}
