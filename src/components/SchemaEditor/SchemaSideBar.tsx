import * as React from 'react'
import { Sidebar } from '../Sidebar/index.js'
import { AddType } from './Modals/AddType.js'

export const SchemaSideBar = ({ types, active, setActive }) => {
  console.log(types)

  const sidebarData = Object.keys(types)
    .sort((a, b) => a.localeCompare(b))
    .map((item, idx) => ({
      key: idx,
      label: item,
      value: item,
    }))

  return (
    <div>
      <AddType setActive={setActive} />
      <Sidebar
        value={active}
        onValueChange={(v) => setActive(v)}
        style={{ maxWidth: 212 }}
        data={sidebarData}
      ></Sidebar>
    </div>
  )
}
