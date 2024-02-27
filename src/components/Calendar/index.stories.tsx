import * as React from 'react'
import { Calendar } from '../../index.js'

const meta = {
  title: 'Components/Calendar',
}

export default meta

export const Default = () => {
  return (
    <div style={{ height: '100svh' }}>
      <Calendar />
    </div>
  )
}
