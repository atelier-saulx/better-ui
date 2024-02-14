import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import * as React from 'react'
import {
  Badge,
  Button,
  Container,
  Form,
  FormProps,
  Modal,
  PageHeader,
  Spinner,
  Stack,
} from '../../index.js'
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
  type,
  variant,
  includedFields,
  excludeCommonFields = true,
  query,
  onChange,
  queryEndpoint = 'db',
  fields,
  transformResults,
  onFileUpload,
  header,
  addItem,
  deleteItem,
}: BasedFormProps) {
  const client = useClient()
  const { open } = Modal.useModal()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
  }, [checksum])

  const ref = React.useRef<BasedFormRef>({})

  if (fields) {
    if (typeof fields === 'function') {
      ref.current.fieldsFn = fields
    } else {
      ref.current.fields = fields
    }
  }

  if (query) {
    ref.current.queryFn = query
  }

  ref.current.schema = schema

  useBasedFormProps(
    ref,
    id,
    type,
    language,
    checksum,
    includedFields,
    excludeCommonFields,
  )

  const isReady = ref.current.currentFields && checksum

  const { data: values } = useQuery(
    isReady ? queryEndpoint : null,
    ref.current.currentQuery,
  )

  const [state, setState] = React.useState<{}>()

  if (!isReady) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
  }

  if (!id && addItem) {
    variant ??= 'no-confirm'
  }

  const props = {
    key: id,
    variant,
    schema,
    values: (transformResults ? transformResults(values) : values) || state,
    fields: ref.current.currentFields,
    onChange:
      onChange ?? id
        ? async (_values, _changed, _checksum, based) => {
            await client.call('db:set', {
              $id: id,
              $language: language,
              ...based,
            })
          }
        : (values) => setState({ ...values }),
    onFileUpload,
    onSelectReference: async ({ field }) => {
      const selectedReference = await open(({ close }) => (
        <SelectReferenceModal
          types={field.allowedTypes?.map((e) =>
            typeof e === 'string' ? e : e.type,
          )}
          onSelect={(reference) => {
            close(reference)
          }}
        />
      ))

      if (selectedReference) {
        return selectedReference.id
      }
    },
    onSelectReferences: async ({ field }) => {
      const selectedReference = await open(({ close }) => (
        <SelectReferenceModal
          types={field.allowedTypes?.map((e) =>
            typeof e === 'string' ? e : e.type,
          )}
          onSelect={(reference) => {
            close(reference)
          }}
        />
      ))

      if (selectedReference) {
        return [selectedReference.id]
      }
    },
  }

  if (header || addItem) {
    return (
      <>
        <PageHeader
          title={
            typeof header === 'function' ? header(props.values || {}) : header
          }
          suffix={
            <Stack>
              {id
                ? deleteItem && (
                    <Button onClick={() => deleteItem({ id, type, ...state })}>
                      Delete
                    </Button>
                  )
                : addItem && (
                    <Button
                      disabled={!state}
                      onClick={() => addItem({ type, ...state })}
                    >
                      Save
                    </Button>
                  )}
            </Stack>
          }
        />
        {React.createElement(Form, props)}
      </>
    )
  }

  return React.createElement(Form, props)
}
