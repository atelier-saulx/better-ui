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
import { BasedSchema, display } from '@based/schema'
import humanizeString from 'humanize-string'
import { getImg } from '../Form/Reference.js'
import { readInfoField } from '../Form/utils.js'

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

const getData = (
  v: any,
  fields?: FormProps['fields'],
  schema?: BasedSchema,
): any => {
  if (!fields) {
    return v
  }

  const newObj: any = {
    title: readInfoField(v, { type: 'object', properties: fields }),
  }

  for (const fi in fields) {
    const f = fields[fi]

    if (f.type === 'string' && f.format === 'basedId') {
      newObj.id = v[fi]
    } else if (f.type === 'string' && f.contentMediaType) {
      newObj.src = v[fi]
      newObj.mimeType = v.mimeType ?? f.contentMediaType
      if (newObj.mimeType === '*/*') {
        delete newObj.mimeType
      }
    } else if (f.type === 'string') {
      if (fi === 'description') {
        newObj.description = v[fi]
      }
    } else if (f.type === 'timestamp') {
      newObj.date = display(
        v[fi],
        f.display ? f : { type: 'timestamp', display: 'human' },
      )
    } else if (f.type === 'number') {
      newObj.result = {
        name: f.title ?? humanizeString(fi),
        value: display(
          v[fi],
          f.display ? f : { type: 'number', display: 'short' },
        ),
      }
    } else if (f.type === 'reference') {
      const img = getImg(v[fi], schema, f)
      if (img) {
        newObj.src = img
        newObj.mimeType = v.mimeType
      }
    }
  }

  if (!('description' in newObj)) {
    if (newObj.date) {
      newObj.description = newObj.date
      delete newObj.date
    }
  }

  if (v.src && !newObj.src) {
    newObj.src = v.src
    newObj.mimeType = v.mimeType
  }

  return newObj
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
                    direction="column"
                    justify="start"
                    align="start"
                    gap={16}
                    onClick={() => {
                      if (p.onClick) {
                        p.onClick(raw)
                      }
                    }}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                      cursor: 'pointer',
                      padding: 8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <Stack
                      direction="column"
                      justify="start"
                      align="start"
                      gap={16}
                      style={{
                        padding: 16,
                        width: '100%',
                        height: '100%',
                        border: '1px solid transparent',
                        borderRadius: borderRadius('large'),
                        '&:hover': {
                          background: color('background', 'neutral'),
                        },
                      }}
                    >
                      {hasSrc ? (
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
                          <Media
                            type={v.mimeType}
                            variant="cover"
                            src={v.src}
                          />
                        </styled.div>
                      ) : hasResult ? (
                        <Stack
                          direction="column"
                          align="center"
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
                            color: color('interactive', 'primary'),
                            overflow: 'hidden',
                            '& p': {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            },
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
                      <Stack>
                        <styled.div
                          style={{
                            overflow: 'hidden',
                            '& p': {
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            },
                          }}
                        >
                          <Text variant="body-bold">
                            {v.title ?? v.name ?? v.id}
                          </Text>
                          {v.description ? (
                            <Text variant="body-light">{v.description}</Text>
                          ) : null}
                        </styled.div>
                        {v.date ? (
                          <Text variant="body-light">{v.date}</Text>
                        ) : null}
                      </Stack>
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
