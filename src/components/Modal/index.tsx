import * as React from 'react'
import { styled } from 'inlines'
import * as ModalBase from '@radix-ui/react-dialog'
import {
  useControllableState,
  Button,
  TextInput,
  borderRadius,
  color,
  border,
} from '../../index.js'

type UseModalContextProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = React.createContext<UseModalContextProps>({
  open: false,
  setOpen: () => {},
})

export const useModalContext = () => {
  return React.useContext(ModalContext)
}

export type ModalRootProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Root({
  children,
  open: openProp,
  onOpenChange,
  defaultOpen,
}: ModalRootProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen || false,
    onChange: onOpenChange,
  })

  return (
    <ModalContext.Provider
      value={{
        open: open as boolean,
        setOpen: setOpen as (open: React.SetStateAction<boolean>) => void,
      }}
    >
      <ModalBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </ModalBase.Root>
    </ModalContext.Provider>
  )
}

export type ModalTriggerProps = { children: React.ReactNode }

export function Trigger({ children }: ModalTriggerProps) {
  return (
    <ModalBase.Trigger asChild>
      <div>{children}</div>
    </ModalBase.Trigger>
  )
}

export type ModalOverlayProps = {
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode
}

export const Overlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ children }, ref) => {
    const { open, setOpen } = useModalContext()
    if (!open) {
      return null
    }
    return (
      <ModalBase.Portal>
        <ModalBase.Overlay
          style={{
            inset: 0,
            position: 'fixed',
            background: color('background', 'dimmer'),
          }}
        />
        <ModalBase.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
          ref={ref}
          style={{
            width: 552,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'calc(100% - 32px)',
            background: color('background', 'screen'),
            maxHeight: '85svh',
            borderRadius: borderRadius('small'),
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-elevation)',
            outline: 'none',
          }}
        >
          {typeof children === 'function'
            ? children({
                close: () => {
                  setOpen(false)
                },
              })
            : children}
        </ModalBase.Content>
      </ModalBase.Portal>
    )
  }
)

export type ModalTitleProps = {
  children: React.ReactNode
  description?: React.ReactNode
}

export function Title({ children, description }: ModalTitleProps) {
  return (
    <styled.div>
      <styled.div
        style={{
          color: color('content', 'primary'),
          fontSize: 18,
          lineHeight: '32px',
          fontWeight: 700,
        }}
      >
        {children}
      </styled.div>
      {description && (
        <styled.div
          style={{
            marginTop: 16,
            color: color('content', 'secondary'),
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
          }}
        >
          {description}
        </styled.div>
      )}
    </styled.div>
  )
}

export type ModalBodyProps = { children: React.ReactNode }

export function Body({ children }: ModalBodyProps) {
  return (
    <div
      style={{
        padding: '24px 32px',
        flex: 1,
        overflowY: 'auto',
        borderTop: border(),
        borderBottom: border(),
      }}
    >
      {children}
    </div>
  )
}

export type ModalActionsProps = { children: React.ReactNode }

export function Actions({ children }: ModalActionsProps) {
  return (
    <styled.div
      style={{
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        '& > * + *': {
          marginLeft: '24px',
        },
      }}
    >
      {children}
    </styled.div>
  )
}

const ModalProviderContext = React.createContext(null)

let modalId = 0
type ModalEl = React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
>

type ModelElFn = ({ close }: { close(val: any): void }) => ModalEl

type UseModalRes = {
  modals: ModalEl[]
  open(el: ModalEl | ModelElFn): Promise<any>
  alert(message: string): Promise<void>
  confirm(message: string): Promise<boolean>
  prompt(message: string): Promise<string | false>
  Provider(): React.ReactNode
}

export const useModal = (): UseModalRes => {
  const ctx = React.useContext(ModalProviderContext)

  if (!ctx) {
    console.warn('No ModalProvider context found')
    return {
      modals: [],
      async open() {},
      async alert() {},
      confirm: async () => false,
      prompt: async () => false,
      Provider: () => null,
    }
  }

  const { modals, setModals } = ctx
  const ref = React.useRef<UseModalRes>()

  if (!ref.current) {
    let update
    const open: UseModalRes['open'] = (el: any) => {
      return new Promise((resolve) => {
        const close = (val) => {
          const filter = (m: typeof modal) => m !== modal
          ref.current.modals = ref.current.modals.filter(filter)
          setModals(modals.filter(filter))
          update?.({})
          resolve(val)
        }

        if (typeof el === 'function') {
          el = el({ close })
        }

        const key = modalId++
        const onOpenChange = (val: boolean) => {
          if (val === false) {
            close(undefined)
          }
        }

        const modal =
          el.type === Modal ? (
            React.cloneElement(el, {
              key,
              onOpenChange,
            })
          ) : (
            <Modal key={key} onOpenChange={onOpenChange}>
              {el}
            </Modal>
          )

        ref.current.modals.push(modal)
        if (update) {
          update({})
        } else {
          setModals([...modals, modal])
        }
      })
    }

    ref.current = {
      modals: [],
      open,
      async alert(message) {
        open(<Modal>{message}</Modal>)
      },
      async prompt(message) {
        let val: string
        let confirmed: string

        await open(
          <Modal
            onConfirm={({ close }) => {
              confirmed = val
              close()
            }}
          >
            {message}
            <TextInput
              onChange={(v) => {
                val = v
              }}
            />
          </Modal>
        )

        return confirmed || false
      },
      async confirm(message) {
        let ok = false
        await open(
          <Modal
            onConfirm={({ close }) => {
              ok = true
              close()
            }}
          >
            {message}
          </Modal>
        )
        return ok
      },
      Provider() {
        const [, setState] = React.useState()
        update = setState
        return ref.current.modals
      },
    }
  }

  React.useEffect(() => {
    return () => {
      if (ref.current.modals.length) {
        const modalsSet = new Set(modals)
        ref.current.modals.forEach((modal) => {
          modalsSet.delete(modal)
        })
        setModals([...modalsSet])
      }
    }
  }, [])

  return ref.current
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = React.useState([])
  return (
    <ModalProviderContext.Provider value={{ modals, setModals }}>
      {children}
      {modals}
    </ModalProviderContext.Provider>
  )
}

export type ModalProps = {
  title?: ModalTitleProps['title']
  description?: ModalTitleProps['description']
  open?: boolean
  onOpenChange?: ModalRootProps['onOpenChange']
  children?: React.ReactNode
  onConfirm?({ close }: { close(): void }): void
  confirmLabel?: React.ReactNode
}

export const Modal = Object.assign(
  ({
    title,
    description,
    open = true,
    onOpenChange,
    children,
    onConfirm,
    confirmLabel = 'OK',
  }: ModalProps) => {
    return (
      <Modal.Root open={open} onOpenChange={onOpenChange}>
        <Modal.Overlay>
          {({ close }) => (
            <>
              {title || description ? (
                <Modal.Title title={title} description={description} />
              ) : null}
              {children ? <Modal.Body>{children}</Modal.Body> : null}
              <Modal.Actions>
                {onConfirm && (
                  <Button variant="neutral" onClick={close}>
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={
                    onConfirm
                      ? () => {
                          onConfirm({ close })
                        }
                      : close
                  }
                >
                  {confirmLabel}
                </Button>
              </Modal.Actions>
            </>
          )}
        </Modal.Overlay>
      </Modal.Root>
    )
  },
  {
    Provider: ModalProvider,
    useModal,
    Root,
    Trigger,
    Overlay,
    Title,
    Body,
    Actions,
  }
)
