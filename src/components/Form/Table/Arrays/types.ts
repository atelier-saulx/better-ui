import { BasedSchemaFieldArray } from '@based/schema'
import { Path, TableCtx } from '../../types.js'

export type RowProps = {
  value: ValueRef
  changeIndex: (fromIndex: number, toIndex: number) => void
  path: Path
  onSelect?: (selected: any, all?: boolean) => void
  ctx: TableCtx
  selected?: Set<string>
  draggable?: boolean
  field: BasedSchemaFieldArray
  removeItem: (index: number) => void
  onClickRow?: (val: any) => void
}

export type ValueRef = {
  value: any[]
  orderId: number
}
