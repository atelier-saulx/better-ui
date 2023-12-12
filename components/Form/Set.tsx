import * as React from 'react'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { color, border } from '../../utils/colors'
import { Path, TableCtx } from './Table/types'
import { Button } from '../Button'
import { styled } from 'inlines'
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
        borderRadius: 'var(--radius-tiny)',
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
  const { field, value } = readPath(ctx, path)
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
      <styled.div style={{ marginTop: 16, marginBottom: 8 }}>
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
      </styled.div>
    </Stack>
  )
}
