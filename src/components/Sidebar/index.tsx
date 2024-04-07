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
  header?: React.ReactNode | React.FC<{ open: boolean }>
  footer?: React.ReactNode | React.FC<{ open: boolean }>
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
  footer,
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
        width: open ? 248 : 65,
        height: '100%',
        borderRight: border(),
        display: 'flex',
        ...style,
      }}
    >
      <SidebarContext.Provider value={{ open, value, onValueChange }}>
        <ScrollArea
          style={{
            // background: 'yellow',
            // width: '100%',
            paddingLeft: open ? 8 : size === 'small' ? 4 : 12,
            paddingRight: open ? 12 : size === 'small' ? 8 : 12,
            paddingTop: 32,
            paddingBottom: 24,
          }}
        >
          {header && (
            <Stack
              justify={open ? 'start' : 'center'}
              style={{
                padding: 8,
                width: '100%',
                flexShrink: 0,
                // borderBottom: border(),
              }}
            >
              {typeof header === 'function'
                ? React.createElement(header, { open })
                : header}
            </Stack>
          )}
          <div
            style={{
              flex: 1,
              width: '100%',
              overflow: 'auto',
              padding: '12px 8px',
            }}
          >
            <Stack
              justify="start"
              direction="column"
              gap={size === 'small' ? 4 : 8}
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
                  : Object.entries(data).map(([title, items], index) => (
                      <SidebarGroup
                        size={size}
                        key={title}
                        title={title}
                        index={index}
                      >
                        {items.map((e, i) => (
                          <SidebarItem
                            key={i}
                            prefix={e.prefix}
                            suffix={e.suffix}
                            value={e.value}
                            size={size}
                          >
                            {e.label}
                          </SidebarItem>
                        ))}
                      </SidebarGroup>
                    ))}
            </Stack>
          </div>
          {(footer || collapsable) && (
            <>
              <Stack
                justify={open ? 'start' : 'center'}
                gap={8}
                style={{
                  padding: 8,
                  width: '100%',
                  flexShrink: 0,
                  // borderTop: border(),
                }}
              >
                {footer &&
                  (typeof footer === 'function'
                    ? React.createElement(footer, { open })
                    : footer)}
                {collapsable && (
                  <Stack justify="end" style={{ width: '100%' }}>
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
                  </Stack>
                )}
              </Stack>
            </>
          )}
        </ScrollArea>
      </SidebarContext.Provider>
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
          height: size === 'small' ? 32 : 40,
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
          noSelect
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
          {prefix !== undefined
            ? prefix
            : children.substring(0, 2).toUpperCase()}
        </styled.div>
      </Tooltip>
    </Stack>
  )
}

export type SidebarGroupProps = {
  children: React.ReactNode
  title: string
  index: number
  size: 'small' | 'regular'
}

export function SidebarGroup({
  title,
  children,
  index,
  size,
}: SidebarGroupProps) {
  const { open } = React.useContext(SidebarContext)

  return (
    <Stack
      gap={size === 'small' ? 4 : 8}
      direction="column"
      style={{
        marginTop: index > 0 ? 32 : 0,
      }}
    >
      {open ? (
        <Text
          noSelect
          style={{ marginLeft: 7, marginBottom: 4 }}
          variant="caption"
        >
          {title}
        </Text>
      ) : (
        <div style={{ marginTop: 8, border: border(), width: '100%' }} />
      )}
      {children}
    </Stack>
  )
}
