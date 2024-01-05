import * as React from 'react'
import { Item } from './Item.js'
import { borderRadius, color } from '../../utils/colors.js'
import { FileDrop } from 'react-file-drop'
import { Stack } from '../Stack/index.js'

// TODO this component is a WIP, API will be changed to match the Table

export type GridProps = {
  onUpload?: (v) => void
  onMove?: (v) => void
  variant?: 'row' | 'column'
  items: {
    id: string
    index?: number
    title: string
    description?: string
    renderAs: 'folder' | 'file' | 'image'
    [key: string]: any
  }[]
  itemAction?: (item: any) => React.ReactNode
}

const filterFolder = (data, rootId) => {
  if (data?.length < 1) return
  const indexed = [] as any
  const unindexed = [] as any
  const newArr = [] as any

  for (const i in data) {
    if (!data[i].parents) {
      newArr.push(data[i])
    }
    // else {
    //   const parents = data[i].parents.filter(
    //     (i) => i === 'root' || i.slice(0, 2) === 'di'
    //   )
    //   if (parents[0] === rootId) {
    //     // if (true) {
    //     newArr.push(data[i])
    //   }
    // }
  }

  for (const i in newArr) {
    if (newArr[i].index) {
      indexed.push(newArr[i])
    } else {
      unindexed.push(newArr[i])
    }
  }

  indexed.sort(function (a, b) {
    return a.index - b.index
  })

  return [...indexed, ...unindexed]
}

