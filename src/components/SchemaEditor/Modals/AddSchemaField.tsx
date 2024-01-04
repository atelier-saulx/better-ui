import * as React from 'react'
import { Button } from '../../Button/index.js'
import { IconPlus } from '../../Icons/index.js'

export const AddSchemaField = () => {
  return (
    <Button shape="rectangle" size="small">
      <IconPlus />
      Add Field
    </Button>
  )
}
