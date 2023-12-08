import React from 'react'
import { StringInput } from './StringInput'
import { readPath } from './utils'
import { TableCtx, Path } from './types'
import { FileInput } from '../../file-input'
import { Table } from '.'
import { CheckboxInput } from '../../checkbox-input'

let map: any = {}

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath(ctx, path)

  if (field.type === 'boolean') {
    return <CheckboxInput variant="toggle" />
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
    if (map[path.join('.')]) {
      return <pre>{path.join('/')}</pre>
    }
    map[path.join('.')] = true
    return <Table ctx={ctx} path={path} />
  }

  return <div style={{ color: 'red' }}>{field.type}</div>
}
