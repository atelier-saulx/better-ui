import {
  BasedSchema,
  BasedSchemaField,
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
} from '@based/schema'

export type Listeners = {
  onChangeHandler: (ctx: TableCtx, path: Path, newValue?: any) => boolean
  onNew: (ctx: TableCtx, path: Path, newValue?: any) => boolean
  onRemove: (ctx: TableCtx, path: Path, index: number) => boolean
  onSelectReference: (
    path: Path,
    value: string | ({ [key: string]: any } & { id: string }) | void,
    field: BasedSchemaFieldReference,
    ctx: TableCtx
  ) => Promise<string | void>
  onSelectReferences: (props: {
    path: Path
    value: (string | ({ [key: string]: any } & { id: string }))[] | void
    field: BasedSchemaFieldReferences
    ctx: TableCtx
  }) => Promise<string[] | void>
}

export type TableCtx = {
  fields: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  variant: Variant
  schema?: BasedSchema
  listeners: Listeners
}

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }

export type Variant = 'regular' | 'small' | 'bare'
