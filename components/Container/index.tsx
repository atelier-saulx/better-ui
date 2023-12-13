import * as React from 'react'
import { styled } from 'inlines'
import { IconChevronDown } from '../Icons'
import { useControllableState } from '../../utils/hooks/useControllableState'

export type ContainerProps = {
  children?: React.ReactNode
  title: string
  description?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  expandable?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onClick?: () => void
  divider?: boolean
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
  divider = true,
}: ContainerProps) {
  const [expanded, setExpanded] = useControllableState({
    prop: expandedProp,
    defaultProp: false,
    onChange: onExpandedChange,
  })
  const headerRef = React.useRef<HTMLDivElement | null>(null)

  console.log(expanded)

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 8,
        border: '1px solid var(--interactive-secondary)',
      }}
    >
      <styled.div
        ref={headerRef}
        style={{
          display: 'flex',
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
              background: 'var(--background-neutral)',
            },
          }),
        }}
        onClick={(e: any) => {
          if (headerRef.current && headerRef.current.contains(e.target)) {
            onClick?.()

            if (expandable) {
              setExpanded((p) => !p)
            }
          }
        }}
      >
        {expandable && (
          <IconChevronDown style={{ rotate: expanded ? '0deg' : '-90deg' }} />
        )}
        {prefix && <div>{prefix}</div>}
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--content-primary)',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 14,
                color: 'var(--content-secondary)',
              }}
            >
              {description}
            </div>
          )}
        </div>
        {suffix && <div style={{ marginLeft: 'auto' }}>{suffix}</div>}
      </styled.div>
      {children && (!expandable || expanded) && (
        <div
          style={{
            padding: 16,
            ...(divider && {
              borderTop: '1px solid var(--interactive-secondary)',
            }),
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
