import { BasedSchemaFieldArray } from '@based/schema'
import { Path, TableCtx } from '../../types.js'

export type RowProps = {
  value: ValueRef
  changeIndex: (fromIndex: number, toIndex: number) => void
  path: Path
  ctx: TableCtx
  field: BasedSchemaFieldArray
  removeItem: (index: number) => void
}

export type ValueRef = {
  value: any[]
  orderId: number
}
