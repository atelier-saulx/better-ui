import * as React from 'react'
import {
  BasedExplorer,
  BasedExplorerProps,
  generateFromType,
  Modal,
  Sidebar,
} from '../../index.js'
import { useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import { OnOpenChangeContext } from '../Modal/index.js'

export type SelectReferenceModalProps = {
  onSelect: (reference: any) => void
  types: string[]
  selectReferenceExplorerProps?:
    | (BasedExplorerProps & { itemQuery?: any })
    | ((p: {
        fields: any
        query: any
        types: string[]
      }) => BasedExplorerProps & { itemQuery?: any })
}

export function SelectReferenceModal({
  onSelect,
  types,
  selectReferenceExplorerProps,
}: SelectReferenceModalProps) {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(null)
  const { data: rawSchema } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
  }, [rawSchema])

  const sidebarItems = React.useMemo(() => {
    if (!schema) return []

    if (types) {
      const items = []

      for (const type of types) {
        items.push({ value: type, label: schema.types[type].title ?? type })
      }

      return items
    }

    return Object.keys(schema.types).map((key) => ({
      value: key,
      label: schema.types[key].title ?? key,
    }))
  }, [schema, types])

  React.useEffect(() => {
    if (types && types.length === 1) {
      setActiveSidebarItem(types[0])
    }
  }, [types, schema])

  if (!schema) return

  let { fields, query } = generateFromType(schema.types[activeSidebarItem])
  const props =
    typeof selectReferenceExplorerProps === 'function'
      ? selectReferenceExplorerProps({ fields, query, types })
      : selectReferenceExplorerProps

  if (props?.itemQuery) {
    query = props.itemQuery
  }

  return (
    <Modal.Root
      open={true}
      onOpenChange={React.useContext(OnOpenChangeContext)}
    >
      <Modal.Overlay style={{ width: '85%', height: '85%' }}>
        <Modal.Title>Select {types[0] || 'reference'}</Modal.Title>
        <Modal.Body style={{ padding: 0, display: 'flex' }}>
          {sidebarItems.length > 1 && (
            <Sidebar
              data={sidebarItems}
              value={activeSidebarItem}
              onValueChange={setActiveSidebarItem}
            />
          )}
          <div
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
            }}
          >
            {activeSidebarItem && (
              <BasedExplorer
                fields={fields}
                key={activeSidebarItem}
                onItemClick={(item) => {
                  onSelect(item)
                }}
                query={({ limit, offset, sort, language }) => ({
                  $language: language,
                  data: {
                    ...query,
                    $list: {
                      $limit: limit,
                      $offset: offset,
                      ...(sort && {
                        $sort: {
                          $field: sort.key,
                          $order: sort.dir,
                        },
                      }),
                      $find: {
                        $traverse: 'descendants',
                        $filter: [
                          {
                            $operator: '=',
                            $field: 'type',
                            $value: activeSidebarItem,
                          },
                        ],
                      },
                    },
                  },
                })}
                {...props}
              />
            )}
          </div>
        </Modal.Body>
      </Modal.Overlay>
    </Modal.Root>
  )
}
