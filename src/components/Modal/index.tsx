import React, { useContext, createContext } from 'react'
import { styled, Style } from 'inlines'
import * as ModalBase from '@radix-ui/react-dialog'
import {
  useControllableState,
  Button,
  TextInput,
  borderRadius,
  color,
  border,
  Text,
  IconAlertFill,
  ButtonProps,
  ScrollArea,
  boxShadow,
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

export const OnOpenChangeContext = createContext(null)

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
    value: openProp,
    defaultValue: defaultOpen || false,
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
  return <ModalBase.Trigger asChild>{children}</ModalBase.Trigger>
}

export type ModalOverlayProps = {
  style?: Style
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode
}

export const Overlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ children, style }, ref) => {
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
            boxShadow: boxShadow('elevation'),
            outline: 'none',
            ...style,
          }}
        >
          {/* <ScrollArea
            style={{
              height: '100%',
              maxHeight: 'calc(100vh - 60px)',
              marginTop: '-32px',
              borderRadius: 8,
              backgroundColor: color('background', 'screen'),
            }}
          > */}
          {typeof children === 'function'
            ? children({
                close: () => {
                  setOpen(false)
                },
              })
            : children}
          {/* </ScrollArea> */}
        </ModalBase.Content>
      </ModalBase.Portal>
    )
  },
)

export type ModalTitleProps = {
  children: React.ReactNode
  description?: React.ReactNode
  style?: Style
}

export function Title({ children, description, style }: ModalTitleProps) {
  return (
    <styled.div style={{ padding: '20px 32px', ...style }}>
      <Text
        color="primary"
        variant="title-modal"
        style={{ marginBottom: description ? 12 : 0 }}
      >
        {children}
      </Text>
      {description && (
        <Text color="secondary" variant="body-bold">
          {description}
        </Text>
      )}
    </styled.div>
  )
}

export type ModalMessageProps = {
  variant?: 'warning' | 'error' | 'informative' | 'positive' | 'neutral'
  message?: React.ReactNode
  style?: Style
}

export function Message({
  variant = 'neutral',
  message,
  style,
}: ModalMessageProps) {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        padding: '12px 16px',
        width: '100%',
        backgroundColor:
          variant === 'error'
            ? color('semantic-background', 'error-muted')
            : variant === 'warning'
              ? color('semantic-background', 'warning-muted')
              : variant === 'informative'
                ? color('semantic-background', 'informative-muted')
                : variant === 'positive'
                  ? color('semantic-background', 'positive-muted')
                  : color('semantic-background', 'neutral-muted'),
        ...style,
      }}
    >
      <IconAlertFill
        style={{
          marginRight: 12,
          color:
            variant === 'error'
              ? color('semantic-background', 'error')
              : variant === 'warning'
                ? color('semantic-background', 'warning')
                : variant === 'informative'
                  ? color('semantic-background', 'informative')
                  : variant === 'positive'
                    ? color('semantic-background', 'positive')
                    : color('semantic-background', 'neutral'),
        }}
      />
      <Text variant="body-bold">{message}</Text>
    </styled.div>
  )
}

export type ModalBodyProps = { children: React.ReactNode; style?: Style }

export function Body({ children, style }: ModalBodyProps) {
  return (
    <div
      style={{
        padding: '24px 32px',
        flex: 1,
        overflowY: 'auto',
        borderTop: border(),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export type ModalActionsProps = { children: React.ReactNode; style?: Style }

export function Actions({ children, style }: ModalActionsProps) {
  return (
    <>
      <div style={{ height: 88 }}></div>
      <styled.div
        style={{
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          '& > * + *': {
            marginLeft: '24px',
          },
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: color('background', 'screen'),
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderTop: border(),
          ...style,
        }}
      >
        {children}
      </styled.div>
    </>
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
  confirm(msgOrTitle: string, msg?: string): Promise<boolean>
  prompt(message: string): Promise<string | false>
  Provider(): React.ReactNode
}

export const useModal = (): UseModalRes => {
  const ctx = React.useContext(ModalProviderContext)

  if (!ctx) {
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
          setModals((modals) => modals.filter(filter))
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
            <OnOpenChangeContext.Provider key={key} value={onOpenChange}>
              {el}
            </OnOpenChangeContext.Provider>
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
          </Modal>,
        )

        return confirmed || false
      },
      async confirm(msgOrTitle, msg) {
        let ok = false
        let title = (msg && msgOrTitle) || null
        await open(
          <Modal
            title={title}
            onConfirm={({ close }) => {
              ok = true
              close()
            }}
          >
            {msg || msgOrTitle}
          </Modal>,
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
  title?: ModalTitleProps['children']
  description?: ModalTitleProps['description']
  open?: boolean
  onOpenChange?: ModalRootProps['onOpenChange']
  children?: React.ReactNode
  onConfirm?({ close }: { close(): void }): void
  confirmLabel?: React.ReactNode
  variant?: 'small' | 'regular' | 'large'
  style?: Style
  confirmProps?: ButtonProps
  noActions?: boolean
}

export const Modal = Object.assign(
  ({
    title,
    description,
    open = true,
    onOpenChange,
    children,
    onConfirm,
    variant = 'small',
    confirmLabel = 'OK',
    confirmProps,
    style,
    noActions,
  }: ModalProps) => {
    return (
      <Modal.Root
        open={open}
        onOpenChange={onOpenChange || useContext(OnOpenChangeContext)}
      >
        <Modal.Overlay
          style={{
            width: 'calc(100vw - 48px)',
            height: variant === 'large' ? 'calc(100vw - 60px)' : undefined,

            maxWidth:
              variant === 'small' ? 552 : variant === 'regular' ? 750 : 1250,
            ...style,
          }}
        >
          {({ close }) => (
            // <ScrollArea
            //   style={{
            //     height: '100%',
            //     maxHeight: 'calc(100vh - 60px)',
            //     borderRadius: 8,
            //   }}
            // >
            <>
              {title || description ? (
                <Modal.Title description={description}>{title}</Modal.Title>
              ) : null}
              {children ? <Modal.Body>{children}</Modal.Body> : null}

              {noActions ? null : (
                <>
                  <Modal.Actions>
                    {onConfirm && (
                      <Button variant="neutral" onClick={close}>
                        Cancel
                      </Button>
                    )}
                    <Button
                      keyboardShortcut="Enter"
                      displayKeyboardShortcut
                      onClick={
                        onConfirm
                          ? async () => {
                              await onConfirm({ close })
                            }
                          : close
                      }
                      {...confirmProps}
                    >
                      {confirmLabel}
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </>
            // </ScrollArea>
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
    Message,
    Actions,
  },
)
