import React, { ReactNode } from 'react'
import { Confirm } from '../../index.js'
import { Variant } from './types.js'

// setWalker
export const FormConfirm = (p: {
  variant: Variant
  hasChanges: boolean
  confirmLabel?: ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}) => {
  if (!p.hasChanges || p.variant === 'bare' || p.variant === 'no-confirm') {
    return null
  }
  return (
    <Confirm
      style={{
        height: 0,
        // marginBottom: 16,
        zIndex: 1, // for code block...
        position: 'sticky',
        top: 0,
      }}
      cancelLabel="Discard changes"
      label={p.confirmLabel ?? 'Apply changes'}
      justify="end"
      variant={'small'}
      onConfirm={p.onConfirm}
      onCancel={p.onCancel}
    />
  )
}
