import * as React from 'react'
import { Sidebar, SidebarItem } from '../Sidebar/index.js'
import { AddType } from './Modals/AddType.js'

export const SchemaSideBar = ({ types, active, setActive }) => {
  return (
    <div>
      <Sidebar value={active} onChange={setActive} style={{ maxWidth: 212 }}>
        <AddType />
        {Object.keys(types)
          .sort((a, b) => a.localeCompare(b))
          .map((item, idx) => (
            <SidebarItem key={idx} value={item}>
              {item}
            </SidebarItem>
          ))}
      </Sidebar>
    </div>
  )
}
