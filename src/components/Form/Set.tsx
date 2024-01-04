import * as React from 'react'
import {
  Text,
  Button,
  Stack,
  color,
  border,
  borderRadius,
  TextInput,
  IconClose,
  IconPlus,
  Confirm,
  NumberInput,
} from '../../index.js'
import { Path, TableCtx } from './types.js'
import { readPath } from './utils.js'
import { BasedSchemaFieldSet } from '@based/schema'

const Tag = ({
  value,
  onRemove,
}: {
  value: string | number
  onRemove: () => void
}) => {
  return (
    <Stack
      gap={12}
      justify="start"
      style={{
        width: 'auto',
        padding: 2,
        color: color('content', 'secondary'),
        paddingLeft: 8,
        paddingRight: 8,
        border: border(),
        backgroundColor: color('background', 'muted'),
        borderRadius: borderRadius('tiny'),
      }}
    >
      <Text>{value}</Text>
      <Button
        onClick={() => {
          onRemove()
        }}
        variant="icon-only"
      >
        <IconClose />
      </Button>
    </Stack>
  )
}

const NewInput = ({
  onChange,
  field,
}: {
  field: BasedSchemaFieldSet
  onChange: (v: any) => void
}) => {
  if (field.items.type === 'number' || field.items.type === 'integer') {
    return (
      <NumberInput
        style={{
          marginRight: 8,
          width: 400,
        }}
        onChange={onChange}
        autoFocus
        variant="small"
      />
    )
  }
  return (
    <TextInput
      style={{
        marginRight: 8,
        width: 400,
      }}
      onChange={onChange}
      autoFocus
      variant="small"
    />
  )
}

const AddNew = ({
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

export function SetField({
  ctx,
  path,
  variant = 'large',
}: {
  ctx: TableCtx
  path: Path
  variant?: 'large' | 'small'
}) {
  const { value = [], field } = readPath<BasedSchemaFieldSet>(ctx, path)
  const marginTop = variant === 'small' ? 12 : 0

  return (
    <Stack direction="column" align="start">
      <Stack grid style={{ marginTop }} display={value.length}>
        {value.map((v: string | number, index: number) => {
          return (
            <Tag
              key={v}
              value={v}
              onRemove={() => {
                const nValue = [...value]
                nValue.splice(index, 1)
                ctx.listeners.onChangeHandler(ctx, path, nValue)
              }}
            />
          )
        })}
      </Stack>
      <Stack style={{ height: 52, width: 'auto' }}>
        <AddNew field={field} value={value} ctx={ctx} path={path} />
      </Stack>
    </Stack>
  )
}
