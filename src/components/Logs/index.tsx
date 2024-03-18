import React, { ReactNode, useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Color } from '../../utils/colors.js'
import { SingleLog } from './SingleLog.js'
import { ScrollArea } from '../ScrollArea/index.js'
import { LogsHeader } from './LogsHeader.js'
import { LogGroup } from './LogGroup.js'
import {
  isWithinInterval,
  startOfDay,
  startOfHour,
  startOfMinute,
  format,
} from 'date-fns'

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
  groupByTime?: 1 | 3 | 5 | 10 | 15 | 30 | 60 | 1200
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

const createIntervalGroups = (arr, time) => {
  const timeIntervalInMs = time * 60000
  const intervalGroups = []

  let counter = 0
  let startInterval

  if (time) {
    while (counter < arr.length) {
      if (time < 60) {
        startInterval = startOfMinute(arr[arr.length - 1 - counter].ts)
      } else if (time < 1440) {
        startInterval = startOfHour(arr[arr.length - 1 - counter].ts)
      } else {
        startInterval = startOfDay(arr[arr.length - 1 - counter].ts)
      }

      const endTimeInterval = +format(startInterval, 'T') + timeIntervalInMs

      let interval = arr.filter((item) =>
        isWithinInterval(item.ts, {
          start: startInterval,
          end: endTimeInterval,
        }),
      )

      counter += interval.length
      intervalGroups.push(interval)
    }
  }
  // return an array with arrays of groups !!!
  return intervalGroups
}

export const Logs = ({ data, groupByTime }: LogsProps) => {
  const [srvcFilters, setSrvcFilters] = useState<string[]>([])
  const [msgFilter, setMsgFilter] = useState<string>('')
  const [counter, setCounter] = useState(null)
  const [timeGroup, setTimeGroup] = useState(groupByTime * 60000)

  useEffect(() => {
    console.log('🧙🏼‍♀️, "flpapoieajf', data)
  }, [data])

  const orderedByTime = orderBy(data, ['ts'], ['desc', 'desc'])

  const finalFinalOrderedArr = [...orderedByTime]

  const LogTypeOptions = []

  for (let i = 0; i < data.length; i++) {
    if (!LogTypeOptions.includes(data[i].srvc)) {
      LogTypeOptions.push(data[i].srvc)
    }
  }

  const newGroups = createIntervalGroups(finalFinalOrderedArr, timeGroup)

  // TODO SOLVE THIS
  let count = 0

  return (
    <styled.div>
      <LogsHeader
        setSrvcFilters={setSrvcFilters}
        msgFilter={msgFilter}
        setMsgFilter={setMsgFilter}
        options={LogTypeOptions}
        timeGroup={timeGroup}
        setTimeGroup={setTimeGroup}
        counter={counter}
        totalCount={data?.length}
      />

      {/* grouped logs */}
      {timeGroup ? (
        <styled.div>
          {newGroups.map((group, idx) => {
            if (group) {
              const filteredGroup = group
                .filter((item) =>
                  srvcFilters.length > 0
                    ? srvcFilters.includes(item.srvc)
                    : item,
                )
                .filter((item) =>
                  item.msg.toLowerCase().includes(msgFilter.toLowerCase()),
                )
              count += filteredGroup.length
              console.log(count, '🧛🏻')

              return <LogGroup key={idx} group={filteredGroup} />
            }
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
