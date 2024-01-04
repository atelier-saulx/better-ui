import {
  BasedSchema,
  BasedSchemaField,
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
} from '@based/schema'

export type Reference = string | ({ [key: string]: any } & { id: string })

export type References = Reference[]

export type Listeners = {
  onChangeHandler: (ctx: TableCtx, path: Path, newValue?: any) => boolean
  onNew: (ctx: TableCtx, path: Path, newValue?: any) => boolean
  onRemove: (ctx: TableCtx, path: Path, index: number) => boolean
  onSelectReference: (props: {
    path: Path
    value: Reference | void | null
    field: BasedSchemaFieldReference
    ctx: TableCtx
  }) => Promise<Reference | void | null>
  onSelectReferences: (props: {
    path: Path
    value: References | void | null
    field: BasedSchemaFieldReferences
    ctx: TableCtx
  }) => Promise<References | void | null>
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
