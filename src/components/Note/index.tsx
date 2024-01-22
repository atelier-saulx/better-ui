import * as React from 'react'
import { styled, Style } from 'inlines'
import { color, IconAlertFill, Text } from '../../index.js'

export type NoteProps = {
  variant?: 'warning' | 'error' | 'informative' | 'positive' | 'neutral'
  message?: React.ReactNode
  style?: Style
}

export function Note({ variant = 'neutral', message, style }: NoteProps) {
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
