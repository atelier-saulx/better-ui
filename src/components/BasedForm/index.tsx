import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import * as React from 'react'
import { Container, Form, FormProps, Modal, Spinner } from '../../index.js'
import { useLanguage } from '../../hooks/useLanguage/index.js'
import { SelectReferenceModal } from './SelectReferenceModal.js'
import { useBasedFormProps } from './useGeneratedProps.js'
import { BasedFormProps, BasedFormRef } from './types.js'

export type FieldsFn = (
  fields: FormProps['fields'],
  schema: BasedSchema,
) => FormProps['fields']

export function BasedForm({
  id,
  includedFields,
  excludeCommonFields = true,
  query,
  queryEndpoint = 'db',
  fields,
}: BasedFormProps) {
  const client = useClient()
  const { open } = Modal.useModal()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema)
  }, [checksum])

  const ref = React.useRef<BasedFormRef>({})

  if (typeof fields === 'function') {
    ref.current.fieldsFn = fields
  }

  if (query) {
    ref.current.queryFn = query
  }

  ref.current.schema = schema

  useBasedFormProps(
    ref,
    id,
    language,
    checksum,
    includedFields,
    excludeCommonFields,
  )

  const hasFields = ref.current.fields

  const { data: values } = useQuery(
    hasFields ? queryEndpoint : null,
    ref.current.currentQuery,
  )

  if (!hasFields) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
  }

  return (
    <Form
      schema={schema}
      values={values}
      fields={ref.current.fields}
      onChange={async (_values, _changed, _checksum, based) => {
        await client.call('db:set', {
          $id: id,
          $language: language,
          ...based,
        })
      }}
      onSelectReference={async () => {
        const selectedReference = await open(({ close }) => (
          <SelectReferenceModal
            onSelect={(reference) => {
              close(reference)
            }}
          />
        ))
        return selectedReference.id
      }}
      onSelectReferences={async () => {
        const selectedReference = await open(({ close }) => (
          <SelectReferenceModal
            onSelect={(reference) => {
              close(reference)
            }}
          />
        ))
        return [selectedReference.id]
      }}
    />
  )
}
