import * as React from 'react'
import { BasedExplorer, generateFromType, Modal, Sidebar } from '../../index.js'
import { useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import { OnOpenChangeContext } from '../Modal/index.js'

export type SelectReferenceModalProps = {
  onSelect: (reference: any) => void
  types?: string[]
}

export function SelectReferenceModal({
  onSelect,
  types,
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

  return (
    <Modal.Root
      open={true}
      onOpenChange={React.useContext(OnOpenChangeContext)}
    >
      <Modal.Overlay style={{ width: '85%', height: '85%' }}>
        <Modal.Title>
          Select {types && types.length === 1 ? types[0] : 'reference'}
        </Modal.Title>
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
                fields={
                  generateFromType(schema.types[activeSidebarItem]).fields
                }
                key={activeSidebarItem}
                onItemClick={(item) => {
                  onSelect(item)
                }}
                query={({ limit, offset, sort, language }) => ({
                  $language: language,
                  data: {
                    ...generateFromType(schema.types[activeSidebarItem]).query,
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
                        $traverse: 'children',
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
                totalQuery={{
                  total: {
                    $aggregate: {
                      $function: 'count',
                      $traverse: 'children',
                      $filter: [
                        {
                          $field: 'type',
                          $operator: '=',
                          $value: activeSidebarItem,
                        },
                      ],
                    },
                  },
                }}
              />
            )}
          </div>
        </Modal.Body>
      </Modal.Overlay>
    </Modal.Root>
  )
}
