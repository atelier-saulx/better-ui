export type Item = {
  title: string
  description?: string
  renderAs: 'folder' | 'file' | 'image' | React.ReactNode
  [key: string]: any
}

export type GridProps = {
  variant?: 'row' | 'column'
  sortable?: boolean
  // fires on change
  onChange?: (value: Item[]) => void
  items: Item[]
  itemAction?: (item: Item) => React.ReactNode
  onItemClick?: (item: Item) => void
  onDrop?: (dropTarget: Item, dragTarget: Item) => Promise<boolean>
  onDragOverOpen?: (dropTarget: Item, dragTarget: Item) => Promise<boolean>
}
