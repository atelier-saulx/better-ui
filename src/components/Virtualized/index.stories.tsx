import * as React from 'react'
import { Stack, Virtualized, Text } from '../../index.js'
import type { Meta } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof Virtualized> = {
  title: 'Components/Virtualized',
  component: Virtualized,
}

export default meta

export const Default = () => {
  const values: string[] = []
  for (let i = 0; i < 1e3; i++) {
    values.push('Value #' + i)
  }

  return (
    <styled.div
      style={{
        height: '50vh',
      }}
    >
      <Virtualized
        values={values}
        pagination={{
          type: 'scroll',
          total: 1e3,
        }}
        itemHeight={100}
      >
        {({ values }) => {
          return (
            <div>
              {values.map((v, i) => {
                return (
                  <Stack
                    key={i}
                    style={{
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
