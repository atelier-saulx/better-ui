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
        <styled.div style={{ padding: '16px 12px 36px 16px' }}>
          {header}
        </styled.div>
      )}
      <SidebarContext.Provider value={{ open, value, onValueChange }}>
        <ScrollArea
          style={{
            paddingLeft: 8,
            paddingRight: 8,

            paddingTop: header ? 0 : 8,
          }}
        >
          <Stack style={{}} direction="column" gap={6}>
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
          </Stack>
        </ScrollArea>
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
          ...(size === 'small' && {
            '& svg': {
              height: 16,
              width: 16,
            },
          }),
          height: size === 'small' ? 28 : 40,
          padding: '0 8px',
          borderRadius: borderRadius(size === 'small' ? 'tiny' : 'small'),
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
        {prefix ? (
          <styled.div style={{ flexShrink: 0 }}>{prefix}</styled.div>
        ) : null}
        <Text
          variant={sidebarValue === value ? 'body-bold' : 'body'}
          singleLine
          color="inherit"
          style={{ flexGrow: 1 }}
        >
          {children}
        </Text>
        <Stack fitContent justify="end">
          {suffix}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
      // gap
      style={{
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
  // const { open } = React.useContext(SidebarContext)

  return (
    <Stack gap={8} direction="column">
      <Text style={{ marginLeft: 7 }} variant="caption">
        {title}
      </Text>
      {children}
    </Stack>
  )
}
