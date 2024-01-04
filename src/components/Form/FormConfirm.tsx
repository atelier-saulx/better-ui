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
  if (!p.hasChanges || p.variant === 'bare') {
    return null
  }
  return (
    <Confirm
      style={{
        marginTop: -16,
      }}
      cancelLabel="Discard changes"
      label={p.confirmLabel ?? 'Apply changes'}
      justify="start"
      variant={p.variant}
      onConfirm={p.onConfirm}
      onCancel={p.onCancel}
    />
  )
}
