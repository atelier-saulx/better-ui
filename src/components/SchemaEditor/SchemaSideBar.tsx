import * as React from 'react'
import { Sidebar, SidebarItem } from '../Sidebar/index.js'
import { AddType } from './Modals/AddType.js'

export const SchemaSideBar = ({ types }) => {
  const [active, setActive] = React.useState('birds')

  return (
    <div>
      <Sidebar value={active} onChange={setActive} style={{ maxWidth: 212 }}>
        <AddType />
        {Object.keys(types).map((item, idx) => (
          <SidebarItem key={idx} value={item}>
            {item}
          </SidebarItem>
        ))}
      </Sidebar>
    </div>
  )
}
