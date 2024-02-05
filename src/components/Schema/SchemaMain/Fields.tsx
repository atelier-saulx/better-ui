import React, { useRef, FC } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Draggable } from './Draggable.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Field } from './Field.js'
import { TypeSchema } from '../constants.js'
import { useFieldsEvents } from './useFieldEvents.js'

export const Fields: FC<{
  includeSystemFields: boolean
  onChange: (v: any) => void
  schema: any
  setSchema?: () => void
  setSomethingChanged?: (v: boolean) => void
}> = ({
  includeSystemFields,
  onChange,
  schema,
  setSchema,
  setSomethingChanged,
}) => {
  const [type] = useContextState('type', '')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const overIdRef = useRef()

  if (!type) {
    return null
  }

  const typeDef: TypeSchema =
    type === 'root' ? schema.rootType : schema.types[type] || { fields: {} }

  const {
    onDragStart,
    toggleExpand,
    onDragEnd,
    filtered,
    draggingField,
    properties,
    collapsed,
    objects,
  } = useFieldsEvents(includeSystemFields, overIdRef, typeDef, onChange)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={filtered} strategy={verticalListSortingStrategy}>
        {filtered.map((field) => {
          return (
            <Draggable
              key={field}
              id={field}
              properties={properties}
              objects={objects}
              overIdRef={overIdRef}
            >
              <Field
                type={type}
                field={field}
                fields={typeDef.fields}
                isDragging={field === draggingField}
                toggleExpand={toggleExpand}
                collapsed={collapsed.has(field)}
                schema={schema}
                setSchema={setSchema}
                setSomethingChanged={setSomethingChanged}
              />
            </Draggable>
          )
        })}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {draggingField ? (
            <Field
              isDragging
              type={type}
              field={draggingField}
              fields={typeDef.fields}
              schema={schema}
              setSchema={setSchema}
              setSomethingChanged={setSomethingChanged}
            />
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