export function Grid({
  variant = 'column',
  items: propsItems,
  itemAction,
  onUpload,
  onMove,
}: GridProps) {
  const dragOverItem = React.useRef<string>()
  const containerRef = React.useRef<any>()

  const [dragOver, setDragOver] = React.useState(false)
  const [items, setItems] = React.useState(propsItems)
  const [selected, setSelected] = React.useState('')

  const handleDrop = async (id) => {
    // setDragging(false)
    if (!dragOverItem.current || dragOverItem.current.length < 1) {
      return
    }
    const prefix = dragOverItem.current?.slice(0, 2)
    // if (prefix === 'di' && id !== dragOverItem.current) {
    if (false) {
      //PUT IT INSIDE FOLDER HERE
      // await client
      //   .query('db', {
      //     $id: dragOverItem.current,
      //     children: true,
      //   })
      //   .get()
      //   .then(
      //     async (res) =>
      //       await client.call('db:set', {
      //         $id: dragOverItem.current,
      //         children: [...res.children, id],
      //       })
      //   )
      //   .catch((e) => console.log('error', e))
    } else {
      if (id !== dragOverItem.current) {
        const filteredItems = filterFolder(items, 'root') as any

        const activeIndex = filteredItems?.findIndex(
          (item) => item.id === id
        ) as number

        const overIndex =
          dragOverItem.current !== 'last'
            ? (filteredItems?.findIndex(
                (item) => item.id === dragOverItem.current
              ) as number)
            : filteredItems.length

        const activeItem = filteredItems[activeIndex]

        if (activeIndex > overIndex) {
          filteredItems.splice(overIndex, 0, activeItem)
          filteredItems.splice(activeIndex + 1, 1)
        } else if (activeIndex < overIndex) {
          filteredItems.splice(activeIndex, 1)
          filteredItems.splice(overIndex, 0, activeItem)
        }

        for (const i in filteredItems) {
          filteredItems[i].index = i
        }

        setItems(filteredItems)

        onMove(filteredItems)

        // for (const i in filteredItems) {
        //   // items[i].index = i
        //   // client.call('db:set', {
        //   //   $id: filteredItems[i].id,
        //   //   //temporder should be index type instead but for some reason this doenst want to cooperate if its a string???
        //   //   tempOrder: filteredItems[i].tempOrder,
        //   // })
        // }
      }
    }
    dragOverItem.current = ''
  }

  const dragStart = (e, index) => {
    if (e.button !== 0) return
    const container = containerRef.current

    const containerItems = [...container.childNodes]
    const otherItems = containerItems.filter((_, i) => i !== index)

    const dragItem = containerItems[index]
    const clone = dragItem.cloneNode(true)
    clone.id = 'clone'
    dragItem.after(clone)

    const dragBoundingRect = dragItem.getBoundingClientRect()

    clone.style.opacity = 0.4
    dragItem.style.width = dragBoundingRect.width + 'px'
    dragItem.style.height = dragBoundingRect.height + 'px'
    dragItem.style.top = dragBoundingRect.top + 'px'
    dragItem.style.left = dragBoundingRect.left + 'px'
    dragItem.style.position = 'fixed'
    dragItem.style.pointerevents = 'none'
    dragItem.style.cursor = 'grabbing'

    let x = e.clientX
    let y = e.clientY

    window.addEventListener('pointermove', dragMove)

    function dragMove(e) {
      const posX = e.clientX - x
      const posY = e.clientY - y

      if (variant === 'column') {
        dragItem.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
      } else {
        dragItem.style.transform = `translate3d(0px, ${posY}px, 0px)`
      }

      for (const item of otherItems) {
        const upper = dragItem.getBoundingClientRect()
        const over = item.getBoundingClientRect()

        let collision =
          item.id !== 'last'
            ? upper.y < over.y + over.height / 2 &&
              upper.y + upper.height / 2 > over.y &&
              upper.x < over.x + over.width / 2 &&
              upper.x + upper.width / 2 > over.x
            : upper.y < over.y + over.height / 2 &&
              upper.y + upper.height / 2 > over.y &&
              upper.x < over.x + over.width &&
              upper.x + upper.width > over.x

        if (collision) {
          if (item.id !== 'last') {
            item.childNodes[0].style.background = color(
              'interactive',
              'secondary-hover'
            )
          }
          dragOverItem.current = item.id
          break
        } else {
          item.childNodes[0].style.background = color('background', 'screen')
          dragOverItem.current = ''
        }
      }
    }

    window.addEventListener('pointerup', dragEnd)

    function dragEnd() {
      console.log('nopeee ended')
      clone.remove()
      window.removeEventListener('pointerup', dragEnd)
      window.removeEventListener('pointermove', dragMove)

      // document.onpointerup = null
      document.onpointermove = null
      otherItems.forEach((item) => {
        item.childNodes[0].style.background = color('background', 'screen')
      })
      // otherItems.forEach((item) => {
      //   item.style.background = ''
      // })
      dragItem.style = ''

      dragItem.style.cursor = 'pointer'
      handleDrop(dragItem.id)
    }
  }

  return (
    <FileDrop
      onDrop={(files) => {
        for (const i in files) {
          onUpload(files[i])
        }
      }}
      onDragOver={() => {
        setDragOver(true)
      }}
      onDragLeave={() => {
        setDragOver(false)
      }}
    >
      <div
        ref={containerRef}
        // display="grid"
        // gap={variant === 'column' ? 16 : 0}
        // grid={variant === 'column' ? 200 : true}
        style={{
          padding: 20,
          borderRadius: borderRadius('small'),
          backgroundColor: dragOver
            ? color('background', 'neutral')
            : color('background', 'screen'),
          display: 'grid',
          gap: variant === 'column' ? 16 : 0,
          gridTemplateColumns: variant === 'column' ? 'repeat(3, 1fr)' : '1fr',
        }}
      >
        {filterFolder(items, 'root').map((item, i) => (
          <span
            key={i}
            id={item.id}
            onPointerDown={(e) => dragStart(e, i)}
            style={{ cursor: 'pointer' }}
          >
            <Item
              item={item}
              variant={variant}
              itemAction={itemAction}
              setSelected={setSelected}
            />
          </span>
        ))}
      </div>
    </FileDrop>
  )
}
