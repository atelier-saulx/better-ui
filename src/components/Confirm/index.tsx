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
  cancelLabel?: React.ReactNode
  style?: Style
  variant?: 'small' | 'regular'
  justify?: 'center' | 'between' | 'end' | 'start'
  value?: any
  onConfirm: ((value?: any) => void) | ((value?: any) => Promise<void>)
  onCancel: (value?: any) => void
}

export function Confirm({
  style,
  variant,
  label,
  cancelLabel,
  justify = 'end',
  onConfirm,
  onCancel,
}: ConfirmProps) {
  if (variant === 'small') {
    return (
      <Stack
        justify={justify}
        style={{
          marginRight: label ? 4 : 8,
          ...style,
        }}
      >
        {label ? (
          <Text
            singleLine
            noSelect
            style={{ marginRight: 12 }}
            color="secondary"
          >
            {label}
          </Text>
        ) : null}
        <Button
          variant="icon-only"
          onClick={React.useCallback(() => {
            return onCancel()
          }, [onConfirm])}
          prefix={
            <IconClose style={{ color: getColor('content', 'secondary') }} />
          }
        />
        <Button
          variant="icon-only"
          onClick={async () => {
            return onConfirm()
          }}
          style={{ marginLeft: 4 }}
          prefix={
            <IconCheckLarge
              style={{ color: getColor('interactive', 'primary') }}
            />
          }
        />
      </Stack>
    )
  }

  return (
    <Stack justify={justify} style={style}>
      <Button
        onClick={() => {
          return onCancel()
        }}
        variant="neutral"
        style={{ marginRight: 16 }}
        // displayShortcut
        // keyboardShortcut="Esc"
      >
        {cancelLabel ?? 'Cancel'}
      </Button>
      <Button
        // displayShortcut
        // keyboardShortcut="Enter"
        onClick={async () => {
          return onConfirm()
        }}
      >
        {label ?? 'Confirm'}
      </Button>
    </Stack>
  )
}
