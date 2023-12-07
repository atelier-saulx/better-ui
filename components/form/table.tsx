import React, { ReactNode, useState } from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../button'
import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { Plus, Close, DragDropHorizontal } from '../icons'
import { textVariants } from '../text'
import { border, color } from '../../utils/vars'
import { Stack } from '../layout'
import { FileInput } from '../file-input'

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
        paddingRight: 10,
        border: focus ? border('focus') : `1px solid transparent`,
        boxShadow: focus ? `var(--shadow-focus)` : undefined,
        ...textVariants.body,
        ...style,
      }}
      onChange={() => {}}
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
  order,
  index,
}: {
  field: BasedSchemaField
  value: any
  orginalField?: BasedSchemaFieldObject
  noBorder?: boolean
  order?: boolean
  index: number
}) {
  let body: ReactNode
  let noIcon = false

  const [drag, setDrag] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  if (field.type === 'object') {
    body = Object.keys(field.properties).map((key, index) => {
      const { readOnly } = field.properties[key]

      let propsField = field.properties[key]
      const isValue = key === '$value'

      if (orginalField && key !== '$key') {
        propsField = orginalField.properties[isValue ? value.$key : key]
      }

      if (propsField.type === 'object') {
        noIcon = true
        const colls: string[] = []
        const r: any = {}
        for (const key in propsField.properties) {
          const p = propsField.properties[key]
          colls.push(p.title ?? key)
          r[key] = isValue ? value.$value[key] : value[key]
        }
        return (
          <Table
            key={key}
            style={{
              borderLeft: border(),
            }}
            nested
            colls={colls}
            rows={[r]}
            field={propsField}
          />
        )
      }

      if (propsField.type === 'string' && propsField.contentMediaType) {
        return (
          <Cell index={index} key={key}>
            <FileInput
              variant="minimal"
              mimeType={propsField.contentMediaType}
              // make this better
              value={
                isValue
                  ? value.$value
                    ? { src: value.$value }
                    : undefined
                  : value[key]
                  ? { src: value[key] }
                  : undefined
              }
              onChange={(file) => {
                console.log('uploaded file', file)
              }}
            />
          </Cell>
        )
      }

      return (
        <Cell isKey={key === '$key'} index={index} key={key}>
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
  // ----------

  if (field.type === 'string' && field.contentMediaType) {
    body = (
      <styled.div style={{ paddingLeft: 12, paddingRight: 10, width: '100%' }}>
        <FileInput
          variant="minimal"
          mimeType={field.contentMediaType}
          value={value ? { src: value } : undefined}
          onChange={(file) => {
            console.log('uploaded file', file)
          }}
        />
      </styled.div>
    )
  } else if (field.type === 'string') {
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
      draggable={drag}
      onDragStart={(e: any) => {
        e.dataTransfer.setData('Text', index)
      }}
      onDrop={(e: any) => {
        e.preventDefault()
        const data = e.dataTransfer.getData('Text')
        console.info(data)
        setDragOver(false)
      }}
      onDragOver={() => {
        setDragOver(true)
      }}
      onDragLeave={() => {
        setDragOver(false)
      }}
      onDragEnd={() => {
        setDrag(false)
      }}
      align="center"
      style={{
        background: color('background', 'screen'),
        minHeight: 48,
        borderBottom: dragOver
          ? border('focus', 2)
          : noBorder
          ? undefined
          : border(),
        '*': {
          pointerEvents: dragOver ? 'none' : undefined,
        },
        '>:last-child': {
          opacity: 0,
        },
        '&:hover >:last-child': {
          opacity: 1,
        },
      }}
    >
      {order ? (
        <styled.div
          style={{
            cursor: 'grab',
            transition: 'opacity 0.1s',
            color: color('content', 'secondary'),
            opacity: 0.75,
            '&:hover': {
              opacity: '1',
            },
          }}
          onMouseDown={() => {
            setDrag(true)
          }}
          onMouseUp={() => {
            setDrag(false)
          }}
        >
          <DragDropHorizontal />
        </styled.div>
      ) : null}
      {body}
      <styled.div
        style={{
          transition: 'opacity 0.1s',
        }}
      >
        <Close style={{ opacity: drag ? 0 : 1 }} />
      </styled.div>
    </Stack>
  )
}

export function Table({
  colls,
  rows,
  field,
  nested,
  order,
  onNew,
  onRemove,
  orginalField,
  style,
}: TableProps) {
  const [dragOver, setDragOver] = useState(false)

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
          borderBottom: dragOver ? border('focus', 2) : border(),
          height: 48,
        }}
        onDrop={
          order
            ? (e: any) => {
                setDragOver(false)
              }
            : undefined
        }
        onDragOver={
          order
            ? () => {
                setDragOver(true)
              }
            : undefined
        }
        onDragLeave={
          order
            ? () => {
                setDragOver(false)
              }
            : undefined
        }
      >
        <Stack
          style={{
            height: 48,
          }}
        >
          {order ? (
            <styled.div style={{ opacity: 0 }}>
              <DragDropHorizontal />
            </styled.div>
          ) : null}
          {colls.map((v, index) => (
            <Cell key={v} isKey={hasKey && index === 0} index={index}>
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
        onDrop={
          order
            ? (e: any) => {
                setDragOver(false)
              }
            : undefined
        }
        onDragOver={
          order
            ? () => {
                setDragOver(true)
              }
            : undefined
        }
        onDragLeave={
          order
            ? () => {
                setDragOver(false)
              }
            : undefined
        }
        style={{
          marginTop: -8,
          height: 8,
          borderBottom: dragOver ? border('focus', 2) : border(),
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
            order={order}
            noBorder={i === rows.length - 1 && nested}
            orginalField={orginalField}
            field={field}
            key={i}
            index={i}
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
