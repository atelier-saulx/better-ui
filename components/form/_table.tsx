// import React, { ReactNode, useState } from 'react'
// import { styled, Style } from 'inlines'
// import { Button } from '../button'
// import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
// import { Plus, Close, DragDropHorizontal } from '../icons'
// import { border, color } from '../../utils/vars'
// import { Stack } from '../layout'
// import { FileInput } from '../file-input'
// import { FormObject } from './object'
// import { FormRecord } from './record'
// import { Cell } from './Table/Cell'
// import { StringInput } from './Table/StringInput'

// // no remove row

// type TableProps = {
//   colls: string[]
//   path?: string[]
//   nested?: boolean
//   rows: any[]
//   orginalField?: BasedSchemaFieldObject
//   onNew?: () => void
//   field: BasedSchemaField
//   onRemove?: (index: number) => void
//   order?: boolean // drag and drop
//   style?: Style
// }

// function Row({
//   field,
//   value,
//   orginalField,
//   nested,
//   noBorder,
//   order,
//   index,
//   path,
// }: {
//   nested?: boolean
//   field: BasedSchemaField
//   value: any
//   orginalField?: BasedSchemaFieldObject
//   noBorder?: boolean
//   order?: boolean
//   index: number
//   path?: string[]
// }) {
//   let body: ReactNode
//   let multi: ReactNode[] = []
//   let noIcon = false
//   let noBody = false

//   const [drag, setDrag] = useState(false)
//   const [dragOver, setDragOver] = useState(false)

//   if (field.type === 'object') {
//     body = Object.keys(field.properties).map((key, index) => {
//       const { readOnly } = field.properties[key]

//       let propsField = field.properties[key]
//       const isValue = key === '$value'

//       if (orginalField && key !== '$key') {
//         propsField = orginalField.properties[isValue ? value.$key : key]
//       }

//       if (propsField.type === 'object') {
//         noIcon = true

//         // let label: string | undefined

//         // const k = isValue ? value.$key : key
//         // const p = path ? [...path, k] : [k]

//         // if (isValue) {
//         //   noBody = true
//         //   label = p[p.length - 1]
//         // }

//         // multi.push(
//         //   <FormObject
//         //     nested
//         //     label={label}
//         //     key={key}
//         //     path={p}
//         //     variant="minimal"
//         //     fieldKey={key}
//         //     field={propsField}
//         //     values={value}
//         //   />
//         // )
//         return (
//           <FormObject
//             nested
//             // label={label}
//             key={key}
//             // path={p}
//             variant="minimal"
//             fieldKey={key}
//             field={propsField}
//             values={value.$value}
//           />
//         )
//       }

//       if (propsField.type === 'record') {
//         noIcon = true

//         return (
//           <FormRecord
//             key={key}
//             nested
//             variant="minimal"
//             fieldKey={key}
//             field={propsField}
//             values={isValue ? value.$value : value}
//           />
//         )
//       }

//       if (propsField.type === 'string' && propsField.contentMediaType) {
//         return (
//           <Cell index={index} key={key}>
//             <FileInput
//               variant="minimal"
//               mimeType={propsField.contentMediaType}
//               // make this better
//               value={
//                 isValue
//                   ? value.$value
//                     ? { src: value.$value }
//                     : undefined
//                   : value?.[key]
//                   ? { src: value?.[key] }
//                   : undefined
//               }
//               onChange={(file) => {
//                 console.log('uploaded file', file)
//               }}
//             />
//           </Cell>
//         )
//       }

//       // nested={nested}
//       return (
//         <Cell isKey={key === '$key'} index={index} key={key}>
//           {readOnly ? (
//             value?.[key]
//           ) : (
//             <StringInput
//               style={{ marginLeft: -10 }}
//               key={index}
//               value={value?.[key]}
//             />
//           )}
//         </Cell>
//       )
//     })
//   }
//   // ----------

//   if (field.type === 'string' && field.contentMediaType) {
//     body = (
//       <styled.div style={{ paddingLeft: 12, paddingRight: 10, width: '100%' }}>
//         <FileInput
//           variant="minimal"
//           mimeType={field.contentMediaType}
//           value={value ? { src: value } : undefined}
//           onChange={(file) => {
//             console.log('uploaded file', file)
//           }}
//         />
//       </styled.div>
//     )
//   } else if (field.type === 'string') {
//     body = (
//       <styled.div style={{ paddingRight: 10, width: '100%' }}>
//         <StringInput value={value} />
//       </styled.div>
//     )
//   }

//   if (noIcon) {
//     return (
//       <>
//         <Stack
//           align="start"
//           justify="start"
//           style={{
//             minHeight: 48,
//             borderBottom: border(),
//           }}
//         >
//           {body}
//         </Stack>
//         {multi}
//       </>
//     )
//   }

