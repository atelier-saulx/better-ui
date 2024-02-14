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
  CheckboxInput,
  RichTextEditor,
  Badge,
  IconId,
} from '../../index.js'
import { FormField } from './FormField.js'
import { Table } from './Table/index.js'
import { isTable, isCode } from './utils.js'
import { SetField } from './Set.js'
import { Reference } from './Reference.js'
import { TableCtx } from './types.js'
import { References } from './References/index.js'

export const Field = ({
  propKey: key,
  field,
  ctx,
  autoFocus,
}: {
  propKey: string
  field: BasedSchemaField
  ctx: TableCtx
  autoFocus?: boolean
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
            disabled={field.readOnly}
            autoFocus={autoFocus}
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

  if (field.type === 'string' && field.format === 'basedId' && field.readOnly) {
    return (
      <Badge
        prefix={<IconId />}
        style={{ minWidth: 100 }}
        color="informative-muted"
      >
        {ctx.values[key] ?? '-'}
      </Badge>
    )
  }

  if (field.type === 'boolean') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <CheckboxInput
            disabled={field.readOnly}
            autoFocus={autoFocus}
            variant="toggle"
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
          <Reference readOnly={field.readOnly} path={path} ctx={ctx} />
        </styled.div>
      </FormField>
    )
  }

  if (field.type === 'references') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <References path={path} ctx={ctx} />
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

  // TODO correct check
  // if (type === 'string' && field.format === 'html') {
  if (key === 'content') {
    // on blur / focus
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <RichTextEditor
            value={ctx.values[key]}
            onChange={(html) => {
              ctx.listeners.onChangeHandler(ctx, path, html)
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
            // TODO disabled={field.readOnly}
            copy
            color={
              field.format === 'json' || field.format === 'markdown'
                ? 'muted'
                : 'inverted'
            }
            prettier
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
            disabled={field.readOnly}
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
            disabled={field.readOnly}
            mimeType={field.contentMediaType}
            value={ctx.values[key] ? { src: ctx.values[key] } : undefined}
            onChange={async (file, updateProgress) => {
              const result = await ctx.listeners.onFileUpload(
                {
                  ctx,
                  path,
                  value: file,
                  field,
                },
                updateProgress,
              )
              ctx.listeners.onChangeHandler(ctx, path, result)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if ((type === 'string' || type === 'text') && field.multiline) {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <TextAreaInput
            disabled={field.readOnly}
            autoFocus={autoFocus}
            value={ctx.values[key] as string}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'string' || type === 'text') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <TextInput
            disabled={field.readOnly}
            autoFocus={autoFocus}
            value={ctx.values[key] as string}
            onChange={(value) => {
              ctx.listeners.onChangeHandler(ctx, path, value)
            }}
          />
        </styled.div>
      </FormField>
    )
  }

  if (type === 'number' || type === 'integer') {
    return (
      <FormField fieldKey={key} key={key} variant={ctx.variant} field={field}>
        <styled.div
          style={{
            width: 450,
          }}
        >
          <NumberInput
            disabled={field.readOnly}
            autoFocus={autoFocus}
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
            disabled={field.readOnly}
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
