import * as React from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../button'
import { BasedSchemaField } from '@based/schema'
import { Plus, Close } from '../icons'
import { textVariants } from '../text'
import { border, color } from '../../utils/vars'
import { Stack } from '../layout'

type TableProps = {
  colls: string[]
  rows: any[]
  onNew: () => void
  field: BasedSchemaField
  onRemove: (index: number) => void
  order?: boolean // drag and drop
}

function StringInput({
  value,
  style,
}: {
  value: string | number | undefined
  style?: Style
}) {
  const [focus, setFocus] = React.useState(false)
  return (
    <styled.input
      style={{
        flexGrow: 1,
        width: 'calc(100% - 10px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 32,
        borderRadius: `var(--radius-tiny)`,
        paddingLeft: 10,
        paddingRight: 10,
        border: focus ? border('focus') : `1px solid transparent`,
        boxShadow: focus ? `var(--shadow-focus)` : undefined,
        ...textVariants.body,
        ...style,
      }}
      value={value}
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
    />
  )
}

function Row({ field, value }: { field: BasedSchemaField; value: any }) {
  if (field.type === 'object') {
    const colls = Object.keys(field.properties)

    return (
      <Stack
        style={{
          width: '100%',
          height: 48,
        }}
      >
        {Object.keys(field.properties).map((v, index) => {
          return (
            <Stack
              style={{
                height: 48,
                paddingRight: 10,
                borderRight: index === colls.length - 1 ? undefined : border(),
                width: `calc(${100 / colls.length}%)`,
                paddingLeft: 20,
              }}
            >
              <StringInput key={index} value={value[v]} />
            </Stack>
          )
        })}
      </Stack>
    )
  }

  if (field.type === 'string') {
    return (
      <styled.div style={{ paddingRight: 10, width: '100%' }}>
        <StringInput value={value} />
      </styled.div>
    )
  }
}

export function RowStyled({
  value,
  field,
}: {
  value: any
  field: BasedSchemaField
}) {
  return (
    <Stack
      style={{
        height: 48,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: border(),
        '>:last-child': {
          opacity: 0,
        },
        '&:hover >:last-child': {
          opacity: '1',
        },
      }}
    >
      <Row value={value} field={field} />
      <styled.div
        style={{
          transition: 'opacity 0.1s',
        }}
      >
        <Close />
      </styled.div>
    </Stack>
  )
}

export function Table({ colls, rows, field, onNew, onRemove }: TableProps) {
  let header = null
  const isObject = colls.length
  if (isObject) {
    header = (
      <Stack
        style={{
          background: color('background', 'muted'),
          color: color('content', 'secondary'),
          borderTop: border(),
          borderBottom: border(),
          height: 48,
        }}
      >
        {colls.map((v, index) => {
          return (
            <Stack
              style={{
                height: 48,
                paddingRight: 10,
                borderRight: index === colls.length - 1 ? undefined : border(),
                width: `calc(${100 / colls.length}%)`,
                paddingLeft: 30,
                color: color('content', 'secondary'),
                ...textVariants.bodyBold,
              }}
              key={index}
            >
              {v}
            </Stack>
          )
        })}
        <Close
          style={{
            opacity: 0,
          }}
        />
      </Stack>
    )
  } else {
    header = (
      <styled.div
        style={{
          borderBottom: border(),
        }}
      />
    )
  }

  return (
    <styled.div style={{ width: '100%' }}>
      <styled.div style={{ marginBottom: 8, width: '100%' }}>
        {header}
        {rows.map((value, i) => {
          return <RowStyled field={field} key={i} value={value} />
        })}
      </styled.div>
      <Button
        size="small"
        variant="neutral-transparent"
        onClick={onNew}
        prefix={<Plus />}
      >
        New
      </Button>
    </styled.div>
  )
}
