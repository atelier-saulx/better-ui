import { BasedSchemaField } from '@based/schema'
import { Variant } from '../types'

export type TableCtx = {
  schema: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  onNew?: () => void
  onRemove?: (index: number) => void
  variant: Variant
}

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }
