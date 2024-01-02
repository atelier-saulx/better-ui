import * as React from 'react'
import { ColorInput } from '../../index.js'

const meta = {
  title: 'Atoms/Inputs/ColorInput ',
}
export default meta

export const Default = () => {
  return (
    <ColorInput
      label="Background color"
      onChange={(value) => {
        console.log('onchange', value)
      }}
    />
  )
}

export const Small = () => {
  return <ColorInput variant="small" defaultValue="rgba(0,123,231,0.5)" />
}

export const Error = () => {
  return <ColorInput error />
}
