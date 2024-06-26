import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew, display } from '@based/schema'
import * as React from 'react'
import {
  Button,
  Container,
  useUpdate,
  Form,
  FormProps,
  Modal,
  PageHeader,
  Spinner,
  Text,
  Stack,
  IconUndo,
  IconDelete,
  BadgeId,
} from '../../index.js'
import { useLanguage } from '../../hooks/useLanguage/index.js'
import { SelectReferenceModal } from './SelectReferenceModal.js'
import { useBasedFormProps } from './useGeneratedProps.js'
import { BasedFormProps, BasedFormRef } from './types.js'
import { readInfoField } from '../Form/utils.js'
import { deepCopy } from '@saulx/utils'

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
  schema: schemaFn,
  onChange,
  queryEndpoint = 'db',
  updateEndpoint = 'db:set',
  fields,
  transformResults,
  onFileUpload,
  header,
  addItem,
  deleteItem,
  onClickReference,
  children,
  formRef,
  forcePublish,
  renderReferenceModalBody,
  richTextEditorProps,
  headerStyle,
  db = 'default',
}: BasedFormProps): React.ReactNode {
  const client = useClient()
  const { open } = Modal.useModal()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema', { db })
  const schema = React.useMemo(() => {
    if (!rawSchema) return
    const res = convertOldToNew(rawSchema)
    return (schemaFn ? schemaFn(res) : res) as BasedSchema
  }, [checksum])

  const update = useUpdate()

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
    db,
  )
  const isReady = ref.current.currentFields && checksum

  const { data: values, loading } = useQuery<any>(
    isReady && id ? queryEndpoint : null,
    ref.current.currentQuery,
  )

  // @ts-ignore
  formRef ??= React.useRef<FormProps['formRef']['current']>({})

  if (!isReady) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
  }

  let noConfirm
  if (variant === 'no-confirm') {
    if (!id && addItem) {
      variant = null
    } else {
      noConfirm = true
    }
  }

  // if (!id && addItem) {
  //   variant ??= 'no-confirm'
  // }
  let onFormChange
  if (onChange) {
    onFormChange = (values, changed, checksum, based) =>
      onChange({ values, changed, checksum, based, language })
  } else if (id) {
    onFormChange = async (_values, _changed, _checksum, based) => {
      try {
        // @ts-ignore
        await client.call(updateEndpoint, {
          $id: id,
          $language: language,
          ...based,
        })
      } catch (e) {
        throw e
      }
    }
  } else if (addItem) {
    onFormChange = (values, changed, checksum, based) => {
      if (type) {
        values.type = type
        based.type = type
      }

      return addItem({ values, changed, checksum, based, language })
    }
  } else {
    onFormChange = () => {}
  }

  const useHeader = header || addItem

  const props: FormProps & { key: any } = {
    key: id,
    variant,
    schema,
    values:
      (transformResults
        ? transformResults(deepCopy(values))
        : deepCopy(values)) || {},
    fields: ref.current.currentFields,
    onChange: onFormChange,
    onFileUpload,
    onClickReference,
    onChangeAtomic: () => {
      if (formRef.current.hasChanges) {
        update()
      }
    },
    formRef,
    onSelectReference: async ({ field }) => {
      const selectedReference = await open(({ close }) => (
        <SelectReferenceModal
          modalBody={renderReferenceModalBody?.(field, (reference) => {
            close(reference)
          })}
          types={
            field.allowedTypes?.map((e) =>
              typeof e === 'string' ? e : e.type,
            ) || []
          }
          onSelect={(reference) => {
            close(reference)
          }}
        />
      ))

      if (selectedReference) {
        return selectedReference
      }
    },
    onSelectReferences: async ({ field }) => {
      const selectedReference = await open(({ close }) => (
        <SelectReferenceModal
          modalBody={renderReferenceModalBody?.(field, (reference) => {
            close(reference)
          })}
          types={
            field.allowedTypes?.map((e) =>
              typeof e === 'string' ? e : e.type,
            ) || []
          }
          onSelect={(reference) => {
            close(reference)
          }}
        />
      ))

      if (selectedReference) {
        return [selectedReference]
      }
    },
    richTextEditorProps,
  }

  if (useHeader) {
    return (
      <>
        <PageHeader
          style={{ marginBottom: 48, ...headerStyle }}
          title={
            typeof header === 'function'
              ? header(props.values || {})
              : header === true
                ? readInfoField(props.values, {
                    type: 'object',
                    properties: props.fields,
                  })
                : header
          }
          description={
            <Stack justify="start" gap={16} style={{ marginTop: 16 }}>
              <BadgeId id={values?.id} />
              {values?.updatedAt ? (
                <Text variant="body-light">
                  Updated{' '}
                  {display(values.updatedAt, {
                    type: 'timestamp',
                    display: 'human',
                  })}
                </Text>
              ) : null}
            </Stack>
          }
          suffix={
            !noConfirm && (!loading || type) ? (
              <Stack gap={8} style={{ marginTop: -4 }}>
                {id && deleteItem && (
                  <Button
                    shape="square"
                    variant="neutral-transparent"
                    prefix={<IconDelete />}
                    onClick={() => deleteItem({ id, type })}
                  />
                )}
                <Stack
                  gap={16}
                  display={Boolean(forcePublish || formRef.current.hasChanges)}
                >
                  <Button
                    prefix={<IconUndo />}
                    shape="square"
                    keyboardShortcut="Cmd+Z"
                    variant="primary-transparent"
                    onClick={() => {
                      formRef.current.discard()
                      update()
                    }}
                  />
                  <Button
                    displayKeyboardShortcut
                    keyboardShortcut="Cmd+S"
                    onClick={() => {
                      return formRef.current.confirm()
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            ) : null
          }
        />
        {children}
        {React.createElement(Form, props)}
      </>
    )
  }

  return React.createElement(Form, props)
}
