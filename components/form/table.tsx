import * as React from 'react'
import { styled, Style } from 'inlines'
import { Button } from '../button'
import { BasedSchemaField } from '@based/schema'
import { Delete } from '../icons'
import { Text } from '../text'

type TableProps = {
  colls: string[]
  rows: any[]
  onNew: () => void
  field: BasedSchemaField
  onRemove: (index: number) => void
  order?: boolean // drag and drop
}

function StringInput({
  value,
  style,
}: {
  value: string | number | undefined
  style?: Style
}) {
  const [focus, setFocus] = React.useState(false)
  return (
    <styled.input
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
        ...style,
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

function Row({ field, value }: { field: BasedSchemaField; value: any }) {
  if (field.type === 'object') {
    const colls = Object.keys(field.properties)

    return (
      <styled.div
        style={{
          width: '100%',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          //   paddingLeft: 10,
          //   paddingRight: 10,
          justifyContent: 'space-between',
        }}
      >
        {Object.keys(field.properties).map((v, index) => {
          return (
            <styled.div
              style={{
                height: 48,
                display: 'flex',
                alignItems: 'center',
                borderRight:
                  index === colls.length - 1
                    ? undefined
                    : '1px solid var(--border-default-strong)',
                width: `calc(${100 / colls.length}%)`,
                paddingLeft: 20,
              }}
            >
              <StringInput key={index} value={value[v]} />
            </styled.div>
          )
        })}
      </styled.div>
    )
  }

  if (field.type === 'string') {
    return <StringInput value={value} />
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

          justifyContent: 'space-between',
        }}
      >
        {colls.map((v, index) => {
          return (
            <Text
              weight={500}
              style={{
                height: 48,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                borderRight:
                  index === colls.length - 1
                    ? undefined
                    : '1px solid var(--border-default-strong)',
                width: `calc(${100 / colls.length}%)`,
                paddingLeft: 30,
                color: `var(--content-default-secondary, #7E8B99)`,
              }}
              key={index}
            >
              {v}
            </Text>
          )
        })}
        <Delete style={{ color: '#eee', marginLeft: 12, opacity: 0 }} />
      </styled.div>
    )
  } else {
    header = (
      <styled.div
        style={{
          borderBottom: '1px solid var(--border-default-strong)',
          //   borderTop: '1px solid var(--border-default-strong)',
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

                borderBottom: '1px solid var(--border-default-strong)',
              }}
            >
              <Row value={value} field={field} />
              <Delete style={{ color: '#eee', marginLeft: 12 }} />
            </styled.div>
          )
        })}
      </styled.div>

      <Button size="small" variant="neutral-transparent" onClick={onNew}>
        New
      </Button>
    </styled.div>
  )
}
