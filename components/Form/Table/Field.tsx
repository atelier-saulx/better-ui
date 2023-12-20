import React, { ReactNode } from 'react'
import { readPath } from '../utils'
import { TableCtx, Path } from './types'
import { FileInput } from '../../FileInput'
import { Table } from '.'
import { CheckboxInput } from '../../CheckboxInput'
import { styled, Style } from 'inlines'
import { SetField } from '../Set'
import { DateInput } from '../../DateInput'
import { TextInput } from '../../TextInput'
import { NumberInput } from '../../NumberInput'
import { TextAreaInput } from '../../TextAreaInput'
import { SelectInput } from '../../SelectInput'
import { ColorInput } from '../../ColorInput'

export const Padder = ({
  children,
  style,
}: {
  children: ReactNode
  style?: Style
}) => {
  return (
    <styled.div
      style={{
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath(ctx, path)

  if ('enum' in field) {
    return (
      <Padder>
        <SelectInput variant="small" options={field.enum} value={value} />
      </Padder>
    )
  }

  if (field.type === 'boolean') {
    return (
      <Padder
        style={{
          paddingLeft: 15,
        }}
      >
        <CheckboxInput variant="toggle" value={false} onChange={() => {}} />
      </Padder>
    )
  }

  if (field.type === 'set') {
    return (
      <Padder
        style={{
          marginTop: 16,
        }}
      >
        <SetField ctx={ctx} path={path} />
      </Padder>
    )
  }

  if (field.type === 'string' && field.contentMediaType) {
    return (
      <Padder style={{ paddingLeft: 20 }}>
        <FileInput
          variant="small"
          mimeType={field.contentMediaType}
          value={value ? { src: value } : undefined}
          onChange={(file) => {
            console.log('uploaded file', file)
          }}
        />
      </Padder>
    )
  }

  if (field.type === 'number') {
    return (
      <Padder>
        <NumberInput variant="small" value={value} />
      </Padder>
    )
  }

  if (field.type === 'string' && field.format === 'rgbColor') {
    return (
      <Padder>
        <ColorInput value={value} variant="small" />
      </Padder>
    )
  }

  if (field.type === 'string' && field.multiline) {
    return (
      <Padder
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <TextAreaInput variant="small" value={value} />
      </Padder>
    )
  }

  if (field.type === 'string') {
    return (
      <Padder>
        <TextInput variant="small" value={value} />
      </Padder>
    )
  }

  if (field.type === 'timestamp') {
    return (
      <Padder>
        <DateInput time variant="small" value={value} />
      </Padder>
    )
  }

  if (field.type === 'object') {
    return <Table ctx={ctx} path={path} />
  }

  if (field.type === 'array') {
    return <Table ctx={ctx} path={path} />
  }

  return (
    <Padder>
      <div style={{ color: 'red' }}>{field.type}</div>
    </Padder>
  )
}
