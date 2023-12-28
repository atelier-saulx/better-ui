import {
  BasedSchema,
  BasedSchemaField,
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
} from '@based/schema'

export type TableCtx = {
  fields: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  onNew?: () => void
  onRemove?: (index: number) => void
  variant: Variant
  schema?: BasedSchema
  onSelectReference?: (props: {
    ctx: TableCtx
    path: Path
    value?: string | ({ [key: string]: any } & { id: string })
    field: BasedSchemaFieldReference
  }) => string | void
  onSelectReferences?: (props: {
    ctx: TableCtx
    path: Path
    value?: (string | ({ [key: string]: any } & { id: string }))[]
    field: BasedSchemaFieldReferences
  }) => string[] | void
}

// rly nice way of making a select field

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }

export type Variant = 'regular' | 'small' | 'bare'
