import React from 'react'
import { BasedSchemaField } from '@based/schema'
import { styled } from 'inlines'
import {
  FileInput,
  TextInput,
  DateInput,
  Code,
  NumberInput,
  TextAreaInput,
  SelectInput,
  ColorInput,
} from '../../index.js'
import { FormField } from './FormField.js'
import { Table } from './Table/index.js'
import { isTable, isCode } from './utils.js'
import { SetField } from './Set.js'
import { Reference } from './Reference.js'
import { TableCtx } from './types.js'

export const Field = ({
  propKey: key,
  field,
  ctx,
}: {
  propKey: string
  field: BasedSchemaField
  ctx: TableCtx
}) => {
  const { type } = field

  const path = [key]

  if ('enum' in field) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <SelectInput
            options={field.enum}
            value={ctx.values[key]}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (field.type === 'reference') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <Reference path={path} ctx={ctx} />
        </styled.div>
      </FormField>
    )
  }

  if (field.type === 'json') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            minWidth: 450,
            maxWidth: 750,
          }}
        >
          <Code
            copy
            language="json"
            value={ctx.values[key]}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string' && isCode(field.format)) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            minWidth: 450,
            maxWidth: 750,
          }}
        >
          <Code
            copy
            color={
              field.format === 'json' || field.format === 'markdown'
                ? 'muted'
                : 'inverted'
            }
            language={field.format}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
            value={ctx.values[key]}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string' && field.format === 'rgbColor') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <ColorInput
            value={ctx.values[key]}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string' && field.contentMediaType) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <FileInput
            mimeType={field.contentMediaType}
            value={ctx.values[key] ? { src: ctx.values[key] } : undefined}
            onChange={(file) => {
              // has to be handled better...
              console.warn(
                'uploaded file not there yet... (needs special handler)',
                file
              )
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string' && field.multiline) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <TextAreaInput
            value={ctx.values[key] as string}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <TextInput
            value={ctx.values[key] as string}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'number') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <NumberInput
            value={ctx.values[key] as number}
            onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'timestamp') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <DateInput
            time
            value={ctx.values[key] as number}
            onChange={(v) => ctx.listeners.onChangeHandler(ctx, path, v)}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'set') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <SetField path={[key]} ctx={ctx} />
      </FormField>
    )
  }

  if (isTable(field)) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <Table path={[key]} ctx={ctx} />
      </FormField>
    )
  }

  return null
}