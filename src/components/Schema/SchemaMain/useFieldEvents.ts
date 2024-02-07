import { useCallback, useState, RefObject } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { getObjectId } from './utils.js'
import { Modal } from '../../Modal/index.js'
import { sortAndFlatten, filteredFields } from '../fieldParsers.js'
import { UniqueIdentifier, DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { TypeSchema } from '../constants.js'

export const useFieldsEvents = (
  includeSystemFields: boolean,
  overIdRef: RefObject<UniqueIdentifier>,
  typeDef: TypeSchema,
  onChange: (v: any) => void,
): {
  onDragStart: (e: DragStartEvent) => void
  toggleExpand: (field: string) => void
  onDragEnd: (e: DragEndEvent) => void
  draggingField: UniqueIdentifier | false
  properties: { [key: string]: any }
  collapsed: Set<string>
  objects: any
  filtered: string[]
} => {
  const sortedFields = sortAndFlatten(typeDef.fields)
  const [draggingField, setDraggingField] = useState<UniqueIdentifier | false>()
  const [collapsed = new Set(), setCollapsed] = useState<Set<string>>()
  const [field] = useContextState('field', [])

  const fields = typeDef.fields

  const { filtered, properties, objects } = filteredFields(
    typeDef,
    includeSystemFields,
    draggingField,
    collapsed,
    field,
  )

  const { confirm } = Modal.useModal()

  const onDragStart = useCallback(({ active }: DragStartEvent) => {
    setDraggingField(active.id)
  }, [])

  const toggleExpand = useCallback(
    (field: string) => {
      if (collapsed.has(field)) {
        collapsed.delete(field)
      } else {
        collapsed.add(field)
      }
      setCollapsed(new Set(collapsed))
    },
    [collapsed],
  )

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    setDraggingField(null)
    if (active.id !== over.id) {
      const activePath =
        typeof active.id === 'string' ? active.id.split('.') : []
      const overObject = getObjectId(overIdRef.current, properties, objects)

      let overPath: any[]

      if (overObject) {
        const { type } = objects[overObject]
        overPath = overObject.split('.')
        if (type === 'array') {
          overPath.push('items')
        } else if (type === 'record') {
          overPath.push('values')
        }
        overPath.push('properties', '$$stub$$')
      } else {
        overPath = typeof over.id === 'string' ? over.id.split('.') : []
      }

      let revert
      if (activePath.length !== overPath.length) {
        const activeKey = activePath[activePath.length - 1]
        // @ts-ignore
        const activeField: any = activePath.reduce(
          // @ts-ignore
          (fields, key) => fields[key],
          fields,
        )

        const overFields = overPath
          .slice(0, -1)
          .reduce((fields, key) => fields[key], fields)

        if (activeKey in overFields) {
          console.error('Already has field!', activeKey, overFields)
        } else {
          overFields[activeKey] = { ...activeField }
          activeField.$delete = true
          revert = () => {
            delete overFields[activeKey]
            delete activeField.$delete
          }
        }
      }

      const resortedFields = arrayMove(
        sortedFields,
        sortedFields.indexOf(active.id as string),
        sortedFields.indexOf(over.id as string),
      )

      const setIndex = (field, index) => {
        const path = field.split('.')
        const targetFields = path.reduce((fields, key) => fields[key], fields)
        if ('index' in targetFields) {
          targetFields.index = index
        } else {
          targetFields.index = { index }
        }
      }

      resortedFields.forEach(setIndex)

      if (revert) {
        const ok = await confirm(
          'Beware, you are moving a field in or out of an object',
          'Are you sure? This will update the schema and all related data',
        )

        if (!ok) {
          sortedFields.forEach(setIndex)
          revert()
          setDraggingField(false) // force an update
          return
        }
      }

      onChange(fields)
    }
  }

  return {
    onDragStart,
    toggleExpand,
    onDragEnd,
    filtered,
    draggingField,
    properties,
    collapsed,
    objects,
  }
}
