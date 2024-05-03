import React, { ReactNode, useEffect } from 'react'
import { Stack, StackProps, useSize } from '../../../index.js'
import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { canUseColumns } from '../utils.js'
import { getColSizes } from '../getColSizes.js'
import { styled, Style } from 'inlines'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

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
  showAllCols?: boolean,
) => {
  const cols = alwaysUseCols || canUseColumns(field)

  if (cols) {
    const colFields = getColSizes(field, width, readOnly, showAllCols)
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
  showAllCols,
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
  showAllCols?: boolean
  correction?: number
  style?: Style
  alwaysUseCols?: boolean
}) {
  const [width, setWidth] = React.useState(0)

  const sizeRef = useSize(({ width }, elem) => {
    if (field.type === 'object') {
      const f = getCols(
        alwaysUseCols,
        field,
        readOnly,
        width - correction,
        displayAllFields,
        showAllCols,
      )
      setColumns(f)
      if (showAllCols) {
        setWidth(f.reduce((acc, f) => acc + f.width, 0))
      }
    }
    if (!showAllCols) {
      setWidth(width)
    }
  })

  useEffect(() => {
    let w = width

    if (field.type === 'object' && w) {
      setColumns(
        getCols(
          alwaysUseCols,
          field,
          readOnly,
          w - correction,
          displayAllFields,
          showAllCols,
        ),
      )
    }
  }, [hashObjectIgnoreKeyOrder(field)])

  if (field.type === 'object') {
    return (
      <styled.div style={{ width: '100%', height: '100%' }}>
        <styled.div ref={sizeRef} style={{ width: '100%' }} />
        <styled.div style={{ width: 200, height: '100%' }}>
          <Stack
            justify={justify}
            align={align}
            direction="column"
            style={{
              width: width,
              ...style,
              height: '100%',
            }}
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
