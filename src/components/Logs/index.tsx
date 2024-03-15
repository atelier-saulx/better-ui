import React, { ReactNode, useState } from 'react'
import { styled } from 'inlines'
import { Color } from '../../utils/colors.js'
import { SingleLog } from './SingleLog.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { LogsHeader } from './LogsHeader.js'
import { Badge } from '../../index.js'
import { LogGroup } from './LogGroup.js'

type NewLogsObject = {
  status?: string
  type?: string
  ts?: number
  msg?: string
  subType?: ReactNode | string
  color?: Color
  icon?: ReactNode
  srvc?: string
}[]

type LogsProps = {
  data?: NewLogsObject
  groupByTime?: number
}

const orderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0),
  )

const finalOrderBy = (arr, props, orders) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[0][prop], a[0][prop]]
            : [a[0][prop], b[0][prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0),
  )

const checkIfThereAreSameTypeAndWithinRange = (obj, obj2, groupTimeMs) => {
  const tsResult = Math.abs(obj.ts - obj2?.ts)
  if (
    obj.type === obj2?.type &&
    obj.subType === obj2?.subType &&
    tsResult < groupTimeMs
  ) {
    return true
  }
}

export const Logs = ({ data, groupByTime }: LogsProps) => {
  const [srvcFilters, setSrvcFilters] = useState<string[]>([])
  const [msgFilter, setMsgFilter] = useState<string>('')
  const [counter, setCounter] = useState(null)

  const groupByTimeInMilliSeconds = groupByTime * 60000

  const orderedByTime = orderBy(data, ['ts'], ['desc', 'desc'])

  const pairs = []

  // make groups // so loop all objects wich are so many - milliseconds from first object

  const newGroups = [[]]

  //   for (let i = 0; i < orderedByTime.length + 1; i++) {
  //     let chunkIndex = 0
  //     let itemIndex = 0

  //     if (i === 0) {
  //       newGroups[chunkIndex].push(orderedByTime[0])
  //     } else if (
  //       orderedByTime[i].ts - orderedByTime[i + 1].ts <
  //       groupByTimeInMilliSeconds
  //     ) {
  //       newGroups[chunkIndex].push(orderedByTime[i])
  //     } else {
  //       chunkIndex++
  //       itemIndex++
  //       console.log(chunkIndex, itemIndex)
  //       newGroups[chunkIndex] = []
  //       newGroups[chunkIndex].push(orderedByTime[itemIndex])
  //     }
  //   }

  //   console.log(newGroups, '🐝')
  //   console.log('gropupe 🐨', groupByTimeInMilliSeconds)

  // then from overige objecten weer

  //   for (let i = 0; i < orderedByTypeAndTime.length; i++) {
  //     if (
  //       checkIfThereAreSameTypeAndWithinRange(
  //         orderedByTypeAndTime[i],
  //         orderedByTypeAndTime[i + 1],
  //         groupByTimeInMilliSeconds,
  //       )
  //     ) {
  //       pairs.push([i, i + 1])
  //     } else {
  //       pairs.push([i, i])
  //     }
  //   }

  //   const result = []

  //   let item
  //   for (let i = 0; i < pairs.length; i++) {
  //     const arr = pairs[i]
  //     if (!item) {
  //       item = arr
  //       result.push(item)
  //     }
  //     const next = pairs[i + 1]
  //     if (next && item[1] === next[0]) {
  //       item[1] = next[1]
  //     } else {
  //       item = null
  //     }
  //   }

  //   const finalArr = []

  //   for (let i = 0; i < result.length; i++) {
  //     finalArr.splice(result[i][0], result[i][1] + 1)
  //     finalArr.push(orderedByTypeAndTime.slice(result[i][0], result[i][1] + 1))
  //   }

  //   const finalFinalOrderedArr = finalOrderBy(
  //     orderedByTypeAndTime,
  //     ['ts'],
  //     ['desc'],
  //   )

  const finalFinalOrderedArr = [...orderedByTime]

  const options = []

  for (let i = 0; i < data.length; i++) {
    if (!options.includes(data[i].srvc)) {
      options.push(data[i].srvc)
    }
  }

  console.log('yo ordered time type 🐨', orderedByTime)
  console.log('Final Order Arry', finalFinalOrderedArr)

  return (
    <styled.div>
      <Badge style={{ marginBottom: 8 }} color="informative-muted">
        {counter}
      </Badge>
      <LogsHeader
        setSrvcFilters={setSrvcFilters}
        msgFilter={msgFilter}
        setMsgFilter={setMsgFilter}
        options={options}
      />
      {/* grouped logs */}
      {groupByTime ? (
        <styled.div>
          {newGroups.map((group, idx) => {
            const filteredGroup = group
              .filter((item) =>
                srvcFilters.length > 0 ? srvcFilters.includes(item.srvc) : item,
              )
              .filter((item) =>
                item.msg.toLowerCase().includes(msgFilter.toLowerCase()),
              )
            return <LogGroup key={idx} group={filteredGroup} />
          })}
        </styled.div>
      ) : (
        <ScrollArea style={{ maxHeight: 676 }}>
          {orderedByTime
            .filter((item) =>
              srvcFilters.length > 0 ? srvcFilters.includes(item.srvc) : item,
            )
            .filter((item) =>
              item.msg.toLowerCase().includes(msgFilter.toLowerCase()),
            )
            .map((item, idx, arr) => {
              if (arr.length !== counter) {
                setCounter(arr.length)
              }

              return (
                <SingleLog
                  key={idx}
                  msg={item.msg}
                  srvc={item.srvc}
                  ts={item.ts}
                />
              )
            })}
        </ScrollArea>
      )}
    </styled.div>
  )
}
