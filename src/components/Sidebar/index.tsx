import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  IconViewLayoutLeft,
  Tooltip,
  Button,
  useIsMobile,
  useControllableState,
  Stack,
  borderRadius,
  Text,
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
  size?: 'small' | 'regular'
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
  size,
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
    <Stack
      as="aside"
      direction="column"
      style={{
        flexShrink: 0,
        position: 'relative',
        width: open ? 248 : 65,
        height: '100%',
        borderRight: border(),
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <styled.div style={{ padding: '16px 12px' }}>{header}</styled.div>
      )}
      <SidebarContext.Provider value={{ open, value, onValueChange }}>
        <Stack direction="column" style={{ flex: '1', overflow: 'hidden' }}>
          <ScrollArea
            style={{
              padding: header ? '0 12px 64px' : '16px 12px 64px',
            }}
          >
            {children
              ? children
              : Array.isArray(data)
                ? data.map((e, i) => (
                    <SidebarItem
                      key={i}
                      prefix={e.prefix}
                      suffix={e.suffix}
                      value={e.value}
                      size={size}
                    >
                      {e.label}
                    </SidebarItem>
                  ))
                : Object.entries(data).map(([title, items]) => (
                    <SidebarGroup key={title} title={title}>
                      {items.map((e, i) => (
                        <SidebarItem
                          key={i}
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
        </Stack>
      </SidebarContext.Provider>
      {collapsable ? (
        <styled.div style={{ position: 'absolute', bottom: 16, right: 12 }}>
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
        </styled.div>
      ) : null}
    </Stack>
  )
}

export type SidebarItemProps = {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  children: string
  value: string
  size?: 'small' | 'regular'
}

export function SidebarItem({
  children,
  prefix,
  suffix,
  value,
  size,
}: SidebarItemProps) {
  const {
    open,
    value: sidebarValue,
    onValueChange,
  } = React.useContext(SidebarContext)

  if (open) {
    return (
      <Stack
        gap={8}
        style={{
          height: size === 'small' ? 32 : 40,
          padding: '0 8px',
          borderRadius: borderRadius('small'),
          color: color('content', 'primary'),
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
        <styled.div style={{ flexShrink: 0 }}>{prefix}</styled.div>
        <Text singleLine color="inherit">
          {children}
        </Text>
        <Stack justify="end" style={{ flexGrow: 1 }}>
          {suffix}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
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
    </Stack>
  )
}

export type SidebarGroupProps = {
  children: React.ReactNode
  title: string
}

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  const { open } = React.useContext(SidebarContext)

  return (
    <Stack direction="column">
      <Text variant="caption">{title}</Text>
      {children}
    </Stack>
  )
}
