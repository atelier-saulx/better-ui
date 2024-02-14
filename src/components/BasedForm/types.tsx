import { BasedSchema } from '@based/schema'
import { FormProps } from '../../index.js'
import { FieldsFn } from './index.js'

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
  onChange?: FormProps['onChange']
  onFileUpload?: FormProps['onFileUpload']
  transformResults?: (any) => any
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
