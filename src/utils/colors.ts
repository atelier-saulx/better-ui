import { hash } from '@saulx/hash'

// export type SemanticVariant =
//   | 'neutral'
//   | 'informative'
//   | 'positive'
//   | 'warning'
//   | 'error'
//   | 'auto-muted'
//   | 'neutral-muted'
//   | 'informative-muted'
//   | 'positive-muted'
//   | 'warning-muted'
//   | 'error-muted'

export type Color = {
  content: 'primary' | 'inverted' | 'secondary' | 'inverted-muted'
  background: 'neutral' | 'muted' | 'dimmer' | 'screen' | 'inverted'
  interactive:
    | 'primary'
    | 'primary-hover'
    | 'primary-muted'
    | 'secondary'
    | 'secondary-hover'
  'semantic-color': SemanticColors
  'semantic-background': SemanticBackgroundColors
  'non-semantic-color': NonSemanticColor
}

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
// | 'grey'
// | 'grey-soft'

export type SemanticBackgroundColors =
  | 'neutral'
  | 'neutral-muted'
  | 'informative'
  | 'informative-muted'
  | 'positive'
  | 'positive-muted'
  | 'warning'
  | 'warning-muted'
  | 'error'
  | 'error-hover'
  | 'error-muted'

export type SemanticColors =
  | 'neutral'
  | 'neutral-muted'
  | 'informative'
  | 'informative-muted'
  | 'positive'
  | 'positive-muted'
  | 'warning'
  | 'warning-muted'
  | 'error'
  | 'error-muted'

export const color = <T extends keyof Color>(
  group: T,
  color: Color[T],
): string => {
  if (group === 'content') {
    return CONTENT_COLORS[color as string]
  } else if (group === 'background') {
    return BACKGROUND_COLORS[color as string]
  } else if (group === 'interactive') {
    return INTERACTIVE_COLORS[color as string]
  } else if (group === 'semantic-background') {
    return SEMANTIC_BACKGROUND_COLORS[color as string]
  } else if (group === 'semantic-color') {
    return SEMANTIC_COLORS[color as string]
  }
  // else {
  //   return `var(--${group}-${color})`
  // }
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

// hash non semantic
export function hashNonSemanticColor(
  value: string | number = '',
  muted: boolean = false,
) {
  const mutedColors = Object.keys(NON_SEMANTIC_COLOR)
    .filter((key) => key.includes('soft'))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: NON_SEMANTIC_COLOR[key] })
    }, {})

  const strongColors = Object.keys(NON_SEMANTIC_COLOR)
    .filter((key) => !key.includes('soft'))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: NON_SEMANTIC_COLOR[key] })
    }, {})

  const index =
    Math.floor(
      Math.abs(Math.sin(hash(value))) *
        (Object.keys(NON_SEMANTIC_COLOR).length / 2 - 1),
    ) + 1

  return muted
    ? Object.values(mutedColors)[index]
    : Object.values(strongColors)[index]
}

// hash semantic
export function hashSemanticColor(
  value: string | number = '',
  muted: boolean = false,
) {
  const mutedColors = Object.keys(SEMANTIC_COLORS)
    .filter((key) => key.includes('muted'))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: SEMANTIC_COLORS[key] })
    }, {})

  const strongColors = Object.keys(SEMANTIC_COLORS)
    .filter((key) => !key.includes('muted'))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: SEMANTIC_COLORS[key] })
    }, {})

  const index =
    Math.floor(
      Math.abs(Math.sin(hash(value))) *
        (Object.keys(SEMANTIC_COLORS).length / 2 - 1),
    ) + 1

  return muted
    ? Object.values(mutedColors)[index]
    : Object.values(strongColors)[index]
}

/// ADD ALL COLORS IN JS instead of the CSS
// @ts-ignore
export const CONTENT_COLORS = {
  primary: '#1b242c',
  inverted: '#ffffff',
  secondary: '#7e8b99',
  'inverted-muted': '#91aecb',
}

export const BACKGROUND_COLORS = {
  neutral: '#002b5e0d',
  dimmer: '#2e2e2e33',
  screen: ' #ffffff',
  muted: 'rgba(31, 82, 158, 0.02)',
  inverted: ' #171e24',
}

export const INTERACTIVE_COLORS = {
  primary: '#634eca',
  'primary-hover': '#4e38bc',
  'primary-muted': `color-mix(
      in srgb,
      var(--interactive-primary) 10%,
      transparent
    )`,
  secondary: '#04294421',
  'secondary-hover': '#10305433',
}

export const SEMANTIC_BACKGROUND_COLORS = {
  neutral: ' #1830488f',
  'neutral-muted': ' #10284817',
  informative: ' #3062d4',
  'informative-muted': ' #3062d429',
  positive: ' #1d7c4d',
  'positive-muted': ' #1d7c4d29',
  warning: ' #f59638',
  'warning-muted': '#f5963829',
  error: '#c53434',
  'error-hover': '#952d2d',
  'error-muted': '#c5343429',
}

export const SEMANTIC_COLORS = {
  neutral: '#ffffff',
  'neutral-muted': '#1b242c',
  informative: '#ffffff',
  'informative-muted': '#3062d4',
  positive: '#ffffff',
  'positive-muted': '#1d7c4d',
  warning: '#222222',
  'warning-muted': '#f59638',
  error: '#ffffff',
  'error-muted': '#c53434',
}

export const NON_SEMANTIC_COLOR: { [key in NonSemanticColor]: string } = {
  red: '#C53434',
  'red-soft': ' rgba(197, 52, 52, 0.16)',
  raspberry: '#C03060',
  'raspberry-soft': 'rgba(192, 48, 96, 0.16)',
  magenta: '#B12F86',
  'magenta-soft': 'rgba(228, 98, 141, 0.16)',
  purple: '#9939AC',
  'purple-soft': 'rgba(153, 57, 172, 0.16)',
  grape: '#8040BF',
  'grape-soft': 'rgba(128, 64, 191, 0.16)',
  violet: '#634ECA',
  'violet-soft': 'rgba(99, 78, 202, 0.16)',
  blue: '#3062D4',
  'blue-soft': 'rgba(48, 98, 212, 0.16)',
  cyan: '#0870BA',
  'cyan-soft': 'rgba(8, 112, 186, 0.16)',
  teal: '#0870BA',
  'teal-soft': 'rgba(8, 112, 186, 0.16)',
  aquamarine: '#097C69',
  'aquamarine-soft': 'rgba(9, 124, 105, 0.16)',
  green: '#1D7C4D',
  'green-soft': 'rgba(29, 124, 77, 0.16)',
  emerald: '#347434',
  'emerald-soft': 'rgba(52, 116, 52, 0.16)',
  orange: '#F59638',
  'orange-soft': 'rgba(245, 150, 56, 0.16)',
}
