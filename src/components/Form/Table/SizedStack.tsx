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
  alwaysUseCols: boolean,
  field: BasedSchemaFieldObject,
  readOnly: boolean,
  width: number,
  displayAllFields: boolean,
) => {
  const cols = alwaysUseCols || canUseColumns(field)

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
  alwaysUseCols = false,
}: StackProps & {
  field: BasedSchemaField
  readOnly?: boolean
  children: ReactNode
  displayAllFields?: boolean
  setColumns: SetColumns
  correction?: number
  style?: Style
  alwaysUseCols?: boolean
}) {
  const [width, setWidth] = React.useState(0)
  const sizeRef = useSize(({ width }) => {
    if (field.type === 'object') {
      setColumns(
        getCols(
          alwaysUseCols,
          field,
          readOnly,
          width - correction,
          displayAllFields,
        ),
      )
    }
    setWidth(width)
  })

  if (field.type === 'object') {
    return (
      <styled.div style={{ width: '100%', height: '100%' }}>
        <styled.div ref={sizeRef} style={{ width: '100%' }} />
        <styled.div style={{ width: 200, height: '100%' }}>
          <Stack
            justify={justify}
            align={align}
            direction="column"
            style={{ width, ...style, height: '100%' }}
          >
            {children}
          </Stack>
        </styled.div>
      </styled.div>
    )
  }

  return (
    <Stack style={style} direction="column">
      {children}
    </Stack>
  )
}
