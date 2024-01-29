import React, { ReactNode } from 'react'
import { Confirm } from '../../index.js'

export const SchemaConfirm = (p: {
  hasChanges: boolean
  confirmLabel?: ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}) => {
  if (!p.hasChanges) {
    return null
  }
  return (
    <Confirm
      cancelLabel="Discard changes"
      label={p.confirmLabel ?? 'Apply changes'}
      justify="start"
      onConfirm={p.onConfirm}
      onCancel={p.onCancel}
    />
  )
}
