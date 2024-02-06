import * as React from 'react'
import { Text } from '../../Text/index.js'
import { Stack } from '../../Stack/index.js'
import { Button } from '../../Button/index.js'
import { border } from '../../../utils/colors.js'
import { Modal } from '../../Modal/index.js'
import { GeneralOptions } from './GeneralOptions.js'
import { SpecificOptions } from './SpecificOptions.js'

type AddFieldProps = {
  fieldType: string
  typeTitle: string
  onConfirm?: (v: any) => void
  editItem?: any
  itemName?: string
  path?: string[]
  setSchema?: ({}) => void
  schema?: any
  setSomethingChanged?: (v: boolean) => boolean
}

const metaReducer = (state, action) => {
  if (action.type === 'prune') {
    const newMeta = Object.fromEntries(
      Object.entries(state).filter(([_, v]) => v != false),
    )
    return newMeta
  } else {
    return {
      ...state,
      [action.field]: action.value,
    }
  }
}

export const AddField = ({
  fieldType,
  typeTitle,
  onConfirm,
  editItem,
  itemName = '',
  path,
  setSchema,
  schema,
  setSomethingChanged,
}: AddFieldProps) => {
  const [meta, setMeta] = React.useReducer(metaReducer, editItem || {})
  const [fieldName, setFieldName] = React.useState(itemName)
  const [tabIndex, setTabIndex] = React.useState(1)
  // for arrays
  const [items, setItems] = React.useState(
    editItem ? { [itemName]: { ...editItem } } : { type: 'string' },
  )

  // console.log('🚙', fieldType, typeTitle, editItem, path, itemName)

  // const { data } = useQuery('db:schema')
  // const { types, rootType } = data

  React.useEffect(() => {
    console.log('did something changed in the meta:', meta)
  }, [meta])

  return (
    <Modal
      confirmLabel={editItem ? 'Edit' : 'Add Field'}
      confirmProps={{ disabled: !fieldName || fieldName.length < 3 }}
      onConfirm={async () => {
        // options // type // children // path = path
        let type = typeTitle
        let field = fieldName
        fieldType = fieldType.toLowerCase()

        const currentFields = schema.types[type].fields

        /// 3 OPTIONS ,
        //// 1. SETTING A FIELD,
        //// 2. SETTING A NESTED FIELD
        //// 3. EDITING A NESTED FIELD

        const fields = {}
        let from = currentFields
        let dest = fields
        let i = 0
        //// 3. EDITING A NESTED FIELD
        const l = editItem && path.length > 1 ? path.length - 1 : path?.length

        while (i < l) {
          const key = path[i++]
          dest[key] = { ...from[key] }
          dest = dest[key]
          // @ts-ignore TODO: fix
          from = from[key]
        }

        if (path?.length > 1) {
          // 2. SETTING NESTED FIELDS
          console.log(fields, '🆚 NESTED ??')

          let lastFieldNameKey =
            fieldName.split('.')[fieldName.split('.').length - 1]

          if (fieldType === 'array' || fieldType === 'set') {
            dest[lastFieldNameKey] = {
              ...from[field],
              ...meta,
              type: fieldType,
              items: items,
            }
          } else if (fieldType === 'object') {
            dest[lastFieldNameKey] = {
              ...from[field],
              ...meta,
              type: fieldType,
              properties: {},
            }
          } else if (fieldType === 'record') {
            dest[lastFieldNameKey] = {
              ...from[field],
              ...meta,
              type: fieldType,
              values: [],
            }
          } else {
            dest[lastFieldNameKey] = {
              ...from[field],
              ...meta,
              type: fieldType,
            }
          }
        } else {
          // 1 SETTING A FIELDS
          // first add all meta options
          if (fieldType === 'rich text') {
            fields[field] = { type: 'json', format: 'rich-text', ...meta }
          } else {
            fields[field] = { type: fieldType, ...meta }
          }

          if (fieldType === 'record') {
            fields[field] = { values: [], ...fields[field] }
          } else if (fieldType === 'object') {
            fields[field] = { properties: {}, ...fields[field] }
          } else if (fieldType === 'array' || fieldType === 'set') {
            fields[field] = { items: items, ...fields[field] }
          }
        }

        // console.log(fields, 'NEW FIELDS?? 🦞', schema)

        // update schema 🐠
        schema.types[type].fields = {
          ...schema.types[type].fields,
          ...fields,
        }

        setSomethingChanged(true)

        onConfirm(meta)
      }}
    >
      <Text variant="title-modal">{fieldType}</Text>
      <Stack
        style={{
          justifyContent: 'flex-start',
          margin: '12px 0px',
          marginBottom: 20,
        }}
        gap={16}
      >
        <Button
          style={{
            borderRadius: 0,
            paddingBottom: 12,
            borderBottom:
              tabIndex !== 1 ? '3px solid transparent' : border('focus', 3),
            '&:hover': {
              background: 'transparent',
              borderBottom:
                tabIndex !== 1 ? border('hover', 3) : border('focus', 3),
            },
          }}
          variant={'neutral-transparent'}
          onClick={() => setTabIndex(1)}
        >
          General
        </Button>
        {fieldType.toLowerCase() !== 'boolean' &&
        fieldType.toLowerCase() !== 'cardinality' &&
        fieldType.toLowerCase() !== 'enum' &&
        fieldType.toLowerCase() !== 'json' ? (
          <Button
            style={{
              borderRadius: 0,
              paddingBottom: 12,
              borderBottom:
                tabIndex !== 2 ? '3px solid transparent' : border('focus', 3),
              '&:hover': {
                background: 'transparent',
                borderBottom:
                  tabIndex !== 2 ? border('hover', 3) : border('focus', 3),
              },
            }}
            variant={'neutral-transparent'}
            onClick={() => setTabIndex(2)}
          >
            Settings
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      {tabIndex === 1 && (
        <GeneralOptions
          meta={meta}
          setMeta={setMeta}
          editItem={editItem}
          fieldName={fieldName}
          setFieldName={setFieldName}
        />
      )}
      {tabIndex === 2 && (
        <SpecificOptions
          fieldType={fieldType.toLowerCase()}
          meta={meta}
          setMeta={setMeta}
          setItems={setItems}
          items={items}
        />
      )}
    </Modal>
  )
}
