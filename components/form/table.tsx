import React, { ReactNode } from 'react'
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
        marginLeft: -10,
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

function Cell({
  colls,
  index,
  isKey,
  children,
}: {
  colls: string[]
  index: number
  isKey: boolean
  children: ReactNode
}) {
  return (
    <Stack
      style={{
        height: 48,
        flexGrow: 1,
        paddingRight: 10,
        borderRight: index === colls.length - 1 ? undefined : border(),
        maxWidth: isKey ? 250 : undefined,
        paddingLeft: 20,
        ...(isKey ? textVariants.bodyStrong : textVariants.bodyBold),
      }}
    >
      {children}
    </Stack>
  )
}

function Row({ field, value }: { field: BasedSchemaField; value: any }) {
  if (field.type === 'object') {
    const colls = Object.keys(field.properties)
    return (
      <Stack
        style={{
          height: 48,
        }}
      >
        {Object.keys(field.properties).map((key, index) => (
          <Cell colls={colls} isKey={key === '$key'} index={index}>
            <StringInput key={index} value={value[key]} />
          </Cell>
        ))}
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
    const hasKey = field.type === 'object' && '$key' in field.properties
    header = (
      <Stack
        style={{
          background: color('background', 'muted'),
          color: color('content', hasKey ? 'primary' : 'secondary'),
          borderTop: border(),
          borderBottom: border(),
          height: 48,
        }}
      >
        <Stack
          style={{
            height: 48,
          }}
        >
          {colls.map((v, index) => (
            <Cell colls={colls} isKey={hasKey && index === 0} index={index}>
              {v}
            </Cell>
          ))}
        </Stack>
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
    <Stack direction="column" gap={8} align="start">
      <styled.div style={{ width: '100%' }}>
        {header}
        {rows.map((value, i) => (
          <RowStyled field={field} key={i} value={value} />
        ))}
      </styled.div>
      <Button
        size="small"
        variant="neutral-transparent"
        onClick={onNew}
        prefix={<Plus />}
      >
        New
      </Button>
    </Stack>
  )
}
