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
} from '../../index.js'
import { Path, TableCtx } from './types.js'
import { readPath } from './utils.js'

const Tag = ({ value }: { value: string | number; onRemove: () => void }) => {
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
      <Button variant="icon-only">
        <IconClose />
      </Button>
    </Stack>
  )
}

export function SetField({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value } = readPath(ctx, path)
  const [addNew, setAddNew] = React.useState<boolean>(false)
  return (
    <Stack direction="column" align="start">
      <Stack grid>
        {value
          ? value.map((v: string | number) => {
              return <Tag key={v} value={v} onRemove={() => {}} />
            })
          : null}
      </Stack>
      <Stack style={{ height: 52, width: 'auto' }}>
        {addNew ? (
          <TextInput
            autoFocus
            variant="small"
            onBlur={() => {
              setAddNew(false)
            }}
          />
        ) : (
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
        )}
      </Stack>
    </Stack>
  )
}
