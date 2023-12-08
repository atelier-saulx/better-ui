import * as React from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'
import { styled } from 'inlines'
import { border, color } from '../../utils/vars'
import { Text } from '../text'
import { Stack } from '../layout'
import { ArrowheadRight } from '../icons'

export function FormObject({
  fieldKey,
  field,
  values,
  variant,
  nested,
  label,
  path,
}: {
  path?: string[]
  label?: React.ReactNode
  variant: 'extensive' | 'minimal'
  fieldKey: string
  field: BasedSchemaFieldObject
  values: { [key: string]: any }
  nested?: boolean
}) {
  let parsedValues: { [key: string]: any }[] = []

  const [expanded, setExpand] = React.useState(false)

  const fieldValue: BasedSchemaFieldObject = {
    type: 'object',
    properties: {
      $key: { type: 'string', title: 'key', readOnly: true },
      $value: { type: 'string', title: 'value' },
    },
  }

  let noGo = false

  const colls: string[] = []

  for (const key in field.properties) {
    colls.push(field.properties[key].title ?? key)
    if (
      !(
        field.properties[key].type === 'reference' ||
        field.properties[key].type === 'string' ||
        field.properties[key].type === 'number'
      )
    ) {
      noGo = true
    }
    parsedValues.push({ $key: key, $value: values[key] })
  }

  const isSmall = colls.length < 5 && !noGo

  if (isSmall) {
    parsedValues = [values]
  }

  if (nested) {
    if (!path) {
      path = ['x']
    }

    if (isSmall) {
      return (
        <Table
          style={{
            borderLeft: border(),
          }}
          nested
          orginalField={field}
          field={isSmall ? field : fieldValue}
          colls={isSmall ? colls : []}
          rows={parsedValues}
          onRemove={() => {}}
        />
      )
    }

    return (
      <Stack align="stretch">
        <styled.div
          style={{
            display: 'flex',
            background: color('background', 'muted'),
            minHeight: '100%',
            flexGrow: 0,
            borderRight: path.length > 1 ? border() : null,
            minWidth: path.length > 1 ? 32 : null,
          }}
        />

        <styled.div
          style={{
            flexGrow: 1,
          }}
        >
          <Stack
            onClick={() => {
              setExpand(!expanded)
            }}
            gap={4}
            justify="start"
            style={{
              userSelect: 'none',
              paddingLeft: 12,
              minHeight: 48,
              flexGrow: 1,
              borderBottom: expanded ? null : border(),
              paddingRight: 10,
              cursor: 'pointer',
              borderTop: border(),
              '&:hover': {
                background: color('background', 'muted'),
              },
              '&:active': {
                background: color('background', 'dimmer'),
              },
              // marginLeft: -20,
              // background: color('background', 'muted'),
            }}
          >
            <ArrowheadRight
              style={{
                transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s',
              }}
            />{' '}
            <Text variant="bodyStrong">{label ?? field.title ?? fieldKey}</Text>
          </Stack>
          {expanded ? (
            <Table
              style={{
                borderTop: border(),
                borderBottom: border(),
              }}
              path={path}
              nested
              orginalField={field}
              field={fieldValue}
              colls={[]}
              rows={parsedValues}
              onRemove={() => {}}
            />
          ) : null}
        </styled.div>
      </Stack>
    )
  }

  return (
    <FormField variant={variant} field={field} name={field.title ?? fieldKey}>
      <Table
        orginalField={field}
        field={isSmall ? field : fieldValue}
        colls={isSmall ? colls : []}
        rows={parsedValues}
        onRemove={() => {}}
      />
    </FormField>
  )
}
