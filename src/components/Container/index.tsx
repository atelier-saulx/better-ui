import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  IconChevronDown,
  useControllableState,
  color,
  border,
  Text,
  textVariants,
} from '../../index.js'

export type ContainerProps = {
  children?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  expandable?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onClick?: () => void
  divider?: boolean
  style?: Style
  bodyStyle?: Style
}

export function Container({
  children,
  title,
  description,
  prefix,
  suffix,
  expandable = false,
  expanded: expandedProp,
  onClick,
  onExpandedChange,
  divider,
  style,
  bodyStyle,
}: ContainerProps) {
  if (divider === undefined) {
    divider = !!(title ?? description ?? prefix ?? suffix)
  }

  const [expanded, setExpanded] = useControllableState<boolean>({
    prop: expandedProp as boolean,
    defaultProp: false,
    onChange: onExpandedChange as () => void,
  })
  const headerRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <styled.div
      style={{
        width: '100%',
        borderRadius: 8,
        border: border(),
        ...style,
      }}
    >
      <styled.div
        ref={headerRef}
        style={{
          display: !expandable && !divider ? 'none' : 'flex',
          alignItems: 'center',
          gap: 8,
          padding: 16,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomRightRadius: expanded ? 0 : 8,
          borderBottomLeftRadius: expanded ? 0 : 8,
          ...((expandable || onClick) && {
            cursor: 'pointer',
            '&:hover': {
              background: color('background', 'neutral'),
            },
          }),
        }}
        onClick={(e: any) => {
          if (headerRef.current && headerRef.current.contains(e.target)) {
            onClick?.()

            if (expandable) {
              setExpanded(!expanded)
            }
          }
        }}
      >
        {expandable && (
          <IconChevronDown style={{ rotate: expanded ? '0deg' : '-90deg' }} />
        )}
        {prefix && <div>{prefix}</div>}
        <div>
          {title && (
            <div style={{ marginBottom: -4, ...textVariants['body-strong'] }}>
              {title}
            </div>
          )}
          {description && <Text color="secondary">{description}</Text>}
        </div>
        {suffix && (
          <styled.div style={{ marginLeft: 'auto' }}>{suffix}</styled.div>
        )}
      </styled.div>
      {children && (!expandable || expanded) && (
        <styled.div
          style={{
            padding: 16,
            ...(divider && {
              borderTop: border(),
            }),
            ...bodyStyle,
          }}
        >
          {children}
        </styled.div>
      )}
    </styled.div>
  )
}
