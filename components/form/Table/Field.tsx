import React from 'react'
import { StringInput } from './StringInput'
import { readPath } from './utils'
import { TableCtx, Path } from './types'
import { FileInput } from '../../file-input'
import { Table } from '.'
import { CheckboxInput } from '../../checkbox-input'

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath(ctx, path)

  if (field.type === 'boolean') {
    return <CheckboxInput variant="toggle" value={false} onChange={() => {}} />
  }

  if (field.type === 'string' && field.contentMediaType) {
    return (
      <FileInput
        variant="minimal"
        mimeType={field.contentMediaType}
        value={value ? { src: value } : undefined}
        onChange={(file) => {
          console.log('uploaded file', file)
        }}
      />
    )
  }

  if (field.type === 'string') {
    return <StringInput value={value} />
  }

  if (field.type === 'object') {
    return <Table ctx={ctx} path={path} />
  }

  return <div style={{ color: 'red' }}>{field.type}</div>
}
