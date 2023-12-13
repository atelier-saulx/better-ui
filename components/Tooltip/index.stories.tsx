import * as React from 'react'
import { Button } from '../Button'
import { Tooltip } from '.'

const meta = {
  title: 'Atoms/Tooltip',
}
export default meta

export const Default = () => {
  return (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  )
}
