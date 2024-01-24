import * as React from 'react'
import type { Meta } from '@storybook/react'
import { NewLineGraph } from '../../index.js'

const meta: Meta<typeof NewLineGraph> = {
  title: 'Atoms/Graphs/NewLineGraph',
  component: NewLineGraph,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const genRandomPoints = (
  formula: (i: number) => { x: number; y: number },
  start: number = 0,
  end: number = 50,
  step: number = 1,
) => {
  const points: { x: number; y: number }[] = []
  for (let i = start; i <= end; i = i + step) {
    points.push(formula(i))
  }
  return points
}

export const Default = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 128,
      }}
    >
      <NewLineGraph
        data={[
          genRandomPoints(
            (i) => ({
              x: i,
              y: ~~(Math.random() * 100000) + i * 100,
            }),
            0,
            30,
          ),
        ]}
      />
    </div>
  )
}

export const ManyPoints = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 128,
      }}
    >
      <NewLineGraph
        data={[
          genRandomPoints(
            (i) => ({
              x: i,
              y: ~~(Math.random() * 10000000) + i * 100,
            }),
            0,
            300,
          ),
        ]}
      />
    </div>
  )
}
