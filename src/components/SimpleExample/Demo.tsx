import React from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import { SortableItem } from './SortableItem.js'

export default function Demo1(): JSX.Element {
  const [items, setItems] = useState(['A', 'B', 'C'])
  function dragEndEvent(e: DragEndEvent) {
    const { over, active } = e
    setItems((items) => {
      return arrayMove(
        items,
        items.indexOf(active.id as string),
        items.indexOf(over?.id as string),
      )
    })
  }

  return (
    <div>
      <DndContext onDragEnd={dragEndEvent}>
        <SortableContext items={items}>
          {items.map((v) => (
            <SortableItem key={v} id={v} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
