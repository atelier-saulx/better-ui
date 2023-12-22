import { BasedSchema, BasedSchemaField } from '@based/schema'

export type TableCtx = {
  fields: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  onNew?: () => void
  onRemove?: (index: number) => void
  variant: Variant
  schema?: BasedSchema
}

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }

export type Variant = 'regular' | 'small' | 'bare'
