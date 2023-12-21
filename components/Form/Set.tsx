import * as React from 'react'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { color, border, borderRadius } from '../../utils/colors'
import { Path, TableCtx } from './Table/types'
import { Button } from '../Button'
import { IconClose, IconPlus } from '../Icons'
import { readPath } from './Table'
import { TextInput } from '../TextInput'

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
      <Stack gap={12} align="start" justify="start" grid>
        {value
          ? value.map((v: string | number) => {
              return <Tag value={v} onRemove={() => {}} />
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
