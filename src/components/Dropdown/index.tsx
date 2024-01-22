import * as React from 'react'
import { createPortal } from 'react-dom'
import { ScrollArea, border, borderRadius, color } from '../../index.js'
import { styled } from 'inlines'

export const PopoverContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  triggerRef: React.RefObject<HTMLElement>
}>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
})

type RootProps = {
  children: React.ReactNode
  defaultTriggerRef?: HTMLElement
  defaultOpen?: boolean
}
function Root({ children, defaultTriggerRef, defaultOpen }: RootProps) {
  const [open, setOpen] = React.useState(defaultOpen ?? false)
  const triggerRef = React.useRef<HTMLElement>(defaultTriggerRef ?? null)

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  )
}

type TriggerProps = { children: React.ReactElement }
function Trigger({ children }: TriggerProps) {
  const { setOpen, triggerRef } = React.useContext(PopoverContext)

  return React.cloneElement(children, {
    onClick: (e: MouseEvent) => {
      children.props.onClick?.(e)
      setOpen((p) => !p)
    },
    ref: triggerRef,
  })
}

type ItemsProps = { children: React.ReactNode }
function Items({ children }: ItemsProps) {
  const { open, triggerRef, setOpen } = React.useContext(PopoverContext)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<{
    top: number
    left: number
    orientation: string
    availableHeight: number
  } | null>(null)

  const calculatePosition = React.useCallback(() => {
    if (!triggerRef.current || !containerRef.current || !open) return

    const {
      top: triggerTop,
      left: triggerLeft,
      height: triggerHeight,
      width: triggerWidth,
    } = triggerRef.current.getBoundingClientRect()

    const { width: containerWidth } =
      containerRef.current.getBoundingClientRect()

    const GAP = 8

    let left = triggerLeft + triggerWidth / 2 - containerWidth / 2
    if (left < GAP) {
      left = GAP
    }
    if (left + containerWidth + GAP > document.documentElement.clientWidth) {
      left = document.documentElement.clientWidth - containerWidth - GAP
    }

    let top =
      document.documentElement.scrollTop + triggerTop + triggerHeight + GAP
    const availableHeightToBottom =
      document.documentElement.clientHeight -
      triggerTop -
      triggerHeight -
      GAP * 2
    // const availableHeightToTop = triggerTop - GAP * 2

    let availableHeight = availableHeightToBottom

    let orientation = 'top-to-bottom'

    // TODO improve this logic
    // if (availableHeightToTop > availableHeightToBottom * 2) {
    //   orientation = 'bottom-to-top'
    //   top =
    //     document.documentElement.scrollTop -
    //     document.documentElement.clientHeight +
    //     triggerTop -
    //     GAP
    //   availableHeight = availableHeightToTop
    // }

    setPosition({
      top: top,
      left: left,
      availableHeight,
      orientation,
    })
  }, [triggerRef, open])

  const handleClick = React.useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current || !triggerRef.current) return

      if (
        !triggerRef.current.contains(event.target as Node) &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    },
    [triggerRef, setOpen],
  )

  React.useLayoutEffect(() => {
    calculatePosition()

    global.addEventListener('resize', calculatePosition)

    return () => {
      global.removeEventListener('resize', calculatePosition)
    }
  }, [calculatePosition])

  React.useEffect(() => {
    if (open) {
      global.addEventListener('click', handleClick)

      return () => {
        global.removeEventListener('click', handleClick)
      }
    }
  }, [open, handleClick])

  if (!open) return null

  return createPortal(
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...(position && {
          transform: `translate3d(${position.left}px, ${position.top}px, 0px)`,
          left: 0,
          right: 'auto',
          top: position.orientation === 'top-to-bottom' ? 0 : 'auto',
          bottom: position.orientation === 'bottom-to-top' ? 0 : 'auto',
        }),
      }}
    >
      <ScrollArea
        style={{
          height: 'fit-content',
          width: 258,
          background: color('background', 'screen'),
          borderRadius: borderRadius('small'),
          border: border(),
          boxShadow: 'var(--shadow-elevation)',
          padding: 8,
          ...(position && { maxHeight: position?.availableHeight }),
        }}
      >
        {children}
      </ScrollArea>
    </div>,
    document.body,
  )
}

export type ItemProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}

export function Item({ icon, children, onClick }: ItemProps) {
  const { setOpen } = React.useContext(PopoverContext)

  return (
    <styled.div
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      style={{
        padding: '4px 12px',
        borderRadius: borderRadius('small'),
        fontSize: 14,
        lineHeight: '24px',
        position: 'relative',
        outline: 'none',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 10,
        '&:hover': {
          background: color('background', 'neutral'),
        },
        cursor: 'pointer',
      }}
    >
      {icon && <div style={{ display: 'flex' }}>{icon}</div>}
      <div>{children}</div>
    </styled.div>
  )
}

const DropdownHookContext = React.createContext<{
  dropdown: null
  setDropdown: React.Dispatch<
    React.SetStateAction<{
      target: HTMLElement
      content: React.ReactNode
      close: (value: any) => void
    } | null>
  >
}>({
  dropdown: null,
  setDropdown: () => {},
})

type DropdownHookProviderProps = {
  children: React.ReactNode
}

export function DropdownHookProvider({ children }: DropdownHookProviderProps) {
  const [dropdown, setDropdown] = React.useState(null)

  return (
    <DropdownHookContext.Provider value={{ dropdown, setDropdown }}>
      {children}
      {dropdown && (
        <PopoverContext.Provider
          value={{
            open: true,
            setOpen: () => {
              dropdown.close()
              setDropdown(null)
            },
            triggerRef: { current: document.activeElement as HTMLElement },
          }}
        >
          {dropdown.content}
        </PopoverContext.Provider>
      )}
    </DropdownHookContext.Provider>
  )
}

export function useDropdown() {
  const { setDropdown } = React.useContext(DropdownHookContext)

  function open(
    fn: ({ close }: { close: (value: any) => void }) => React.ReactNode,
    props: any,
  ) {
    return new Promise((resolve) => {
      function close(value: any) {
        resolve(value)
      }

      setDropdown({
        target: document.activeElement as HTMLElement,
        content: fn({ close, ...props }),
        close,
      })
    })
  }

  return { open }
}

export const Dropdown = Object.assign(
  ({ trigger, children }) => {
    return (
      <Root>
        <Trigger>{trigger}</Trigger>
        <Items>{children}</Items>
      </Root>
    )
  },
  {
    Root,
    Trigger,
    Items,
    Item,
  },
)
