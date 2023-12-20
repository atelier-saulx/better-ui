import React from 'react'
import { styled, Style } from 'inlines'
import { textVariants } from '../../Text'
import { border } from '../../../utils/colors'

export function StringInput({
  value,
  style,
}: {
  value: string | number | undefined
  style?: Style
}) {
  const [focus, setFocus] = React.useState(false)
  return (
    <styled.input
      style={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 32,
        borderRadius: `var(--radius-tiny)`,
        paddingLeft: 10,
        paddingRight: 10,
        border: focus ? border('focus') : `1px solid transparent`,
        boxShadow: focus ? `var(--shadow-focus)` : undefined,
        ...textVariants.body,
        ...style,
      }}
      onChange={() => {}}
      value={value}
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
    />
  )
}
