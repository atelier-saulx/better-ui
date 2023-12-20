import React, { ReactNode } from 'react'
import { StringInput } from './StringInput'
import { readPath } from '../utils'
import { TableCtx, Path } from './types'
import { FileInput } from '../../FileInput'
import { Table } from '.'
import { CheckboxInput } from '../../CheckboxInput'
import { styled, Style } from 'inlines'
import { SetField } from '../Set'
import { DateInput } from '../../DateInput'

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
        paddingLeft: 20,
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

  if (field.type === 'boolean') {
    return (
      <Padder>
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

  if (field.type === 'timestamp') {
    return (
      <Padder>
        <DateInput variant="small" value={value} />
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
