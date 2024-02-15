import { BasedSchema } from '@based/schema'
import { BasedExplorerProps, FormProps } from '../../index.js'
import { FieldsFn } from './index.js'

type OnChangeParams = Parameters<FormProps['onChange']>

type SharedBasedFormProps = {
  includedFields?: string[]
  excludeCommonFields?: boolean
  fields?: FormProps['fields'] | FieldsFn
  variant?: FormProps['variant']
  queryEndpoint?: string
  query?: (p: {
    id: string
    query: any
    language: string
    fields: FormProps['fields']
    schema: BasedSchema
  }) => any
  onChange?: (params: {
    values: OnChangeParams[0]
    changed: OnChangeParams[1]
    checksum: OnChangeParams[2]
    based: OnChangeParams[3]
    language: string
  }) => void
  onFileUpload?: FormProps['onFileUpload']
  transformResults?: (any) => any
  header?:
    | boolean
    | React.ReactNode
    | ((values: FormProps['values']) => React.ReactNode)
  addItem?: (p: {
    values: Record<string, any>
    language: string
  }) => Promise<void>
  deleteItem?: (p: Record<string, any>) => Promise<void>
  onClickReference?: FormProps['onClickReference']
  selectReferenceExplorerProps?:
    | (BasedExplorerProps & { itemQuery: any })
    | ((p: {
        fields: any
        query: any
        types: string[]
      }) => BasedExplorerProps & { itemQuery: any })
}

type OptionalBasedFormProps =
  | {
      id?: string
      type: string
    }
  | {
      id: string
      type?: string
    }

export type BasedFormProps = SharedBasedFormProps & OptionalBasedFormProps

export type BasedFormRef = {
  queryFn?: BasedFormProps['query']
  fieldsFn?: FieldsFn
  fields?: FormProps['fields']
  currentFields?: FormProps['fields']
  currentQuery?: any
  schema?: BasedSchema
}
