type colors = {
  content: 'primary' | 'inverted' | 'secondary'
  background: 'neutral' | 'muted' | 'dimmer' | 'screen'
}

//  rgba(31, 82, 158, 0.02))

export const color = <T extends keyof colors>(
  group: T,
  color: colors[T]
): string => {
  return `var(--${group}-${color})`
}

export const border = (
  color: 'default' | 'muted' | 'focus' = 'default',
  size: number = 1
): string => {
  return `${size}px solid var(--border-${color})`
}

// // color...
// export const boxShadow = (size: 'small' | 'medium' | 'large') => {
//   let shadowSize: string
//   let shadowColor: string
//   // correct color...
//   if (size === 'small') {
//     shadowSize = '0px 2px 4px'
//     shadowColor = 'rgba(156, 156, 156, 0.08)'
//   }
//   if (size === 'medium') {
//     shadowSize = '0px 1px 4px'
//     shadowColor = 'rgba(156, 156, 156, 0.08)'
//   }
//   if (size === 'large') {
//     shadowSize = '0px 12px 24px'
//     shadowColor = 'rgba(0, 0, 0, 0.08)'
//   }
//   return ` ${shadowSize} ${shadowColor}`
// }
