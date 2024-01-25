import React, { ReactNode } from 'react'
import { Stack, StackProps, useSize } from '../../../index.js'
import { BasedSchemaField } from '@based/schema'
import { canUseColumns } from '../utils.js'
import { getColSizes } from '../getColSizes.js'
import { styled, Style } from 'inlines'

type SetColumns = (cols?: ReturnType<typeof getColSizes>) => void

export const useColumns = () => {
  return React.useState<ReturnType<typeof getColSizes>>([])
}

export function SizedStack({
  field,
  readOnly,
  children,
  displayAllFields,
  setColumns,
  correction = 64 * 2,
  style,
  justify = 'start',
  align = 'start',
}: StackProps & {
  field: BasedSchemaField
  readOnly?: boolean
  children: ReactNode
  displayAllFields?: boolean
  setColumns: SetColumns
  correction?: number
  style?: Style
}) {
  const [width, setWidth] = React.useState(0)
  const sizeRef = useSize(({ width }) => {
    if (field.type === 'object') {
      const cols = canUseColumns(field)
      const colFields = getColSizes(field, width - correction, readOnly)
      setColumns(
        (cols && !displayAllFields) ||
          colFields.length === Object.keys(field.properties).length
          ? colFields
          : [],
      )
    }
    setWidth(width)
  })

  if (field.type === 'object') {
    return (
      <styled.div style={{ width: '100%' }}>
        <styled.div ref={sizeRef} style={{ width: '100%' }} />
        <styled.div style={{ width: 200 }}>
          <Stack
            justify={justify}
            align={align}
            direction="column"
            style={{ width, ...style }}
          >
            {children}
          </Stack>
        </styled.div>
      </styled.div>
    )
  }

  return <Stack direction="column">{children}</Stack>
}
