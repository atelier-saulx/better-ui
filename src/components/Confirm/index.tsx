import * as React from 'react'
import { Style } from 'inlines'
import {
  Stack,
  Button,
  Text,
  IconClose,
  IconCheckLarge,
  color as getColor,
} from '../../index.js'

type ConfirmProps = {
  label?: React.ReactNode
  style?: Style
  variant?: 'buttons' | 'icons'
  value?: any
  onConfirm: ((value?: any) => void) | ((value?: any) => Promise<void>)
  onCancel: (value?: any) => void
}

export function Confirm({
  style,
  variant,
  label,
  onConfirm,
  onCancel,
}: ConfirmProps) {
  return variant === 'icons' ? (
    <Stack
      justify="end"
      style={{
        marginTop: 16,
        paddingTop: 16,
        marginRight: 8,
        ...style,
      }}
    >
      {label ? <Text color="secondary">{label}</Text> : null}
      <Button
        variant="icon-only"
        onClick={() => {
          return onConfirm()
        }}
        style={{ marginLeft: 16 }}
        prefix={
          <IconClose style={{ color: getColor('content', 'secondary') }} />
        }
      />
      <Button
        variant="icon-only"
        onClick={async () => {
          return onCancel()
        }}
        style={{ marginLeft: 4 }}
        prefix={
          <IconCheckLarge
            style={{ color: getColor('interactive', 'primary') }}
          />
        }
      />
    </Stack>
  ) : (
    <Stack justify="end">
      <Button
        onClick={() => {
          return onConfirm()
        }}
        variant="neutral"
        style={{ marginRight: 24, marginLeft: 16 }}
        // displayShortcut
        // keyboardShortcut="Esc"
      >
        Cancel
      </Button>
      <Button
        // displayShortcut
        // keyboardShortcut="Enter"
        onClick={async () => {
          return onCancel()
        }}
      >
        {label ?? 'Confirm'}
      </Button>
    </Stack>
  )
}
