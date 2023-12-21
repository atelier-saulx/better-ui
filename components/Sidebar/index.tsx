import * as React from 'react'
import { styled } from 'inlines'
import { IconViewLayoutLeft } from '../Icons'
import { Tooltip } from '../Tooltip'
import { Button } from '../Button'
import { useIsMobile } from '../../utils/hooks/useIsMobile'
import { useControllableState } from '../../utils/hooks/useControllableState'
import { textVariants } from '../Text'
import { borderRadius, color } from '../../utils/colors'

const SidebarContext = React.createContext({
  open: true,
  value: '',
  setValue: (_?: string) => {},
})

export type SidebarProps = {
  children: React.ReactNode
  value: string
  onChange: (value: string) => void
}

export function Sidebar({
  children,
  value: valueProp,
  onChange,
}: SidebarProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(true)
  const [value = '', setValue] = useControllableState({
    prop: valueProp,
    onChange,
  })

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [isMobile])

  return (
    <styled.aside
      style={{
        position: 'relative',
        width: open ? 248 : 65,
        height: '100%',
        borderRight: '1px solid var(--interactive-secondary)',
        padding: '16px 12px',
        '& > * + *': { marginTop: '8px' },
      }}
    >
      <SidebarContext.Provider value={{ open, value, setValue }}>
        {children}
      </SidebarContext.Provider>
      <div style={{ position: 'absolute', bottom: 16, right: 12 }}>
        <Tooltip
          content={open ? 'Collapse sidebar' : 'Expand sidebar'}
          side={open ? 'top' : 'right'}
        >
          <Button
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setOpen((p) => !p)
            }}
          >
            <IconViewLayoutLeft />
          </Button>
        </Tooltip>
      </div>
    </styled.aside>
  )
}

export type SidebarItemProps = {
  icon?: React.ReactNode
  children: string
  value: string
}

export function SidebarItem({ children, icon, value }: SidebarItemProps) {
  const { open, value: sidebarValue, setValue } = React.useContext(
    SidebarContext
  )

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
        {icon}
        <span
          style={{
            color: color('content', 'primary'),
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {children}
        </span>
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
        >
          {icon}
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
          ...textVariants.bodyStrong,
          color: color('content', 'secondary'),
          textTransform: 'uppercase',
          opacity: open ? 1 : 0,
        }}
      >
        {title}
      </div>
      {children}
    </styled.div>
  )
}
