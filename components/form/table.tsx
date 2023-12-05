import * as React from 'react'
import { styled } from 'inlines'
import { Button } from '../button'
import { BasedSchemaField } from '@based/schema'
import { Delete } from '../icons'

type TableProps = {
  colls: string[]
  rows: any[]
  onNew: () => void
  field: BasedSchemaField
  onRemove: (index: number) => void
  order?: boolean // drag and drop
}

function Row({ field, value }: { field: BasedSchemaField; value: any }) {
  const [focus, setFocus] = React.useState(false)

  if (field.type === 'object') {
    return <styled.div>OBJECT</styled.div>
  }

  const ref = React.useRef<HTMLDivElement>()

  if (field.type === 'string') {
    return (
      <styled.input
        ref={ref}
        style={{
          flexGrow: 1,
          fontSize: 14,
          fontWeight: 500,

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          height: 32,
          borderRadius: `var(--radius-xs)`,

          paddingLeft: 10,
          paddingRight: 10,

          border: focus
            ? `1px solid var(--input-border-active, #634ECA)`
            : `1px solid transparent`,
          boxShadow: focus ? `0px 0px 0px 2px rgba(87, 63, 207, 0.20)` : null,

          letterSpacing: '-0.14px',
        }}
        value={value}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      />
    )
  }
}

export function Table({ colls, rows, field, onNew, onRemove }: TableProps) {
  let header = null
  const isObject = colls.length
  if (isObject) {
    header = (
      <styled.div
        style={{
          background: `var(--background-neutral-surface, rgba(31, 82, 158, 0.02))`,
          borderTop: '1px solid var(--border-default-strong)',
          borderBottom: '1px solid var(--border-default-strong)',
          height: 48,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {colls.map((v, index) => {
          return <styled.div key={index}></styled.div>
        })}
      </styled.div>
    )
  } else {
    header = (
      <styled.div
        style={{
          borderBottom: '1px solid var(--border-default-strong)',
          borderTop: '1px solid var(--border-default-strong)',
        }}
      />
    )
  }

  return (
    <styled.div style={{ width: '100%' }}>
      <styled.div style={{ marginBottom: 8, width: '100%' }}>
        {header}
        {rows.map((value, i) => {
          return (
            <styled.div
              key={i}
              style={{
                height: 48,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 12,
                paddingBottom: 12,
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                borderBottom: '1px solid var(--border-default-strong)',
              }}
            >
              <Row value={value} field={field} />
              <Delete style={{ color: '#eee', marginLeft: 12 }} />
            </styled.div>
          )
        })}
      </styled.div>

      <Button
        size="small"
        variant="neutral-transparent"
        onClick={onNew}
        // prefix={<AddIcon />}
      >
        New
      </Button>
    </styled.div>
  )
}
