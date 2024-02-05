import React, { ReactNode } from 'react'
import { Stack, StackProps, useSize } from '../../../index.js'
import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { canUseColumns } from '../utils.js'
import { getColSizes } from '../getColSizes.js'
import { styled, Style } from 'inlines'

type SetColumns = (cols?: ReturnType<typeof getColSizes>) => void

export const useColumns = () => {
  return React.useState<ReturnType<typeof getColSizes>>([])
}

const getCols = (
  field: BasedSchemaFieldObject,
  readOnly: boolean,
  width: number,
  displayAllFields: boolean,
) => {
  const cols = canUseColumns(field)

  // force col usage as option

  if (cols) {
    const colFields = getColSizes(field, width, readOnly)
    if (
      !displayAllFields ||
      colFields.length === Object.keys(field.properties).length
    ) {
      return colFields
    }
  }

  return []
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
      setColumns(getCols(field, readOnly, width - correction, displayAllFields))
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
