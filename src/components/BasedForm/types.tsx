import {
  BasedSchema,
  BasedSchemaFieldReference,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { BasedExplorerProps, FormProps } from '../../index.js'
import { FieldsFn } from './index.js'
import { ReactNode } from 'react'

type OnChangeParams = Parameters<FormProps['onChange']>

type OnChange = (params: {
  values: OnChangeParams[0]
  changed: OnChangeParams[1]
  checksum: OnChangeParams[2]
  based: OnChangeParams[3]
  language: string
}) => void

type SharedBasedFormProps = {
  forcePublish?: boolean
  formRef?: FormProps['formRef']
  includedFields?: string[]
  excludeCommonFields?: boolean
  fields?: FormProps['fields'] | FieldsFn
  variant?: FormProps['variant']
  children?: ReactNode
  queryEndpoint?: string
  updateEndpoint?: string
  query?: (p: {
    id: string
    query: any
    language: string
    fields: FormProps['fields']
    schema: BasedSchema
  }) => any
  onChange?: OnChange
  onFileUpload?: FormProps['onFileUpload']
  transformResults?: (any) => any
  header?:
    | boolean
    | React.ReactNode
    | ((values: FormProps['values']) => React.ReactNode)
  addItem?: OnChange
  deleteItem?: (p: Record<string, any>) => Promise<void>
  onClickReference?: FormProps['onClickReference']
  renderReferenceModalBody?: (
    field: BasedSchemaFieldReferences | BasedSchemaFieldReference,
    onSelect: (item: any) => void,
  ) => ReactNode
  richTextEditorProps?: {
    onAddImage?: () => void
  }
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
