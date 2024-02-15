import * as React from 'react'
import { Stack, Virtualized, Text, border } from '../../index.js'
import type { Meta } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof Virtualized> = {
  title: 'Components/Virtualized',
  component: Virtualized,
}

export default meta

const values: string[] = []
for (let i = 0; i < 1e3; i++) {
  values.push('Value #' + i)
}

export const Default = () => {
  return (
    <styled.div
      style={{
        height: '50vh',
        border: border(),
      }}
    >
      <Virtualized
        values={values}
        pagination={{
          type: 'scroll',
          total: 1e3,
        }}
        itemSize={100}
      >
        {({ values }) => {
          return (
            <div>
              {values.map((v, i) => {
                return (
                  <Stack
                    key={i}
                    style={{
                      padding: 20,
                      borderBottom: border(),
                      height: 100,
                    }}
                  >
                    <Text variant="title">{v}</Text>
                  </Stack>
                )
              })}
            </div>
          )
        }}
      </Virtualized>
    </styled.div>
  )
}

export const HeightBasedOnSize = () => {
  return (
    <styled.div
      style={{
        height: '50vh',
        border: border(),
      }}
    >
      <Virtualized
        values={values}
        pagination={{
          type: 'scroll',
          total: 1e3,
        }}
        itemSize={({ height }) => {
          return height / 4
        }}
      >
        {({ values, itemHeight }) => {
          return (
            <div>
              {values.map((v, i) => {
                return (
                  <Stack
                    key={i}
                    style={{
                      padding: 20,
                      borderBottom: border(),
                      height: itemHeight,
                    }}
                  >
                    <Text variant="title">{v}</Text>
                  </Stack>
                )
              })}
            </div>
          )
        }}
      </Virtualized>
    </styled.div>
  )
}
