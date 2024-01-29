import * as React from 'react'
import { styled } from 'inlines'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SYSTEM_FIELDS } from './constants.js'
import { SingleFieldContainer } from './SingleFieldContainer.js'
// import { useClient } from '@based/react'
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
    fieldKeys[i] = {
      [fieldKeys[i]]: {
        ...fields[fieldKeys[i]],
        index: i,
      },
    }
  }

  return [...fieldKeys]
}

export const SchemaFields = ({ fields, typeTitle }) => {
  // const client = useClient()

  console.log('incoming fields', fields)

  const [showSystemFields, setShowSystemFields] = React.useState(false)
  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))
  const [draggingField, setDraggingField] = React.useState<false>()

  React.useEffect(() => {
    setArray(parseFields(fields))
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
      const oldIndex = active.id.index
      const newIndex = over.id.index
      let tempArr = arrayMove(array, oldIndex, newIndex)

      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i][Object.keys(tempArr[i])[0]].index = i
      }

      setArray([...tempArr])
    }
  }

  ///  ONCONFIRM AFTER CHANGING THINGS AROUND
  // await client.call('db:set-schema', {
  //   mutate: true,
  //   schema: {
  //     types: {
  //       [typeTitle]: {
  //         fields: fields,
  //       },
  //     },
  //   },
  // })

  // console.log(array)

  return (
    <styled.div style={{ marginTop: 16 }}>
      <Stack>
        <CheckboxInput
          label="Show system fields"
          style={{ marginBottom: 24 }}
          value={showSystemFields}
          onChange={(v) => setShowSystemFields(v)}
        />
        <SchemaConfirm />
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
