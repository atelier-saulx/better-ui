import * as React from 'react'
import {
  NON_SEMANTIC_COLOR,
  NonSemanticColor,
  Text,
  hashNonSemanticColor,
} from '../../index.js'
import { styled } from 'inlines'

export type PieGraphProps = {
  data: { label: string; value: number; color?: NonSemanticColor }[]
}

export function PieGraph({ data: rawData }: PieGraphProps) {
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
    <styled.div style={{ position: 'relative', width: 256, height: 256 }}>
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
              NON_SEMANTIC_COLOR[e.color] ?? hashNonSemanticColor(e.label)
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
    </styled.div>
  )
}
