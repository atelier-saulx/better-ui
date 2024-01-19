import * as React from 'react'
import { styled } from 'inlines'
import { Text, border, borderRadius, color } from '../../index.js'
import { createPortal } from 'react-dom'

export type BarGraphProps = {
  data: {
    label: string
    value: number | { [key: string]: number }
    color: string
  }[]
  variant: 'horizontal' | 'vertical'
}

// TODO always sort values and nested values too, descending order
// TODO background color for nested
// TODO x and y axies

export function BarGraph({ data: rawData, variant }: BarGraphProps) {
  const [hover, setHover] = React.useState<{
    index: number
    top: number
    left: number
    nestedKey?: string
  } | null>(null)
  const data = React.useMemo(() => {
    const maxValue = Math.max(
      ...rawData.map((e) =>
        typeof e.value === 'object'
          ? Object.values(e.value).reduce((a, c) => a + c, 0)
          : e.value,
      ),
    )
    const newData: any = [...rawData]

    for (let i = 0; i < newData.length; i++) {
      if (typeof newData[i].value === 'object') {
        const total = Object.values(newData[i].value).reduce(
          (a: any, c) => a + c,
          0,
        ) as number

        newData[i] = {
          ...newData[i],
          total,
          percentage: (total / maxValue) * 100,
          nestedPercentages: Object.fromEntries(
            Object.entries(newData[i].value).map(([k, v]: [string, number]) => [
              k,
              (v / total) * 100,
            ]),
          ),
        }
      } else {
        newData[i] = {
          ...newData[i],
          percentage: (newData[i].value / maxValue) * 100,
        }
      }
    }

    return newData
  }, [rawData])

  console.log(hover)

  return (
    <>
      <div
        style={{
          minHeight: 256,
          minWidth: 256,
          display: 'flex',
          gap: 8,
          ...(variant === 'horizontal' && {
            flexDirection: 'column',
          }),
          ...(variant === 'vertical' && {
            flexFlow: 'wrap-reverse',
            height: 1, // bugfix, without this vertical children with percentage height doesnt work
          }),
        }}
      >
        {data.map((e, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              background: e.color,
              overflow: 'hidden',
              ...(variant === 'horizontal' && {
                width: `${e.percentage}%`,
                height: 32,
                borderTopRightRadius: borderRadius('tiny'),
                borderBottomRightRadius: borderRadius('tiny'),
                display: 'flex',
              }),
              ...(variant === 'vertical' && {
                height: `${e.percentage}%`,
                width: 32,
                borderTopLeftRadius: borderRadius('tiny'),
                borderTopRightRadius: borderRadius('tiny'),
              }),
            }}
            onMouseEnter={(event) => {
              if (typeof e.value === 'object') return
              setHover({ index: i, left: event.clientX, top: event.clientY })
            }}
            onMouseMove={(event) => {
              if (typeof e.value === 'object') return
              setHover({ index: i, left: event.clientX, top: event.clientY })
            }}
            onMouseLeave={() => {
              setHover(null)
            }}
          >
            {typeof e.value === 'object'
              ? Object.entries(e.nestedPercentages).map(([k, v]) => (
                  <div
                    onMouseEnter={(e) => {
                      setHover({
                        index: i,
                        left: e.clientX,
                        top: e.clientY,
                        nestedKey: k,
                      })
                    }}
                    onMouseMove={(e) => {
                      setHover({
                        index: i,
                        left: e.clientX,
                        top: e.clientY,
                        nestedKey: k,
                      })
                    }}
                    style={{
                      ...(variant === 'horizontal' && {
                        width: `${v}%`,
                        height: '100%',
                      }),
                      ...(variant === 'vertical' && {
                        height: `${v}%`,
                        width: '100%',
                      }),
                    }}
                  />
                ))
              : null}
          </div>
        ))}
      </div>
      {hover &&
        createPortal(
          <div
            style={{
              position: 'absolute',
              top: hover.top + 4,
              left: hover.left + 8,
              pointerEvents: 'none',
              border: border(),
              background: color('background', 'screen'),
              borderRadius: borderRadius('tiny'),
              padding: '4px 8px',
            }}
          >
            <Text variant="body-strong">{data[hover.index].label}</Text>
            {hover.nestedKey && <Text>{hover.nestedKey}</Text>}
            <Text>
              {typeof data[hover.index].value === 'object'
                ? data[hover.index]['value'][hover.nestedKey]
                : data[hover.index].value}
            </Text>
          </div>,
          document.body,
        )}
    </>
  )
}