//   return (
//     <>
//       {noBody ? null : (
//         <Stack
//           draggable={drag}
//           onDragStart={
//             order
//               ? (e: any) => {
//                   e.dataTransfer.setData('Text', index)
//                 }
//               : undefined
//           }
//           onDrop={
//             order
//               ? (e: any) => {
//                   e.preventDefault()
//                   const data = e.dataTransfer.getData('Text')
//                   console.info(data)
//                   setDragOver(false)
//                 }
//               : undefined
//           }
//           onDragOver={
//             order
//               ? () => {
//                   setDragOver(true)
//                 }
//               : undefined
//           }
//           onDragLeave={
//             order
//               ? () => {
//                   setDragOver(false)
//                 }
//               : undefined
//           }
//           onDragEnd={
//             order
//               ? () => {
//                   setDrag(false)
//                 }
//               : undefined
//           }
//           align="center"
//           style={{
//             background: color('background', 'screen'),
//             minHeight: 48,
//             borderBottom: dragOver
//               ? border('focus', 2)
//               : noBorder
//               ? undefined
//               : border(),
//             '*': {
//               pointerEvents: dragOver ? 'none' : undefined,
//             },
//             '>:last-child': {
//               opacity: 0,
//             },
//             '&:hover >:last-child': {
//               opacity: 1,
//             },
//           }}
//         >
//           {order ? (
//             <styled.div
//               style={{
//                 cursor: 'grab',
//                 transition: 'opacity 0.1s',
//                 color: color('content', 'secondary'),
//                 opacity: 0.75,
//                 '&:hover': {
//                   opacity: '1',
//                 },
//               }}
//               onMouseDown={() => {
//                 setDrag(true)
//               }}
//               onMouseUp={() => {
//                 setDrag(false)
//               }}
//             >
//               <DragDropHorizontal />
//             </styled.div>
//           ) : null}
//           {body}
//           <styled.div
//             style={{
//               transition: 'opacity 0.1s',
//             }}
//           >
//             <Close style={{ opacity: drag ? 0 : 1 }} />
//           </styled.div>
//         </Stack>
//       )}
//       {multi}
//     </>
//   )
// }

// export function Table({
//   colls,
//   rows,
//   field,
//   order,
//   onNew,
//   onRemove,
//   orginalField,
//   style,
//   path,
//   nested,
// }: TableProps) {
//   const [dragOver, setDragOver] = useState(false)

//   let header = null
//   const isObject = colls.length
//   if (isObject) {
//     const hasKey = field.type === 'object' && '$key' in field.properties
//     header = (
//       <Stack
//         style={{
//           background: color('background', 'muted'),
//           color: color('content', hasKey ? 'primary' : 'secondary'),
//           borderBottom: dragOver ? border('focus', 2) : border(),
//           height: 48,
//         }}
//         onDrop={
//           order
//             ? (e: any) => {
//                 setDragOver(false)
//               }
//             : undefined
//         }
//         onDragOver={
//           order
//             ? () => {
//                 setDragOver(true)
//               }
//             : undefined
//         }
//         onDragLeave={
//           order
//             ? () => {
//                 setDragOver(false)
//               }
//             : undefined
//         }
//       >
//         <Stack
//           style={{
//             height: 48,
//           }}
//         >
//           {order ? (
//             <styled.div style={{ opacity: 0 }}>
//               <DragDropHorizontal />
//             </styled.div>
//           ) : null}
//           {colls.map((v, index) => (
//             <Cell key={v} isKey={hasKey && index === 0} index={index}>
//               {v}
//             </Cell>
//           ))}
//         </Stack>
//         <Close
//           style={{
//             opacity: 0,
//           }}
//         />
//       </Stack>
//     )
//   } else {
//     header = (
//       <styled.div
//         onDrop={
//           order
//             ? (e: any) => {
//                 setDragOver(false)
//               }
//             : undefined
//         }
//         onDragOver={
//           order
//             ? () => {
//                 setDragOver(true)
//               }
//             : undefined
//         }
//         onDragLeave={
//           order
//             ? () => {
//                 setDragOver(false)
//               }
//             : undefined
//         }
//         style={{
//           marginTop: -8,
//           height: 8,
//           borderBottom: dragOver
//             ? border('focus', 2)
//             : nested
//             ? undefined
//             : border(),
//         }}
//       />
//     )
//   }

//   return (
//     <Stack
//       direction="column"
//       gap={8}
//       align="start"
//       style={{
//         flexGrow: 1,
//         paddingBottom: onNew ? 6 : 0,
//         ...style,
//       }}
//     >
//       <styled.div style={{ width: '100%' }}>
//         {header}
//         {rows.map((value, i) => (
//           <Row
//             nested={nested}
//             path={path}
//             order={order}
//             noBorder={i === rows.length - 1 && nested}
//             orginalField={orginalField}
//             field={field}
//             key={i}
//             index={i}
//             value={value}
//           />
//         ))}
//       </styled.div>
//       {onNew ? (
//         <Button
//           size="small"
//           variant="neutral-transparent"
//           onClick={onNew}
//           prefix={<Plus />}
//         >
//           New
//         </Button>
//       ) : null}
//     </Stack>
//   )
// }
