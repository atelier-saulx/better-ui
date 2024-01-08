import React, { ReactNode, useRef } from 'react'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Button,
  IconPlus,
  TextInput,
} from '../../../index.js'
import { TableProps } from '../types.js'
import { readPath, useCols, createNewEmptyValue } from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { BasedSchemaFieldRecord } from '@based/schema'
import { ColStack } from './ColStack.js'

const KeyInput = (p: { value: string; onChange: (value: string) => void }) => {
  const changeRef = useRef('')
  return (
    <TextInput
      variant="small"
      value={p.value}
      autoFocus={p.value === ''}
      onBlur={() => {
        if (changeRef.current !== p.value) {
          p.onChange(changeRef.current)
          changeRef.current = ''
        }
      }}
      onChange={(v) => {
        changeRef.current = v
      }}
    />
  )
}

export function Record({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldRecord>(ctx, path)
  const valuesField = field.values

  const vRef = useRef<typeof value>()
  vRef.current = value

  const rows: ReactNode[] = []
  const cols: ReactNode[] = [
    <Cell width={200} isKey border key={'key'}>
      Key
    </Cell>,
  ]

  const addNew = React.useCallback(async () => {
    ctx.listeners.onChangeHandler(ctx, path, {
      ...vRef.current,
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
            <KeyInput
              value={key}
              onChange={(newKey) => {
                if (newKey === '') {
                  // remove
                  const nValue = {
                    ...vRef.current,
                  }
                  delete nValue['']
                  ctx.listeners.onChangeHandler(ctx, path, nValue)
                } else {
                  console.log(newKey, '???')
                  const nValue = {
                    ...vRef.current,
                  }
                  const p = nValue[key]
                  delete nValue[key]
                  nValue[newKey] = p
                  ctx.listeners.onChangeHandler(ctx, path, nValue)
                }
              }}
            />
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
