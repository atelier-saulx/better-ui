import { BasedSchemaField } from '@based/schema'

export type TableCtx = {
  schema: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  onNew?: () => void
  onRemove?: (index: number) => void
}

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }
