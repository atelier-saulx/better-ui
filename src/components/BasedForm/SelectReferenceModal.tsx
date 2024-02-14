import * as React from 'react'
import { BasedExplorer, Modal, Sidebar } from '../../index.js'
import { useQuery } from '@based/react'
import { convertOldToNew } from '@based/schema'

export type SelectReferenceModalProps = {
  onSelect: (reference: any) => void
}

export function SelectReferenceModal({ onSelect }: SelectReferenceModalProps) {
  const [activeSidebarItem, setActiveSidebarItem] = React.useState(null)
  const { data: rawSchema } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return

    return convertOldToNew(rawSchema)
  }, [rawSchema])

  const sidebarItems = React.useMemo(() => {
    if (!schema) return []

    return Object.keys(schema.types).map((key) => ({
      value: key,
      label: schema.types[key].title ?? key,
    }))
  }, [schema])

  if (!schema) return

  return (
    <Modal.Root open={true}>
      <Modal.Overlay style={{ width: '85%', height: '85%' }}>
        <Modal.Title>Select reference</Modal.Title>
        <Modal.Body style={{ padding: 0, display: 'flex' }}>
          <Sidebar
            data={sidebarItems}
            value={activeSidebarItem}
            onValueChange={setActiveSidebarItem}
          />
          <div
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
            }}
          >
            {activeSidebarItem && (
              <BasedExplorer
                key={activeSidebarItem}
                onItemClick={(item) => {
                  onSelect(item)
                }}
                query={({ limit, offset, sort }) => ({
                  data: {
                    $all: true,
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
