import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  borderRadius,
  Pagination,
  Virtualized,
  Text,
  Media,
  Stack,
  FormProps,
  color,
} from '../../index.js'
import { BasedSchema } from '@based/schema'
import { getData } from './getData.js'

export type GridProps = {
  pagination: Pagination
  values?: any[]
  onClick?: (row: any) => void
  size?: number
  isBlock?: boolean
  isLoading?: boolean
  style?: Style
  schema?: BasedSchema
  fields?: FormProps['fields']
}

export function Grid(p: GridProps) {
  const values = p.values ?? []
  const size = p.size ?? 275

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        padding: 12,
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
          const itemWidth = size + Math.floor((remainder / rows) * size)
          return { height: itemWidth, width: itemWidth, rows }
        }}
        pagination={p.pagination}
        values={values}
      >
        {({ values, itemHeight, itemWidth, pageCount, start, end }) => {
          return (
            <Stack grid gap={0}>
              {values.map((raw, i) => {
                const v = getData(raw, p.fields, p.schema)

                const hasSrc = 'src' in v
                const hasResult = v.result

                return (
                  <Stack
                    key={i}
                    direction="column"
                    justify="start"
                    align="start"
                    onClick={() => {
                      if (p.onClick) {
                        p.onClick(raw)
                      }
                    }}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      cursor: 'pointer',
                      padding: 12,
                      '&:hover section': {
                        background:
                          color('background', 'primary2') + ' !important',
                      },
                    }}
                  >
                    <Stack
                      direction="column"
                      justify="start"
                      align="start"
                      gap={12}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      {hasSrc ? (
                        <Stack
                          as="section"
                          style={{
                            background: color('background', 'primary'),
                            borderRadius: borderRadius('tiny'),
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0,
                            height: 'calc(100% - 64px)',
                            width: '100%',
                            padding: 16,
                          }}
                        >
                          <Media
                            type={v.mimeType}
                            variant="contain"
                            src={v.src}
                          />
                        </Stack>
                      ) : hasResult ? (
                        <Stack
                          as="section"
                          direction="column"
                          align="center"
                          style={{
                            background: color('background', 'primary'),
                            borderRadius: borderRadius('tiny'),
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0,
                            height: 'calc(100% - 64px)',
                            width: '100%',
                            padding: 32,
                            color: color('interactive', 'primary'),
                            overflow: 'hidden',
                          }}
                        >
                          <Text color="inherit" variant="body-light">
                            {v.result.name}
                          </Text>
                          <Text singleLine variant="title-page">
                            {v.result.value}
                          </Text>
                        </Stack>
                      ) : null}
                      <Text singleLine variant="sub-title">
                        {v.title ?? v.name ?? v.id}
                      </Text>
                      {v.date ? (
                        <Text style={{ marginTop: -8 }} variant="body-light">
                          {v.date}
                        </Text>
                      ) : null}
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
