import * as React from 'react'
import {
  NON_SEMANTIC_COLOR,
  NonSemanticColor,
  Stack,
  Text,
  borderRadius,
  hashNonSemanticColor,
} from '../../index.js'
import { styled, Style } from 'inlines'

export type PieGraphProps = {
  data: { label: string; value: number; color?: NonSemanticColor }[]
  legend?: boolean
  muted?: boolean
  style?: Style
}

export function PieGraph({
  data: rawData,
  legend = false,
  muted = false,
  style,
}: PieGraphProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  const data = React.useMemo(() => {
    const totalValue = rawData.reduce((acc, curr) => acc + curr.value, 0)
    const maxValue = Math.max(...rawData.map((e) => e.value))
    const newData: any = [...rawData]

    for (let i = 0; i < newData.length; i++) {
      newData[i] = {
        ...newData[i],
        percentage: (newData[i].value / totalValue) * 100,
        strokeWidth: Math.round(newData[i].value / (maxValue / 100)) / 10 + 16,
        degrees: 0,
      }
    }

    for (let i = 0; i < newData.length; i++) {
      if (i === 0) {
        newData[i] = { ...newData[i], degrees: -90 }
      } else {
        newData[i].degrees =
          newData[i - 1].percentage * 3.6 + newData[i - 1].degrees
      }
    }

    return newData
  }, [rawData])

  return (
    <styled.div style={{ ...style }}>
      <Stack style={{ position: 'relative' }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120">
          {data.map((e, i) => (
            <circle
              onMouseEnter={() => {
                setHoverIndex(i)
              }}
              onMouseLeave={() => {
                setHoverIndex(null)
              }}
              key={i}
              cx="60"
              cy="60"
              r="47"
              fill="none"
              stroke={
                NON_SEMANTIC_COLOR[e.color] ??
                hashNonSemanticColor(e.label, muted)
              }
              strokeWidth={e.strokeWidth}
              strokeDasharray={100}
              pathLength="100"
              strokeDashoffset={100 - e.percentage + 0.5}
              style={{
                transform: `rotate(${e.degrees}deg)`,
                transformOrigin: '60px 60px',
                ...(hoverIndex !== null && {
                  opacity: hoverIndex === i ? 1 : 0.4,
                }),
              }}
            />
          ))}
        </svg>
        {hoverIndex !== null && (
          <styled.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Text variant="body-strong" style={{ fontSize: 20 }}>
              {data[hoverIndex].percentage.toFixed(2)} %
            </Text>
            <Text style={{ fontSize: 14 }}>{data[hoverIndex].label}</Text>
          </styled.div>
        )}
      </Stack>
      {legend && (
        <Stack
          justify="center"
          gap={12}
          style={{
            marginTop: 24,
          }}
        >
          {data.map((e) => (
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
    </styled.div>
  )
}
