import * as React from 'react'
import {
  NON_SEMANTIC_COLOR,
  NonSemanticColor,
  Stack,
  Text,
  border,
  borderRadius,
  color,
  hashNonSemanticColor,
} from '../../index.js'
import { createPortal } from 'react-dom'

export type BarGraphProps = {
  data: {
    label: string
    value: number | { label: string; value: number; color?: NonSemanticColor }[]
    color?: NonSemanticColor
  }[]
  variant: 'horizontal' | 'vertical'
  showAxis?: boolean
  legend?: boolean
  muted?: boolean
}

export function BarGraph({
  data: rawData,
  variant,
  showAxis = true,
  legend = false,
  muted = false,
}: BarGraphProps) {
  const [hover, setHover] = React.useState<{
    index: number
    top: number
    left: number
    nestedIndex?: number
  } | null>(null)
  const data = React.useMemo(() => {
    const maxValue = Math.max(
      ...rawData.map((e) =>
        Array.isArray(e.value)
          ? e.value.reduce((a, c) => a + c.value, 0)
          : e.value,
      ),
    )
    const newData: any = [...rawData]

    for (let i = 0; i < newData.length; i++) {
      if (Array.isArray(newData[i].value)) {
        const total = (newData[i].value as []).reduce(
          (a, c: any) => a + c.value,
          0,
        )

        newData[i] = {
          ...newData[i],
          total,
          percentage: (total / maxValue) * 100,
          nestedPercentages: newData[i].value.map((e) => ({
            ...e,
            percentage: (e.value / total) * 100,
          })),
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

  const axisPoints = React.useMemo(() => {
    const points = []
    const numberOfPoints = 4
    const maxValue = Math.max(
      ...rawData.map((e) =>
        Array.isArray(e.value)
          ? e.value.reduce((a, c) => a + c.value, 0)
          : e.value,
      ),
    )

    const step = maxValue / numberOfPoints

    for (let i = 0; i < numberOfPoints + 1; i++) {
      points.push(i * step)
    }

    return points
  }, [rawData])

  return (
    <>
      <div
        style={{
          display: 'flex',
          ...(variant === 'vertical' && {
            height: 256,
            flexDirection: 'row',
          }),
          ...(variant === 'horizontal' && {
            width: '100%',
            flexDirection: 'column',
          }),
        }}
      >
        {showAxis && variant === 'vertical' && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'space-between',
              }}
            >
              {axisPoints.map((point) => (
                <Text
                  style={{
                    lineHeight: 1,
                    textAlign: 'right',
                    color: color('content', 'primary'),
                  }}
                  key={point}
                >
                  {point}
                </Text>
              ))}
            </div>
            <div
              style={{
                width: 1,
                background: color('content', 'primary'),
                marginLeft: 8,
              }}
            />
          </>
        )}
        <div
          style={{
            display: 'flex',
            gap: 8,
            ...(variant === 'horizontal' && {
              flexDirection: 'column',
              borderLeft: `1px solid ${color('content', 'primary')}`,
              padding: '8px 0',
            }),
            ...(variant === 'vertical' && {
              flexFlow: 'wrap-reverse',
              borderBottom: `1px solid ${color('content', 'primary')}`,
              padding: '0 8px',
            }),
          }}
        >
          {data
            .sort((a, b) => b.percentage - a.percentage)
            .map((e, i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                  border: muted
                    ? `1px solid ${hashNonSemanticColor(e.label, true)}`
                    : `0px solid transparent`,
                  background:
                    NON_SEMANTIC_COLOR[e.color] ??
                    hashNonSemanticColor(e.label, muted),
                  overflow: 'hidden',
                  display: 'flex',
                  ...(variant === 'horizontal' && {
                    width: `${e.percentage}%`,
                    height: 32,
                    borderTopRightRadius: borderRadius('tiny'),
                    borderBottomRightRadius: borderRadius('tiny'),
                  }),
                  ...(variant === 'vertical' && {
                    height: `${e.percentage}%`,
                    width: 32,
                    borderTopLeftRadius: borderRadius('tiny'),
                    borderTopRightRadius: borderRadius('tiny'),
                    flexDirection: 'column-reverse',
                  }),
                }}
                onMouseEnter={(event) => {
                  if (typeof e.value === 'object') return
                  setHover({
                    index: i,
                    left: event.clientX,
                    top: event.clientY,
                  })
                }}
                onMouseMove={(event) => {
                  if (typeof e.value === 'object') return
                  setHover({
                    index: i,
                    left: event.clientX,
                    top: event.clientY,
                  })
                }}
                onMouseLeave={() => {
                  setHover(null)
                }}
              >
                {Array.isArray(e.value) &&
                  e.nestedPercentages
                    .sort((a, b) => b.percentage - a.percentage)
                    .map((e, nestedIndex) => (
                      <div
                        key={`${i}-${nestedIndex}`}
                        onMouseEnter={(event) => {
                          setHover({
                            index: i,
                            left: event.clientX,
                            top: event.clientY,
                            nestedIndex,
                          })
                        }}
                        onMouseMove={(event) => {
                          setHover({
                            index: i,
                            left: event.clientX,
                            top: event.clientY,
                            nestedIndex,
                          })
                        }}
                        style={{
                          background:
                            NON_SEMANTIC_COLOR[e.color] ??
                            hashNonSemanticColor(e.label, muted),
                          ...(variant === 'horizontal' && {
                            width: `${e.percentage}%`,
                            height: '100%',
                          }),
                          ...(variant === 'vertical' && {
                            height: `${e.percentage}%`,
                            width: '100%',
                          }),
                        }}
                      />
                    ))}
              </div>
            ))}
        </div>
        {showAxis && variant === 'horizontal' && (
          <>
            <div
              style={{
                width: '100%',
                height: 1,
                background: color('content', 'primary'),
                marginBottom: 8,
              }}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {axisPoints.map((point) => (
                <Text
                  style={{
                    lineHeight: 1,
                    textAlign: 'right',
                    color: color('content', 'primary'),
                  }}
                  key={point}
                >
                  {point}
                </Text>
              ))}
            </div>
          </>
        )}
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
              {typeof hover.nestedIndex === 'number' && (
                <Text>
                  {data[hover.index]['value'][hover.nestedIndex].label}
                </Text>
              )}
              <Text>
                {Array.isArray(data[hover.index].value)
                  ? data[hover.index]['value'][hover.nestedIndex]['value']
                  : data[hover.index].value}
              </Text>
            </div>,
            document.body,
          )}
      </div>
      {legend && (
        <Stack
          gap={16}
          justify="center"
          style={{
            marginTop: 24,
          }}
        >
          {data
            .flatMap((e) => (Array.isArray(e.value) ? e.value : [e]))
            .map((e) => (
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderRadius: borderRadius('full'),
                    height: 12,
                    width: 12,
                    background:
                      NON_SEMANTIC_COLOR[e.color] ??
                      hashNonSemanticColor(e.label, muted),
                  }}
                />
                <Text variant="body-bold">{e.label}</Text>
              </div>
            ))}
        </Stack>
      )}
    </>
  )
}
