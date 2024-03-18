import React, { ReactNode, useEffect, useRef, useState } from 'react'
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
import { Button } from '../../index.js'
import { IconChevronDown, IconChevronTop } from '../Icons/index.js'

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

const createIntervalGroups = (arr, time, order) => {
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
  return order === 'asc' ? intervalGroups : intervalGroups.reverse()
}

export const Logs = ({ data, groupByTime }: LogsProps) => {
  const [srvcFilters, setSrvcFilters] = useState<string[]>([])
  const [msgFilter, setMsgFilter] = useState<string>('')
  const [counter, setCounter] = useState(null)
  const [timeGroup, setTimeGroup] = useState(groupByTime * 60000)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [scrollToBottom, setScrollToBottom] = useState(false)

  const orderedByTime = orderBy(data, ['ts'], [order, order])

  const LogTypeOptions = []

  for (let i = 0; i < data.length; i++) {
    if (!LogTypeOptions.includes(data[i].srvc)) {
      LogTypeOptions.push(data[i].srvc)
    }
  }

  const newGroups = createIntervalGroups(orderedByTime, timeGroup, order)

  const singleLogScrollArea = useRef<HTMLElement>()

  useEffect(() => {
    if (scrollToBottom) {
      // @ts-ignore
      singleLogScrollArea.current.childNodes[0].childNodes[1].lastElementChild.scrollIntoView()
    }
  }, [data.length, scrollToBottom])

  // TODO SOLVE THIS
  let count = 0

  return (
    <styled.div style={{ position: 'relative' }}>
      <LogsHeader
        setSrvcFilters={setSrvcFilters}
        msgFilter={msgFilter}
        setMsgFilter={setMsgFilter}
        options={LogTypeOptions}
        timeGroup={timeGroup}
        setTimeGroup={setTimeGroup}
        counter={counter}
        totalCount={data?.length}
        order={order}
        setOrder={setOrder}
      />

      {/* grouped logs */}
      {timeGroup ? (
        <styled.div
          style={{
            display: 'flex',
            flexDirection: order === 'desc' ? 'column' : 'column-reverse',
          }}
        >
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
        <ScrollArea
          style={{ maxHeight: 676 }}
          ref={singleLogScrollArea}
          onScroll={(e) => {
            console.log(e)
            if (
              (e.target as HTMLElement).scrollTop ===
              (e.target as HTMLElement).scrollHeight -
                (e.target as HTMLElement).offsetHeight
            ) {
              console.log('BOTTOM')
              setScrollToBottom(true)
            } else {
              setScrollToBottom(false)
            }
            console.log(e)
          }}
        >
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
      <Button
        variant="primary-transparent"
        shape="square"
        style={{ position: 'absolute', right: 0, bottom: 0 }}
        onClick={() => {
          if (order === 'desc') {
            setScrollToBottom(false)
            // @ts-ignore
            singleLogScrollArea.current.childNodes[0].childNodes[1].firstElementChild.scrollIntoView()
          } else {
            console.log('HALLO>>')

            setScrollToBottom(true)
          }
        }}
      >
        {order === 'desc' ? <IconChevronTop /> : <IconChevronDown />}
      </Button>
    </styled.div>
  )
}
