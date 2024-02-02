import React, { ReactNode, useEffect, useState, useRef } from 'react'
import { Confirm, color, Stack, borderRadius } from '../../index.js'
import { Variant } from './types.js'

export const FormConfirm = (p: {
  variant: Variant
  hasChanges: boolean
  confirmLabel?: ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}) => {
  const ref = useRef<any>()
  const show =
    p.hasChanges && !(p.variant === 'bare' || p.variant === 'no-confirm')

  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (ref.current) {
      let found
      let prev = ref.current.parentNode
      while (prev && !found) {
        if (prev.scrollHeight > prev.clientHeight) {
          found = prev
        }
        prev = prev.parentNode
      }
      setIsSticky(false)

      const scroll = () => {
        if (ref.current.getBoundingClientRect().y < 33) {
          setIsSticky(true)
        } else {
          setIsSticky(false)
        }
      }

      if (found) {
        found.addEventListener('scroll', scroll)
        return () => {
          found.removeEventListener('scroll', scroll)
        }
      }
    }
  }, [show])

  return (
    <Stack
      display={show ? 'block' : null}
      ref={ref}
      style={{
        top: '0px',
        height: 0,
        maxHeight: 0,
        position: 'sticky',
      }}
    >
      <Stack justify="end">
        <Stack style={{ flexGrow: 1 }} />
        <Stack
          fitContent
          style={{
            flexGrow: 0,
          }}
        >
          <Confirm
            style={{
              transform: 'translate(16px,0px)',
              padding: '12px 16px 12px 16px',
              borderRadius: borderRadius('small'),
              boxShadow: isSticky
                ? '0px 0px 10px ' + color('background', 'neutral')
                : null,
              backgroundColor: isSticky ? color('background', 'screen') : null,
            }}
            cancelLabel="Discard changes"
            label={p.confirmLabel ?? 'Apply changes'}
            justify="end"
            variant={'small'}
            onConfirm={p.onConfirm}
            onCancel={p.onCancel}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
