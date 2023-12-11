import React, { ReactNode } from 'react'
import { StringInput } from './StringInput'
import { readPath } from './utils'
import { TableCtx, Path } from './types'
import { FileInput } from '../../FileInput'
import { Table } from '.'
import { CheckboxInput } from '../../CheckboxInput'
import { styled } from 'inlines'

export const Padder = ({ children }: { children: ReactNode }) => {
  return (
    <styled.div
      style={{
        width: '100%',
        paddingLeft: 20,
      }}
    >
      {children}
    </styled.div>
  )
}

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath(ctx, path)

  if (field.type === 'boolean') {
    return (
      <Padder>
        <CheckboxInput variant="toggle" value={false} onChange={() => {}} />
      </Padder>
    )
  }

  if (field.type === 'string' && field.contentMediaType) {
    return (
      <Padder>
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

  if (field.type === 'string') {
    return (
      <Padder>
        <StringInput value={value} />
      </Padder>
    )
  }

  if (field.type === 'object') {
    return <Table ctx={ctx} path={path} />
  }

  return (
    <Padder>
      <div style={{ color: 'red' }}>{field.type}</div>
    </Padder>
  )
}
