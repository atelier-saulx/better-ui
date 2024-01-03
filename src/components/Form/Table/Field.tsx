import React, { ReactNode } from 'react'
import { styled, Style } from 'inlines'
import {
  FileInput,
  DateInput,
  TextInput,
  NumberInput,
  TextAreaInput,
  SelectInput,
  ColorInput,
  Code,
  CheckboxInput,
} from '../../../index.js'
import { readPath, isCode } from '../utils.js'
import { TableCtx, Path } from '../types.js'
import { Table } from './index.js'
import { SetField } from '../Set.js'
import { Reference } from '../Reference.js'

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
        <SelectInput
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
          variant="small"
          options={field.enum}
          value={value}
        />
      </Padder>
    )
  }

  if (field.type === 'reference') {
    return (
      <Padder
        style={{
          paddingLeft: 15,
        }}
      >
        <Reference variant="small" ctx={ctx} path={path} />
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
        <CheckboxInput
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
          variant="toggle"
          value={value}
        />
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

  if (field.type === 'json') {
    return (
      <Padder
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Code
          color="screen"
          language={'json'}
          value={value}
          variant="small"
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
      </Padder>
    )
  }

  if (field.type === 'string' && isCode(field.format)) {
    return (
      <Padder
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Code
          color="screen"
          language={field.format}
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
          value={value}
          variant="small"
        />
      </Padder>
    )
  }

  if (field.type === 'number') {
    return (
      <Padder>
        <NumberInput
          variant="small"
          value={value}
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
      </Padder>
    )
  }

  if (field.type === 'string' && field.format === 'rgbColor') {
    return (
      <Padder>
        <ColorInput
          value={value}
          variant="small"
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
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
        <TextAreaInput
          variant="small"
          value={value}
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
      </Padder>
    )
  }

  if (field.type === 'string') {
    return (
      <Padder>
        <TextInput
          variant="small"
          value={value}
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
      </Padder>
    )
  }

  if (field.type === 'timestamp') {
    return (
      <Padder>
        <DateInput
          time
          variant="small"
          value={value}
          onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
        />
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
      <styled.div style={{ color: 'red' }}>
        Non defined field type: {field.type}
      </styled.div>
    </Padder>
  )
}
