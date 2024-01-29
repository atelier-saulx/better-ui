import * as React from 'react'
import { styled } from 'inlines'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SYSTEM_FIELDS } from './constants.js'
import { SingleFieldContainer } from './SingleFieldContainer.js'
import { useClient } from '@based/react'
/// drag n drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Stack } from '../Stack/index.js'
import { SchemaConfirm } from './SchemaConfirm.js'

type SchemaItem = {
  name: string
  type: string
  description?: string
  meta: any
  // id: string
  label: string
  index?: number
  properties: {}
  format?: string
  items?: { type: string }
}
type unindexedSchemaItem = Omit<SchemaItem, 'index'>

// for indexing items for drag drop
const parseFields = (fields) => {
  const fieldKeys = Object.keys(fields) as any
  if (!fields) return

  for (let i = 0; i < fieldKeys.length; i++) {
    console.log('🍿', fields[fieldKeys[i]])

    if (fields[fieldKeys[i]].hasOwnProperty('index')) {
      console.log('got index bitch')
      fieldKeys[i] = {
        [fieldKeys[i]]: {
          ...fields[fieldKeys[i]],
          //  index: i,
        },
      }
    } else {
      fieldKeys[i] = {
        [fieldKeys[i]]: {
          ...fields[fieldKeys[i]],
          index: i,
        },
      }
    }
  }

  let sortArr = new Array(fieldKeys.length).fill({})

  for (let i = 0; i < fieldKeys.length; i++) {
    sortArr[fieldKeys[i][Object.keys(fieldKeys[i])[0]].index] = fieldKeys[i]
  }

  console.log('-> fieldKeys -SORTED????-', sortArr)

  return [...sortArr]
}

export const SchemaFields = ({ fields, typeTitle }) => {
  const client = useClient()

  console.log('incoming fields', fields)

  const [showSystemFields, setShowSystemFields] = React.useState(false)
  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))
  const [draggingField, setDraggingField] = React.useState<false>()
  const [somethingChanged, setSomethingChanged] = React.useState(false)

  React.useEffect(() => {
    if (fields) {
      setArray(parseFields(fields))
    }
  }, [fields])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDragStart = React.useCallback(({ active }) => {
    setDraggingField(active.id)
  }, [])

  const onDragEnd = (event) => {
    const { active, over } = event
    setDraggingField(false)

    if (active.id.index !== over.id.index) {
      setSomethingChanged(true)

      const oldIndex = active.id.index
      const newIndex = over.id.index
      let tempArr = arrayMove(array, oldIndex, newIndex)

      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i][Object.keys(tempArr[i])[0]].index = i
      }

      setArray([...tempArr])
    }
  }

  const onCancel = () => {
    // SET IT BACK TO THE OG FIELDS
    setArray(parseFields(fields))
    setSomethingChanged(false)
  }

  const onConfirm = async () => {
    console.log('le Confirmative 🧋')

    let newFields = Object.assign(
      {},
      ...array.map((item) => ({
        [Object.keys(item)[0]]: item[Object.keys(item)[0]],
      })),
    )

    console.log('newFields 🥟', newFields)

    // SET THE SCHEMA IF ALL IS WELL
    await client.call('db:set-schema', {
      mutate: true,
      schema: {
        types: {
          [typeTitle]: {
            fields: newFields,
          },
        },
      },
    })

    setSomethingChanged(false)
  }

  return (
    <styled.div style={{ marginTop: 16 }}>
      <Stack>
        <CheckboxInput
          label="Show system fields"
          style={{ marginBottom: 24 }}
          value={showSystemFields}
          onChange={(v) => setShowSystemFields(v)}
        />
        <styled.div style={{ marginBottom: 24 }}>
          <SchemaConfirm
            onCancel={onCancel}
            onConfirm={onConfirm}
            hasChanges={somethingChanged}
          />
        </styled.div>
      </Stack>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext items={array} strategy={verticalListSortingStrategy}>
          {fields &&
            array
              .filter((item) =>
                showSystemFields
                  ? item
                  : !SYSTEM_FIELDS.includes(Object.keys(item)[0]),
              )
              .map((item, idx) => {
                return (
                  <SingleFieldContainer
                    itemName={Object.keys(item)[0]}
                    item={item[Object.keys(item)[0]]}
                    typeTitle={typeTitle}
                    key={idx}
                    index={item[Object.keys(item)[0]]?.index}
                    isDragging={
                      // @ts-ignore
                      item[Object.keys(item)[0]]?.index === draggingField?.index
                    }
                  />
                )
              })}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {draggingField ? (
              <SingleFieldContainer
                isDragging
                itemName={'DRAGGING'}
                item={draggingField}
                typeTitle={typeTitle}
              />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </styled.div>
  )
}
