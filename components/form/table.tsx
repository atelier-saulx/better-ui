import React, { ReactNode } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../button'
import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { Plus, Close } from '../icons'
import { textVariants } from '../text'
import { border, color } from '../../utils/vars'
import { Stack } from '../layout'
import { FormObject } from './object'

type TableProps = {
  colls: string[]
  nested?: boolean
  rows: any[]
  orginalField?: BasedSchemaFieldObject
  onNew?: () => void
  field: BasedSchemaField
  onRemove?: (index: number) => void
  order?: boolean // drag and drop
  style?: Style
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
        // marginLeft: -10,
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
  index,
  isKey,
  children,
}: {
  index: number
  isKey?: boolean
  children: ReactNode
}) {
  return (
    <Stack
      justify="start"
      style={{
        minHeight: 48,
        flexGrow: 1,
        paddingRight: 10,
        borderLeft: index === 0 ? undefined : border(),
        maxWidth: isKey ? 200 : undefined,
        paddingLeft: 20,
        ...(isKey ? textVariants.bodyStrong : textVariants.bodyBold),
      }}
    >
      {children}
    </Stack>
  )
}

function Row({
  field,
  value,
  orginalField,
  noBorder,
}: {
  field: BasedSchemaField
  value: any
  orginalField?: BasedSchemaFieldObject
  noBorder?: boolean
}) {
  let body: ReactNode
  let noIcon = false

  if (field.type === 'object') {
    const colls = Object.keys(field.properties)
    body = Object.keys(field.properties).map((key, index) => {
      const { readOnly } = field.properties[key]

      if (orginalField && key !== '$key') {
        const isValue = key === '$value'
        const f = orginalField.properties[isValue ? value.$key : key]
        if (f.type === 'object') {
          noIcon = true
          /*
               colls,
                rows,
                field,
                onNew,
                onRemove,
                orginalField,
              */

          const colls: string[] = []
          const r: any = {}

          for (const key in f.properties) {
            const p = f.properties[key]
            colls.push(p.title ?? key)
            r[key] = isValue ? value.$value[key] : value[key]
          }

          return (
            <Table
              style={{
                borderLeft: border(),
              }}
              // orginalField={f}
              nested
              colls={colls}
              rows={[r]}
              field={f}
            />
          )
        }
      }

      return (
        <Cell isKey={key === '$key'} index={index}>
          {readOnly ? (
            value[key]
          ) : (
            <StringInput
              style={{ marginLeft: -10 }}
              key={index}
              value={value[key]}
            />
          )}
        </Cell>
      )
    })
  }

  if (field.type === 'string') {
    body = (
      <styled.div style={{ paddingRight: 10, width: '100%' }}>
        <StringInput value={value} />
      </styled.div>
    )
  }

  if (noIcon) {
    return (
      <Stack
        align="start"
        justify="start"
        style={{
          minHeight: 48,
          borderBottom: border(),
        }}
      >
        {body}
      </Stack>
    )
  }

  return (
    <Stack
      style={{
        minHeight: 48,
        borderBottom: noBorder ? undefined : border(),
        '>:last-child': {
          opacity: 0,
        },
        '&:hover >:last-child': {
          opacity: '1',
        },
      }}
    >
      {body}
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

export function Table({
  colls,
  rows,
  field,
  nested,
  onNew,
  onRemove,
  orginalField,
  style,
}: TableProps) {
  let header = null
  const isObject = colls.length
  if (isObject) {
    const hasKey = field.type === 'object' && '$key' in field.properties
    header = (
      <Stack
        style={{
          background: color('background', 'muted'),
          color: color('content', hasKey ? 'primary' : 'secondary'),
          borderTop: nested ? undefined : border(),
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
            <Cell isKey={hasKey && index === 0} index={index}>
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
    <Stack
      direction="column"
      gap={8}
      align="start"
      style={{ flexGrow: 1, ...style }}
    >
      <styled.div style={{ width: '100%' }}>
        {header}
        {rows.map((value, i) => (
          <Row
            noBorder={i === rows.length - 1 && nested}
            orginalField={orginalField}
            field={field}
            key={i}
            value={value}
          />
        ))}
      </styled.div>
      {onNew ? (
        <Button
          size="small"
          variant="neutral-transparent"
          onClick={onNew}
          prefix={<Plus />}
        >
          New
        </Button>
      ) : null}
    </Stack>
  )
}
