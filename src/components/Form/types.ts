import {
  BasedSchemaField,
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
  BasedSchemaFieldString,
  BasedSchemaPartial,
} from '@based/schema'
import { ButtonProps } from '../Button/index.js'

export type Reference = string | ({ [key: string]: any } & { id: string })

export type References = Reference[]

export type DragTarget = {
  data?: any
  path?: Path
  isValue?: boolean // oppiste of is file
}

export type ColSizes = {
  width?: number
  key: string
  field: BasedSchemaField
  flexible?: boolean
}[]

export type Listeners = {
  getDragTarget: () => DragTarget
  setDragTarget: (t: DragTarget) => DragTarget

  // on drop (allow file drops)
  // onDrop: (dragTarget: DragTarget, ctx: TableCtx) => Promise<void>

  onChangeHandler: (
    ctx: TableCtx,
    path: Path,
    newValue?: any,
    forceUpdate?: boolean,
  ) => boolean
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
  onClickReference: (props: {
    path: Path
    value: Reference
    field: BasedSchemaFieldReferences | BasedSchemaFieldReference
    ctx: TableCtx
  }) => ReturnType<ButtonProps['onClick']>
  onFileUpload: (
    props: {
      path: Path
      value: File | void
      field: BasedSchemaFieldString | BasedSchemaFieldReference
      ctx: TableCtx
    },
    updateProgress: (p: number) => void,
  ) => Promise<Reference | string | void | null | File>
}

export type TableCtx = {
  fields: { [key: string]: BasedSchemaField }
  values: { [key: string]: any }
  variant: Variant
  schema?: BasedSchemaPartial
  listeners: Listeners
  // path like x.y.z
  fieldOverrides?: { [path: string]: BasedSchemaField }
  readOnly?: boolean
  forceCols?: boolean
}

export type Path = (string | number)[]

export type TableProps = { ctx: TableCtx; path: Path }

export type Variant = 'regular' | 'small' | 'bare' | 'no-confirm'
