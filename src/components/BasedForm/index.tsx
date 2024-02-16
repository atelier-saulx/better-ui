import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew, display } from '@based/schema'
import * as React from 'react'
import {
  Badge,
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
  IconPlus,
  IconCopy,
  IconId,
} from '../../index.js'
import { useLanguage } from '../../hooks/useLanguage/index.js'
import { SelectReferenceModal } from './SelectReferenceModal.js'
import { useBasedFormProps } from './useGeneratedProps.js'
import { BasedFormProps, BasedFormRef } from './types.js'
import { readInfoField } from '../Form/utils.js'

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
  updateEndpoint = 'db:set',
  fields,
  transformResults,
  onFileUpload,
  header,
  addItem,
  deleteItem,
  onClickReference,
  selectReferenceExplorerProps,
  children,
}: BasedFormProps): React.ReactNode {
  const client = useClient()
  const { open } = Modal.useModal()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema')
  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
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
  )

  const isReady = ref.current.currentFields && checksum

  const { data: values } = useQuery(
    isReady ? queryEndpoint : null,
    ref.current.currentQuery,
  )

  const [state, setState] = React.useState<{}>()

  // @ts-ignore
  const formRef = React.useRef<FormProps['formRef']['current']>({})

  if (!isReady) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
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
      await client.call(updateEndpoint, {
        $id: id,
        $language: language,
        ...based,
      })
    }
  } else if (addItem) {
    onFormChange = (values, changed, checksum, based) =>
      addItem({ values, changed, checksum, based, language })
  } else {
    onFormChange = () =>
      console.warn('No "id" and no "addItem" passed, ignore onChange')
  }

  const useHeader = header || addItem

  const props: FormProps & { key: any } = {
    key: id,
    variant,
    schema,
    values: (transformResults ? transformResults(values) : values) || state,
    fields: ref.current.currentFields,
    onChange: onFormChange,
    onFileUpload,
    onClickReference,
    // checksum,
    onChangeAtomic: () => {
      if (formRef.current.hasChanges) {
        update()
      }
    },
    formRef: useHeader ? formRef : null,
    onSelectReference: async ({ field }) => {
      const selectedReference = await open(({ close }) => (
        <SelectReferenceModal
          selectReferenceExplorerProps={selectReferenceExplorerProps}
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
          selectReferenceExplorerProps={selectReferenceExplorerProps}
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
  }

  if (useHeader) {
    return (
      <>
        <PageHeader
          style={{ marginBottom: 48 }}
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
            <Stack justify="start" gap={16}>
              <Badge
                copyValue={values?.id}
                color="neutral-muted"
                prefix={<IconId size={16} />}
              >
                {values?.id}
              </Badge>
              <Text variant="body-light">
                Updated{' '}
                {display(values?.updatedAt, {
                  type: 'timestamp',
                  display: 'human',
                })}
              </Text>
            </Stack>
          }
          suffix={
            <Stack gap={8}>
              <Button
                shape="square"
                variant="primary-transparent"
                // onClick={() => deleteItem({ id, type, ...state })}
              >
                <IconCopy />
              </Button>
              <Button
                shape="square"
                variant="primary-transparent"
                onClick={() => deleteItem({ id, type, ...state })}
              >
                <IconDelete />
              </Button>

              <Stack gap={16} display={formRef.current.hasChanges}>
                <Button
                  shape="square"
                  keyboardShortcut="Cmd+Z"
                  variant="primary-transparent"
                  onClick={() => {
                    formRef.current.discard()
                    update()
                  }}
                >
                  <IconUndo />
                </Button>
                <Button
                  displayKeyboardShortcut
                  keyboardShortcut="Cmd+S"
                  onClick={() => {
                    return formRef.current.confirm()
                  }}
                >
                  Publish
                </Button>
              </Stack>
            </Stack>
          }
        />
        {children}
        {React.createElement(Form, props)}
      </>
    )
  }

  return React.createElement(Form, props)
}

/*
{id
                ? deleteItem && (
                    <Button onClick={() => deleteItem({ id, type, ...state })}>
                      Delete
                    </Button>
                  )
                : addItem && (
                    <Button
                      disabled={!state}
                      onClick={() =>
                        addItem({ values: { type, ...state }, language })
                      }
                    >
                      Save
                    </Button>
                  )}
*/
