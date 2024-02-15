import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  borderRadius,
  Pagination,
  Virtualized,
  Text,
  Media,
  Stack,
  color,
} from '../../index.js'
import { display } from '@based/schema'

export type GridProps = {
  pagination: Pagination
  values?: any[]
  size?: number
  isBlock?: boolean
  isLoading?: boolean
  style?: Style
}

const GridItem = () => {
  return 'bla'
}

export function Grid(p: GridProps) {
  const values = p.values ?? []
  const size = p.size ?? 250

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        ...p.style,
      }}
    >
      <Virtualized
        isBlock={p.isBlock}
        isLoading={p.isLoading}
        itemSize={({ width, height }) => {
          const nr = width / size
          const remainder = nr % 1
          const rows = nr - remainder
          const itemWidth = size + (remainder / rows) * size
          return { height: itemWidth, width: itemWidth, rows }
        }}
        pagination={p.pagination}
        values={values}
      >
        {({ values, itemHeight, itemWidth, pageCount, start, end }) => {
          return (
            <Stack grid gap={0}>
              {values.map((v, i) => {
                return (
                  <Stack
                    direction="column"
                    justify="start"
                    align="start"
                    gap={16}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      padding: 24,
                      // border: '1px solid red',
                    }}
                  >
                    <styled.div
                      style={{
                        background: color('background', 'primary'),
                        borderRadius: borderRadius('medium'),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0,
                        height: 'calc(100% - 64px)',
                        width: '100%',
                        padding: 32,
                      }}
                    >
                      <Media variant="cover" src={v.src} />
                    </styled.div>
                    <Stack>
                      <styled.div>
                        <Text variant="body-bold">{v.title ?? v.name}</Text>
                        <Text variant="body-light">
                          {display(v.createdAt, {
                            type: 'timestamp',
                            display: 'human',
                          })}
                        </Text>
                      </styled.div>
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
          )
        }}
      </Virtualized>
    </styled.div>
  )
}
