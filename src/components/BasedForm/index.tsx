import { useClient, useQuery } from '@based/react'
import {
  BasedSchema,
  BasedSchemaFieldObject,
  BasedSchemaType,
  convertOldToNew,
} from '@based/schema'
import * as React from 'react'
import {
  Container,
  Form,
  FormProps,
  Modal,
  Spinner,
  useUpdate,
} from '../../index.js'
import { useLanguage } from '../../hooks/useLanguage/index.js'
import { SelectReferenceModal } from './SelectReferenceModal.js'

export type BasedFormProps = {
  id: string
  includedFields?: string[]
  excludeCommonFields?: boolean
  fields?:
    | FormProps['fields']
    | ((
        fields: FormProps['fields'],
        schema: BasedSchema,
      ) => FormProps['fields'])
  query?: (
    id: string,
    query: any,
    fields: FormProps['fields'],
    schema: BasedSchema,
  ) => any
  onChange?: FormProps['onChange']
}

export function BasedForm({
  id,
  includedFields,
  excludeCommonFields = true,
  query,
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

  const ref = React.useRef<{
    values?: FormProps['values']
    fields?: FormProps['fields']
  }>({})

  // if id changes change it all

  const update = useUpdate()

  if (!ref.current.fields) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
  }

  return (
    <Form
      schema={schema}
      values={ref.current.values}
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
