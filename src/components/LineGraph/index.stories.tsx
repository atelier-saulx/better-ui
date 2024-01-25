import * as React from 'react'
import type { Meta } from '@storybook/react'
import { LineGraph } from '../../index.js'

const meta: Meta<typeof LineGraph> = {
  title: 'Atoms/LineGraph',
  component: LineGraph,
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

export const Single = () => {
  return (
    <div
      style={{
        height: 500,
        width: 700,
      }}
    >
      <LineGraph
        data={{
          en: {
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 10000000) + i * 100,
              }),
              0,
              50000,
            ),
            minMax: true,
          },
        }}
      />
    </div>
  )
}

export const Multi = () => {
  return (
    <div
      style={{
        height: 500,
        width: 700,
      }}
    >
      <LineGraph
        data={{
          line1: {
            color: 'red',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
            label: 'housing market 🏠',
          },
          line2: {
            color: 'green',
            label: 'bitcoin 💸',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
          },
          line3: {
            color: 'blue',
            data: genRandomPoints(
              (i) => ({
                x: i,
                y: ~~(Math.random() * 100000) + i * 100,
              }),
              0,
              1000,
            ),
            label: 'housing market 🏠',
          },
        }}
      />
    </div>
  )
}
