export type Color = {
  content: 'primary' | 'inverted' | 'secondary' | 'inverted-muted'
  background: 'neutral' | 'muted' | 'dimmer' | 'screen' | 'inverted'
  interactive: 'primary' | 'primary-hover' | 'secondary' | 'secondary-hover'
  semantic:
    | 'auto'
    | 'neutral'
    | 'informative'
    | 'positive'
    | 'warning'
    | 'error'
    | 'auto-muted'
    | 'neutral-muted'
    | 'informative-muted'
    | 'positive-muted'
    | 'warning-muted'
    | 'error-muted'
}

export const SEMANTIC_COLORS = [
  'neutral',
  'informative',
  'positive',
  'warning',
  'error',
]

export const MUTED_SEMANTIC_COLORS = [
  'neutral-muted',
  'informative-muted',
  'positive-muted',
  'warning-muted',
  'error-muted',
]

export const color = <T extends keyof Color>(
  group: T,
  color: Color[T]
): string => {
  return `var(--${group}-${color})`
}

export const border = (
  color: 'inverted' | 'default' | 'muted' | 'focus' = 'default',
  size: number = 1
): string => {
  return `${size}px solid var(--border-${color})`
}
