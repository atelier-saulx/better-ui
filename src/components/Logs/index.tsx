import React, { ReactNode, useState } from 'react'
import { styled } from 'inlines'
import { Color } from '../../utils/colors.js'
import { SingleLog } from './SingleLog.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { LogsHeader } from './LogsHeader.js'

type NewLogsObject = {
  status?: string
  type?: string
  ts?: number
  msg?: string
  subType?: ReactNode | string
  color?: Color
  icon?: ReactNode
  // TODO: custom
  // customComponent?: FC
}[]

type LogGroupsProps = {
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

export const Logs = ({ data, groupByTime }) => {
  const [srvcFilters, setSrvcFilters] = useState<string[]>([])
  const [msgFilter, setMsgFilter] = useState<string>('')

  const groupByTimeInMilliSeconds = groupByTime * 60000

  const orderedByTypeAndTime = orderBy(data, ['type', 'ts'], ['desc', 'desc'])

  const pairs = []

  for (let i = 0; i < orderedByTypeAndTime.length; i++) {
    if (
      checkIfThereAreSameTypeAndWithinRange(
        orderedByTypeAndTime[i],
        orderedByTypeAndTime[i + 1],
        groupByTimeInMilliSeconds,
      )
    ) {
      pairs.push([i, i + 1])
    } else {
      pairs.push([i, i])
    }
  }

  const result = []

  let item
  for (let i = 0; i < pairs.length; i++) {
    const arr = pairs[i]
    if (!item) {
      item = arr
      result.push(item)
    }
    const next = pairs[i + 1]
    if (next && item[1] === next[0]) {
      item[1] = next[1]
    } else {
      item = null
    }
  }

  const finalArr = []

  for (let i = 0; i < result.length; i++) {
    finalArr.splice(result[i][0], result[i][1] + 1)
    finalArr.push(orderedByTypeAndTime.slice(result[i][0], result[i][1] + 1))
  }

  const finalFinalOrderedArr = finalOrderBy(finalArr, ['ts'], ['desc'])

  // {label:'fa', value:'xx'}
  const options = []

  for (let i = 0; i < finalFinalOrderedArr.length; i++) {
    if (!options.includes(finalFinalOrderedArr[i][0].srvc)) {
      options.push(finalFinalOrderedArr[i][0].srvc)
    }
  }

  console.log('Final Order Arry', finalFinalOrderedArr)

  return (
    <styled.div>
      <LogsHeader
        setSrvcFilters={setSrvcFilters}
        msgFilter={msgFilter}
        setMsgFilter={setMsgFilter}
        options={options}
      />
      {groupByTime ? (
        <styled.div>Grouped logs</styled.div>
      ) : (
        <ScrollArea style={{ maxHeight: 676 }}>
          {finalFinalOrderedArr
            .filter((item) =>
              srvcFilters.length > 0
                ? srvcFilters.includes(item[0].srvc)
                : item,
            )
            .filter((item) =>
              item[0].msg.toLowerCase().includes(msgFilter.toLowerCase()),
            )
            .map((item, idx) => {
              return (
                <SingleLog
                  key={idx}
                  msg={item[0].msg}
                  srvc={item[0].srvc}
                  ts={item[0].ts}
                />
              )
            })}
        </ScrollArea>
      )}
    </styled.div>
  )
}
