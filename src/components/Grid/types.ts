export type Item = {
  title: string
  description?: string
  renderAs: 'folder' | 'file' | 'image'
  [key: string]: any
}

export type GridProps = {
  variant?: 'row' | 'column'
  sortable?: boolean
  onChange?: (value: (Item | React.ReactNode)[]) => void
  items: (Item | React.ReactNode)[]
  itemAction?: (item: any) => React.ReactNode
}
