export type SemanticVariant =
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

export type Color = {
  content: 'primary' | 'inverted' | 'secondary' | 'inverted-muted'
  background: 'neutral' | 'muted' | 'dimmer' | 'screen' | 'inverted'
  interactive: 'primary' | 'primary-hover' | 'secondary' | 'secondary-hover'
  'semantic-color': SemanticVariant
  'semantic-background': SemanticVariant
}

export const SEMANTIC_COLORS: SemanticVariant[] = [
  'neutral',
  'informative',
  'positive',
  'warning',
  'error',
]

export const MUTED_SEMANTIC_COLORS: SemanticVariant[] = [
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
  variant: 'default' | 'hover' | 'muted' | 'focus' | 'error' = 'default',
  size: number = 1
) => {
  return `${size}px solid var(--border-${variant})`
}

export const borderRadius = (
  radius: 'tiny' | 'small' | 'medium' | 'large' | 'full'
) => `var(--radius-${radius})`

export const boxShadow = (variant: 'focus' | 'error') =>
  `var(--box-shadow-${variant})`
