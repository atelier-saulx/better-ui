import * as React from 'react'
import { hash } from '@saulx/hash'
import { Style } from 'inlines'
import {
  MUTED_SEMANTIC_COLORS,
  SEMANTIC_COLORS,
  SemanticVariant,
  borderRadius,
  border,
  color as getColor,
  textVariants,
} from '../../index.js'

// TODO think about if we need text over image, if so how do we handle the colors of the text

export type ThumbnailProps = {
  src?: string
  text?: string
  color?: SemanticVariant | 'auto' | 'auto-muted'
  size?:
    | 'extra-extra-large'
    | 'extra-large'
    | 'large'
    | 'regular'
    | 'small'
    | 'extra-small'
  shape?: 'square' | 'circle'
  icon?: React.ReactNode
  onClick?: () => void
  count?: number
  outline?: boolean
  style?: Style
}

export function Thumbnail({
  src,
  text,
  size = 'regular',
  shape = 'square',
  color: colorProp = 'auto',
  icon,
  onClick,
  count,
  outline,
  style,
}: ThumbnailProps) {
  const color = React.useMemo(() => {
    //  if (!text) return

    if (colorProp === 'auto' || colorProp === 'auto-muted') {
      const colors =
        colorProp === 'auto' ? SEMANTIC_COLORS : MUTED_SEMANTIC_COLORS

      const index =
        Math.floor(
          Math.abs(Math.sin(hash(text || icon?.toString() || 'xxx'))) *
            (colors.length - 1)
        ) + 1

      return colors[index]
    }

    return colorProp
  }, [colorProp, text])

  let borderColor

  if (color.includes('muted')) {
    borderColor = color.substring(0, color.length - 6)
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border:
          color.includes('muted') && outline
            ? `1px solid ${getColor('semantic-background', borderColor)}`
            : `0px solid transparent`,
        color: getColor('semantic-color', color),
        background: getColor('semantic-background', color),
        ...(shape === 'square' && {
          borderRadius: borderRadius('medium'),
        }),
        ...(shape === 'circle' && {
          borderRadius: borderRadius('full'),
        }),
        ...(size === 'extra-extra-large' && {
          width: 80,
          height: 80,
        }),
        ...(size === 'extra-large' && {
          width: 60,
          height: 60,
        }),
        ...(size === 'large' && {
          width: 48,
          height: 48,
        }),
        ...(size === 'regular' && {
          width: 40,
          height: 40,
        }),
        ...(size === 'small' && {
          width: 32,
          height: 32,
        }),
        ...(size === 'extra-small' && {
          width: 24,
          height: 24,
        }),
        ...style,
      }}
      onClick={onClick}
    >
      {icon && !src && !text && icon}
      {src && (
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...(shape === 'square' && {
              borderRadius: borderRadius('medium'),
            }),
            ...(shape === 'circle' && {
              borderRadius: 9999,
            }),
          }}
          src={src}
        />
      )}
      {!src && text && (
        <span
          style={{
            ...(size === 'extra-extra-large' && {
              fontSize: '32px',
              fontWeight: 700,
            }),
            ...(size === 'extra-large' && {
              fontSize: '24px',
              fontWeight: 700,
            }),
            ...(size === 'large' && {
              fontSize: '18px',
              fontWeight: 700,
            }),
            ...(size === 'regular' && {
              fontSize: '16px',
              fontWeight: 600,
            }),
            ...(size === 'small' && {
              fontSize: '12px',
              fontWeight: 600,
            }),
            ...(size === 'extra-small' && {
              fontSize: '10px',
              fontWeight: 500,
            }),
          }}
        >
          {text.slice(0, 2).toUpperCase()}
        </span>
      )}
      {typeof count !== 'undefined' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: getColor('background', 'screen'),
            color: getColor('content', 'primary'),
            border: border(),
            padding: '0 4px',
            borderRadius: borderRadius('full'),
            ...textVariants['body-strong'],
            lineHeight: '18px',
            transform: 'translate(30%, -30%)',
          }}
        >
          {count}
        </div>
      )}
    </div>
  )
}
