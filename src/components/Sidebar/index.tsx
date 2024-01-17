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
} from '../../index.js'

const SidebarContext = React.createContext({
  open: true,
  value: '',
  setValue: (_?: string) => {},
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
  footer?: React.ReactNode
}

export function Sidebar({
  data,
  value: valueProp,
  onValueChange,
  open: openProp = true,
  onOpenChange,
  style,
  collapsable = true,
  children,
  header,
  footer,
}: SidebarProps) {
  const isMobile = useIsMobile()
  let [open, setOpen] = useControllableState({
    value: openProp,
    onChange: onOpenChange,
  })
  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange: onValueChange,
  })

  React.useEffect(() => {
    if (isMobile && collapsable) {
      setOpen(false)
    }
  }, [isMobile])

  children ??=
    data && Array.isArray(data)
      ? data.map((e) => (
          <SidebarItem prefix={e.prefix} suffix={e.suffix} value={e.value}>
            {e.label}
          </SidebarItem>
        ))
      : Object.entries(data).map(([title, items]) => (
          <SidebarGroup title={title}>
            {items.map((e) => (
              <SidebarItem prefix={e.prefix} suffix={e.suffix} value={e.value}>
                {e.label}
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))

  return (
    <styled.aside
      style={{
        flexShrink: 0,
        position: 'relative',
        width: open ? 248 : 65,
        height: '100%',
        borderRight: border(),
        padding: '16px 12px',
        '& > * + *': { marginTop: '8px' },
        ...style,
      }}
    >
      {header}
      <SidebarContext.Provider value={{ open, value, setValue }}>
<<<<<<< HEAD
        {Array.isArray(data)
          ? data.map((e, idx) => (
              <SidebarItem
                prefix={e.prefix}
                suffix={e.suffix}
                value={e.value}
                key={idx}
              >
                {e.label}
              </SidebarItem>
            ))
          : Object.entries(data).map(([title, items]) => (
              <SidebarGroup title={title}>
                {items.map((e, idx) => (
                  <SidebarItem
                    prefix={e.prefix}
                    suffix={e.suffix}
                    value={e.value}
                    key={idx}
                  >
                    {e.label}
                  </SidebarItem>
                ))}
              </SidebarGroup>
            ))}
=======
        {children}
>>>>>>> 0f440b2926b2bdd627dde1901a9840d2d5954891
      </SidebarContext.Provider>
      {collapsable ? (
        <div style={{ position: 'absolute', bottom: 16, right: 12 }}>
          <Tooltip
            content={open ? 'Collapse sidebar' : 'Expand sidebar'}
            side={open ? 'top' : 'right'}
          >
            <Button
              variant="neutral-transparent"
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

      {footer && (
        <div
          style={{
            position: 'absolute',
            bottom: open ? 16 : 64,
            left: 12,
            maxWidth: open ? '100%' : 40,
          }}
        >
          {footer}
        </div>
      )}
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
    setValue,
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
          '&:hover': {
            background: color('background', 'neutral'),
          },
          '& > * + *': { marginLeft: '10px' },
          ...(sidebarValue === value && {
            background: color('background', 'neutral'),
          }),
        }}
        onClick={() => {
          setValue(value)
        }}
      >
        {prefix}
        <span
          style={{
            color: color('content', 'primary'),
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
        ...(sidebarValue === value && {
          background: color('background', 'neutral'),
          borderRadius: borderRadius('small'),
          '&:hover': {
            background: 'none',
          },
        }),
      }}
    >
      <Tooltip content={children} side="right">
        <Button
          shape="square"
          onClick={() => {
            setValue(value)
          }}
          variant="neutral-transparent"
          style={{ fontSize: 14, fontWeight: 600, height: 40, width: 40 }}
        >
          {prefix ? prefix : children.substring(0, 2) + '...'}
        </Button>
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
        '& > * + *': { marginTop: '8px' },
        paddingTop: '32px',
        paddingBottom: '4px',
        '&:first-child': {
          paddingTop: '4px',
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
