import * as React from 'react'
import { createPortal } from 'react-dom'
import { IconClose, textVariants, borderRadius, color } from '../../index.js'

type Toast =
  | string
  | { text: string; prefix?: React.ReactNode; suffix?: React.ReactNode }
type ToastVariant = 'neutral' | 'informative' | 'warning' | 'error'

const ToastContext = React.createContext<
  (toast: Toast, variant?: ToastVariant) => void
>(() => {})

type ToastContextProviderProps = {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastContextProviderProps) {
  const rerender = React.useState({})[1]
  const queue = React.useRef<
    {
      id: number
      toast: Toast
      variant: ToastVariant
      entering?: boolean
      leaving?: boolean
      leaveTimeoutId?: number
      height?: number
    }[]
  >([])

  function showToast(toast: Toast, variant: ToastVariant = 'neutral') {
    const id = window.setTimeout(() => {
      hideToast(id)
    }, 3500)

    window.setTimeout(() => {
      queue.current = queue.current.map((e) =>
        e.id === id ? { ...e, entering: false } : e,
      )
      rerender({})
    }, 0)

    queue.current = [{ id, toast, variant, entering: true }, ...queue.current]
    rerender({})
  }

  function hideToast(id: number) {
    window.clearTimeout(id)

    const leaveTimeoutId = window.setTimeout(() => {
      queue.current = queue.current.filter((e) => e.id !== id)
      rerender({})
    }, 150)

    queue.current = queue.current.map((e) =>
      e.id === id ? { ...e, leaving: true, leaveTimeoutId } : e,
    )
    rerender({})
  }

  React.useEffect(() => {
    return () => {
      for (const toast of queue.current) {
        window.clearTimeout(toast.id)
        if (toast.leaveTimeoutId) {
          window.clearTimeout(toast.leaveTimeoutId)
        }
      }
    }
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            maxWidth: 'calc(100% - 48px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            zIndex: 20,
          }}
        >
          {queue.current.map(
            ({ id, toast, leaving, entering, variant }, index) => {
              const sumOfPrevToastHeights = (
                index === 0 ? [] : queue.current.slice(0, index)
              ).reduce((acc, curr) => acc + (curr?.height ?? 0), 0)

              console.log(
                index,
                index > 0 && queue.current.some((e) => e.entering)
                  ? '250ms'
                  : 'none',
              )

              return (
                <div
                  style={{
                    position: 'absolute',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    borderRadius: borderRadius('small'),
                    right: 0,
                    gap: 16,
                    bottom: 0,
                    transitionProperty: 'transform opacity',
                    transitionDuration: leaving ? '150ms' : '250ms',
                    transitionTimingFunction: 'cubic-bezier(.25,.75,.6,.98)',
                    opacity: entering || leaving ? 0 : 1,
                    transform: entering
                      ? 'translate3d(0,calc(100% + 24px),0)'
                      : `translate3d(0,-${
                          sumOfPrevToastHeights + index * 12
                        }px,0)`,
                    ...(variant === 'neutral' && {
                      color: color('content', 'inverted'),
                      background: color('background', 'inverted'),
                    }),
                    ...(variant === 'informative' && {
                      color: color('semantic-color', 'positive'),
                      background: color('semantic-background', 'positive'),
                    }),
                    ...(variant === 'warning' && {
                      color: color('semantic-color', 'warning'),
                      background: color('semantic-background', 'warning'),
                    }),
                    ...(variant === 'error' && {
                      color: color('semantic-color', 'error'),
                      background: color('semantic-background', 'error'),
                    }),
                  }}
                  key={id}
                  ref={(ref) => {
                    if (
                      ref &&
                      !queue.current.find((e) => e.id === id)?.height
                    ) {
                      queue.current = queue.current.map((e) =>
                        e.id === id
                          ? { ...e, height: ref.getBoundingClientRect().height }
                          : e,
                      )
                      rerender({})
                    }
                  }}
                >
                  {typeof toast === 'object' ? (
                    <>
                      {toast?.prefix}
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          ...textVariants['body-bold'],
                        }}
                      >
                        {toast.text}
                      </div>
                      {toast?.suffix}
                    </>
                  ) : (
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        ...textVariants['body-bold'],
                      }}
                    >
                      {toast}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: 4,
                      margin: '-4px',
                      borderRadius: 6,
                    }}
                    onClick={() => {
                      hideToast(id)
                    }}
                  >
                    <IconClose />
                  </div>
                </div>
              )
            },
          )}
        </div>,
        document.body,
      )}
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return React.useContext(ToastContext)
}
