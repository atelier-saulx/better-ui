import { hash } from '@saulx/hash'

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
  interactive:
    | 'primary'
    | 'primary-hover'
    | 'primary-muted'
    | 'secondary'
    | 'secondary-hover'
  'semantic-color': SemanticVariant
  'semantic-background': SemanticVariant
  'non-semantic-color': NonSemanticColor
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
  color: Color[T],
): string => {
  return `var(--${group}-${color})`
}

export const border = (
  variant: 'default' | 'hover' | 'muted' | 'focus' | 'error' = 'default',
  size: number = 1,
) => {
  return `${size}px solid var(--border-${variant})`
}

export const borderRadius = (
  radius: 'tiny' | 'small' | 'medium' | 'large' | 'full',
) => `var(--radius-${radius})`

export const boxShadow = (variant: 'focus' | 'error') =>
  `var(--box-shadow-${variant})`

export type NonSemanticColor =
  | 'red'
  | 'red-soft'
  | 'raspberry'
  | 'raspberry-soft'
  | 'magenta'
  | 'magenta-soft'
  | 'purple'
  | 'purple-soft'
  | 'grape'
  | 'grape-soft'
  | 'violet'
  | 'violet-soft'
  | 'blue'
  | 'blue-soft'
  | 'cyan'
  | 'cyan-soft'
  | 'teal'
  | 'teal-soft'
  | 'aquamarine'
  | 'aquamarine-soft'
  | 'green'
  | 'green-soft'
  | 'emerald'
  | 'emerald-soft'
  | 'orange'
  | 'orange-soft'

export const NON_SEMANTIC_COLORS: NonSemanticColor[] = [
  'red',
  'magenta',
  'purple',
  'grape',
  'violet',
  'blue',
  'cyan',
  'teal',
  'aquamarine',
  'green',
  'emerald',
  'orange',
]

export const MUTED_NON_SEMANTIC_COLORS: NonSemanticColor[] = [
  'red-soft',
  'raspberry',
  'raspberry-soft',
  'magenta-soft',
  'purple-soft',
  'grape-soft',
  'violet-soft',
  'blue-soft',
  'cyan-soft',
  'teal-soft',
  'aquamarine-soft',
  'green-soft',
  'emerald-soft',
  'orange-soft',
]

export const NON_SEMANTIC_COLOR: { [key in NonSemanticColor]: string } = {
  red: '#C53434',
  raspberry: '#C03060',
  magenta: '#B12F86',
  purple: '#9939AC',
  grape: '#8040BF',
  violet: '#634ECA',
  blue: '#3062D4',
  cyan: '#0870BA',
  teal: '#0870BA',
  aquamarine: '#097C69',
  green: '#1D7C4D',
  emerald: '#347434',
  orange: '#F59638',
}

export function hashNonSemanticColor(value: string | number) {
  const index =
    Math.floor(
      Math.abs(Math.sin(hash(value))) *
        (Object.keys(NON_SEMANTIC_COLOR).length - 1),
    ) + 1

  return Object.values(NON_SEMANTIC_COLOR)[index]
}
