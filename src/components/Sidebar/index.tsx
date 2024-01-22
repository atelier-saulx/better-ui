import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  IconViewLayoutLeft,
  Tooltip,
  Button,
  useIsMobile,
  useControllableState,
  textVariants,
  borderRadius,
  color,
  border,
  ScrollArea,
} from '../../index.js'

const SidebarContext = React.createContext({
  open: true,
  value: '',
  onValueChange: (_?: string) => {},
})

type SidebarItem = {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value: string
  label: string
}

export type SidebarProps = {
  data?: SidebarItem[] | { [key: string]: SidebarItem[] }
  open?: boolean
  onOpenChange?: (value: boolean) => void
  value?: string
  onValueChange?: (value: string) => void
  style?: Style
  collapsable?: boolean
  children?: React.ReactNode
  header?: React.ReactNode
}

export function Sidebar({
  data,
  value,
  onValueChange,
  open: openProp = true,
  onOpenChange,
  style,
  collapsable = false,
  children,
  header,
}: SidebarProps) {
  const isMobile = useIsMobile()
  let [open, setOpen] = useControllableState({
    value: openProp,
    onChange: onOpenChange,
  })

  React.useEffect(() => {
    if (isMobile && collapsable) {
      setOpen(false)
    }
  }, [isMobile])

  return (
    <styled.aside
      style={{
        flexShrink: 0,
        position: 'relative',
        width: open ? 248 : 65,
        height: '100%',
        borderRight: border(),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && <div style={{ padding: '16px 12px' }}>{header}</div>}

      <SidebarContext.Provider value={{ open, value, onValueChange }}>
        <div style={{ flex: '1', overflow: 'hidden' }}>
          <ScrollArea
            style={{
              padding: header ? '0 12px 64px' : '16px 12px 64px',
            }}
          >
            {children
              ? children
              : Array.isArray(data)
                ? data.map((e) => (
                    <SidebarItem
                      prefix={e.prefix}
                      suffix={e.suffix}
                      value={e.value}
                    >
                      {e.label}
                    </SidebarItem>
                  ))
                : Object.entries(data).map(([title, items]) => (
                    <SidebarGroup title={title}>
                      {items.map((e) => (
                        <SidebarItem
                          prefix={e.prefix}
                          suffix={e.suffix}
                          value={e.value}
                        >
                          {e.label}
                        </SidebarItem>
                      ))}
                    </SidebarGroup>
                  ))}
          </ScrollArea>
        </div>
      </SidebarContext.Provider>
      {collapsable ? (
        <div style={{ position: 'absolute', bottom: 16, right: 12 }}>
          <Tooltip
            content={open ? 'Collapse sidebar' : 'Expand sidebar'}
            side={open ? 'top' : 'right'}
          >
            <Button
              variant="neutral"
              shape="square"
              onClick={() => {
                setOpen(!open)
              }}
            >
              <IconViewLayoutLeft />
            </Button>
          </Tooltip>
        </div>
      ) : null}
    </styled.aside>
  )
}

export type SidebarItemProps = {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  children: string
  value: string
}

export function SidebarItem({
  children,
  prefix,
  suffix,
  value,
}: SidebarItemProps) {
  const {
    open,
    value: sidebarValue,
    onValueChange,
  } = React.useContext(SidebarContext)

  if (open) {
    return (
      <styled.div
        style={{
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          borderRadius: borderRadius('small'),
          cursor: 'pointer',
          color: color('content', 'primary'),

          '&:not(:first-of-type)': {
            marginTop: '8px',
          },
          '& > * + *': { marginLeft: '10px' },
          ...(sidebarValue === value
            ? {
                color: color('interactive', 'primary'),
                background: color('interactive', 'primary-muted'),
              }
            : {
                '&:hover': {
                  background: color('background', 'neutral'),
                },
              }),
        }}
        onClick={() => {
          onValueChange(value)
        }}
      >
        {prefix}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {children}
        </span>
        <span style={{ marginLeft: 'auto' }}>{suffix}</span>
      </styled.div>
    )
  }

  return (
    <styled.div
      style={{
        display: 'flex',
        '&:not(:first-of-type)': {
          marginTop: '8px',
        },
      }}
    >
      <Tooltip content={children} side="right">
        <styled.div
          onClick={() => {
            onValueChange(value)
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: borderRadius('small'),
            fontSize: 14,
            fontWeight: 600,
            height: 40,
            width: 40,
            color: color('content', 'primary'),
            '&:hover': {
              background: color('background', 'neutral'),
            },
            ...(sidebarValue === value
              ? {
                  color: color('interactive', 'primary'),
                  background: color('interactive', 'primary-muted'),
                }
              : {
                  '&:hover': {
                    background: color('background', 'neutral'),
                  },
                }),
          }}
        >
          {prefix ? prefix : children.substring(0, 2) + '...'}
        </styled.div>
      </Tooltip>
    </styled.div>
  )
}

export type SidebarGroupProps = {
  children: React.ReactNode
  title: string
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  const { open } = React.useContext(SidebarContext)

  return (
    <styled.div
      style={{
        '&:not(:first-child)': {
          marginTop: '24px',
        },
      }}
    >
      <div
        style={{
          paddingLeft: '4px',
          paddingRight: '4px',
          ...textVariants['body-strong'],
          color: color('content', 'secondary'),
          textTransform: 'uppercase',
          opacity: open ? 1 : 0,
          height: 24,
        }}
      >
        {title}
      </div>
      {children}
    </styled.div>
  )
}
