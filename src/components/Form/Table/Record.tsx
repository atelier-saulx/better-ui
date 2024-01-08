import React, { ReactNode, useCallback, useRef } from 'react'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Button,
  IconPlus,
  TextInput,
} from '../../../index.js'
import { Path, TableCtx, TableProps } from '../types.js'
import { readPath, useCols, createNewEmptyValue } from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { BasedSchemaFieldRecord } from '@based/schema'
import { ColStack } from './ColStack.js'

const KeyInput = (p: {
  value: string
  ctx: TableCtx
  path: Path
  valueRef: { current: { [key: string]: any } }
}) => {
  const changeRef = useRef('')
  return (
    <TextInput
      variant="small"
      value={p.value}
      autoFocus={p.value === ''}
      onBlur={useCallback(() => {
        if (changeRef.current !== p.value) {
          if (changeRef.current === '') {
            // remove
            const nValue = {
              ...p.valueRef.current,
            }
            delete nValue['']
            p.ctx.listeners.onChangeHandler(p.ctx, p.path, nValue)
          } else {
            const nValue = {
              ...p.valueRef.current,
            }
            const rowValue = nValue[p.value]
            delete nValue[p.value]
            nValue[changeRef.current] = rowValue
            p.ctx.listeners.onChangeHandler(p.ctx, p.path, nValue)
          }
          changeRef.current = ''
        }
      }, [])}
      onChange={useCallback((v) => {
        changeRef.current = v
      }, [])}
    />
  )
}

export function Record({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldRecord>(ctx, path)
  const valuesField = field.values

  const valueRef = useRef<typeof value>()
  valueRef.current = value

  const rows: ReactNode[] = []
  const cols: ReactNode[] = [
    <Cell width={200} isKey border key={'key'}>
      Key
    </Cell>,
  ]

  const addNew = React.useCallback(async () => {
    ctx.listeners.onChangeHandler(ctx, path, {
      ...valueRef.current,
      '': createNewEmptyValue(field.values),
    })
  }, [])

  // const removeItem = (key: string) => {}

  if (valuesField.type === 'object' && useCols(valuesField)) {
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {valuesField.properties[key].title ?? key}
        </Cell>
      )
    }
    if (value) {
      for (const key in value) {
        const cells: ReactNode[] = [
          <Cell width={200} border isKey key="key">
            <KeyInput valueRef={valueRef} value={key} ctx={ctx} path={path} />
          </Cell>,
        ]
        for (const k in valuesField.properties) {
          cells.push(
            <Cell border key={k}>
              <Field ctx={ctx} path={[...path, key, k]} />
            </Cell>
          )
        }

        rows.push(
          <ColStack
            onRemove={() => {
              // lullz
            }}
            key={key}
            style={{
              borderBottom: border(),
            }}
          >
            {cells}
          </ColStack>
        )
      }
    }
  } else {
    const deepObject = valuesField.type === 'object'
    cols.push(
      <Cell isKey border key={'value'}>
        Value
      </Cell>
    )
    if (value) {
      for (const key in value) {
        rows.push(
          <ColStack
            style={{
              borderBottom: deepObject ? null : border(),
            }}
            align="stretch"
            key={key}
            onRemove={
              !deepObject
                ? () => {
                    // lullz
                  }
                : null
            }
          >
            <Cell
              width={200}
              border
              isKey
              key={'key'}
              style={{
                paddingRight: 10,
                paddingLeft: 10,
                borderBottom: deepObject ? border() : null,
              }}
            >
              <TextInput variant="small" value={key} />
            </Cell>
            <Cell>
              <Field ctx={ctx} path={[...path, key]} />
            </Cell>
          </ColStack>
        )
      }
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
      <ColStack
        style={{
          background: color('background', 'muted'),
          borderBottom: border(),
        }}
        header
      >
        {cols}
      </ColStack>
      {rows}
      <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
        <Button
          size="small"
          variant="neutral-transparent"
          prefix={<IconPlus />}
          onClick={addNew}
        >
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
