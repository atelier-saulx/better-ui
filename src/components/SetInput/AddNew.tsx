import React from 'react'
import { Stack, Confirm, Button, IconPlus } from '../../index.js'
import { BasedSchemaFieldSet } from '@based/schema'
import { NewInput } from './NewInput.js'
import { TableCtx } from '../Form/types.js'
import { Path } from '@based/schema'

export const AddNew = ({
  field,
  value,
  ctx,
  path,
}: {
  ctx: TableCtx
  field: BasedSchemaFieldSet
  value: (string | number)[]
  path: Path
}) => {
  const [addNew, setAddNew] = React.useState<boolean>(false)
  const [newValue, setNewValue] = React.useState<string | number>()

  if (addNew) {
    return (
      <Stack>
        <NewInput
          field={field}
          onChange={(v) => {
            setNewValue(v)
          }}
        />
        <Confirm
          justify="start"
          variant="small"
          onConfirm={() => {
            const nValue = value ? [...value, newValue] : [newValue]
            ctx.listeners.onChangeHandler(ctx, path, nValue)
            setNewValue(undefined)
            setAddNew(false)
          }}
          onCancel={() => {
            setNewValue(undefined)
            setAddNew(false)
          }}
        />
      </Stack>
    )
  }

  return (
    <Button
      size="small"
      onClick={() => {
        setAddNew(true)
      }}
      variant="icon-only"
      prefix={<IconPlus />}
    >
      Add
    </Button>
  )
}
