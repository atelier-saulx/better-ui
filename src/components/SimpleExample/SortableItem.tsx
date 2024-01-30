import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  id: string
}
export const SortableItem: FC<SortableItemProps> = ({ id }) => {
  const { setNodeRef, listeners, transform, transition } = useSortable({ id })

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid red',
    marginTop: '10px',
  }
  return (
    <div ref={setNodeRef} {...listeners} style={styles}>
      {JSON.stringify(id)}
    </div>
  )
}
