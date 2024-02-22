import { BasedSchemaFieldArray } from '@based/schema'
import { Path, TableCtx } from '../../types.js'
import { Style } from 'inlines'

export type RowProps = {
  value: ValueRef
  changeIndex: (fromIndex: number, toIndex: number) => void
  path: Path
  ctx: TableCtx
  draggable?: boolean
  field: BasedSchemaFieldArray
  removeItem: (index: number) => void
  onClickRow?: (val: any) => void
}

export type ValueRef = {
  value: any[]
  orderId: number
}
