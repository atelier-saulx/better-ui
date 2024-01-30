import * as React from 'react'
import { styled } from 'inlines'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SYSTEM_FIELDS } from './constants.js'
import { SingleFieldContainer } from './SingleFieldContainer.js'
import { useClient } from '@based/react'
import { color } from '../../utils/colors.js'
/// drag n drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  UniqueIdentifier,
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
import { Draggable } from './Draggable.js'

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
  if (!fields) return
  const indexedArray = [] as SchemaItem[]
  const type = fields
  //get all existing indexes
  const allCurrentIndexes = [] as number[]

  for (const i in type) {
    if (type[i].index) {
      allCurrentIndexes.push(type[i].index as number)
    } else {
      // else start at 0
      allCurrentIndexes.push(0)
    }
  }

  for (const i in type) {
    if (typeof type[i].index === 'number') {
      // @ts-ignore
      indexedArray.push({ [i]: { ...type[i], index: +type[i].index } })
    } else {
      // give an index
      let newIndex = Math.max(...allCurrentIndexes) + 1
      // @ts-ignore
      indexedArray.push({ [i]: { ...type[i], index: +newIndex } })
      allCurrentIndexes.push(newIndex)
    }
  }

  indexedArray.sort(
    (a, b) => a[Object.keys(a)[0]].index - b[Object.keys(b)[0]].index,
  )

  console.log('❤️‍🔥 index array ', indexedArray)

  return [...indexedArray]
}

export const SchemaFields = ({ fields, typeTitle }) => {
  const client = useClient()

  console.log('incoming fields ', fields)
  const overIdRef = React.useRef()

  const [showSystemFields, setShowSystemFields] = React.useState(false)
  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))
  const [draggingField, setDraggingField] = React.useState<
    UniqueIdentifier | false
  >()
  const [somethingChanged, setSomethingChanged] = React.useState(false)

  React.useEffect(() => {
    if (fields) {
      setArray(parseFields(fields))
    }
  }, [fields])

  const sensors = useSensors(
    // so you can still press buttons in the fields
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDragStart = React.useCallback(({ active }) => {
    setDraggingField(active.id)
    console.log(active.id, 'dragign vianld')
  }, [])

  console.log('ARRAY --> 🍏', array)

  const onDragEnd = (event) => {
    const { active, over } = event
    setDraggingField(false)

    setSomethingChanged(true)

    const oldIndex = array.indexOf(active.id as string)
    const newIndex = array.indexOf(over?.id as string)
    let tempArr = arrayMove(array, oldIndex, newIndex)

    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i][Object.keys(tempArr[i])[0]].index = i
    }

    setArray([...tempArr])
  }

  const onCancel = () => {
    // SET IT BACK TO THE OG FIELDS
    setArray(parseFields(fields))
    setSomethingChanged(false)
  }

  const onConfirm = async () => {
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
          {array
            .filter((item) =>
              showSystemFields
                ? item
                : !SYSTEM_FIELDS.includes(Object.keys(item)[0]),
            )
            .map((item, idx) => (
              <Draggable
                key={Object.keys(item)[0]}
                id={item}
                overIdRef={overIdRef}
              >
                <SingleFieldContainer
                  itemName={Object.keys(item)[0]}
                  item={item[Object.keys(item)[0]]}
                  typeTitle={typeTitle}
                  index={item[Object.keys(item)[0]]?.index}
                  isDragging={item[Object.keys(item)[0]] === draggingField}
                />
              </Draggable>
            ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {draggingField ? (
              <SingleFieldContainer
                isDragging
                itemName={Object.keys(draggingField)[0]}
                item={draggingField[Object.keys(draggingField)[0]]}
                typeTitle={typeTitle}
                style={{ backgroundColor: color('background', 'screen') }}
              />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </styled.div>
  )
}
