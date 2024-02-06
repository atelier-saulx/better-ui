import React from 'react'
import { Stack, Confirm, Button, IconPlus } from '../../index.js'
import { NewInput } from './NewInput.js'

export const AddNew = ({
  state,
  setState,
  fieldItemType,
}: {
  state: (string | number)[]
  setState: (v: any[]) => void
  fieldItemType?: 'integer' | 'number' | 'string'
}) => {
  const [addNew, setAddNew] = React.useState<boolean>(false)
  const [newValue, setNewValue] = React.useState<string | number>()

  if (addNew) {
    return (
      <Stack>
        <NewInput
          fieldItemType={fieldItemType}
          onChange={(v) => {
            setNewValue(v)
          }}
        />
        <Confirm
          justify="start"
          variant="small"
          onConfirm={() => {
            const nValue = state ? [...state, newValue] : [newValue]
            setState(nValue)
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
