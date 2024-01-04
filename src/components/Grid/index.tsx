import * as React from 'react'
import { Item } from './Item.js'
import { color } from '../../utils/colors.js'
import { FileDrop } from 'react-file-drop'

// TODO this component is a WIP, API will be changed to match the Table

export type GridProps = {
  onUpload?: (e) => void
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
  const newArr = [] as any
  const indexed = [] as any
  const unindexed = [] as any
  // for (const i in data) {
  //   const parents = data[i].parents.filter(
  //     (i) => i === 'root' || i.slice(0, 2) === 'di'
  //   )
  //   if (parents[0] === rootId) {
  //     // if (true) {
  //     newArr.push(data[i])
  //   }
  // }
  for (const i in data) {
    // if (newArr[i].index) {
    indexed.push(data[i])
    // } else {
    //   unindexed.push(newArr[i])
    // }
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
}: GridProps) {
  const dragOverItem = React.useRef<string>()
  const containerRef = React.useRef<any>()

  const [items, setItems] = React.useState(propsItems)

  const handleDrop = async (id) => {
    // setDragging(false)
    if (!dragOverItem.current || dragOverItem.current.length < 1) {
      return
    }
    const prefix = dragOverItem.current?.slice(0, 2)
    // if (prefix === 'di' && id !== dragOverItem.current) {
    if (false) {
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

        // for (const i in filteredItems) {
        //   items[i].index = i
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
    const items = [...container.childNodes]
    const otherItems = items.filter((_, i) => i !== index)

    const dragItem = items[index]

    const dragBoundingRect = dragItem.getBoundingClientRect()
    items.forEach((item) => {
      const { top, left } = item.getBoundingClientRect()
      item.style.top = top + 'px'
      item.style.left = left + 'px'
      item.style.position = 'aboslute'
    })

    dragItem.style.width = dragBoundingRect.width + 'px'
    dragItem.style.height = dragBoundingRect.height + 'px'
    dragItem.style.top = dragBoundingRect.top + 'px'
    dragItem.style.left = dragBoundingRect.left + 'px'
    dragItem.style.pointerevents = 'none'
    dragItem.style.cursor = 'grabbing'

    let x = e.clientX
    let y = e.clientY

    window.addEventListener('pointermove', dragMove)

    function dragMove(e) {
      // setSelected('')
      const posX = e.clientX - x
      const posY = e.clientY - y

      dragItem.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`

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
      onDrop={(files, event) => {
        console.log('dropped')
        for (const i in files) {
          onUpload(files[i])
        }
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gap: variant === 'column' ? 16 : 0,
          gridTemplateColumns: variant === 'column' ? 'repeat(3, 1fr)' : '1fr',
        }}
      >
        {/* <button onClick={() => console.log(filterFolder(items, 'root'))}>
        Item
      </button> */}
        {filterFolder(items, 'root').map((item, i) => (
          <span key={i} id={item.id} onPointerDown={(e) => dragStart(e, i)}>
            <Item item={item} variant={variant} itemAction={itemAction} />
          </span>
        ))}
      </div>
    </FileDrop>
  )
}
