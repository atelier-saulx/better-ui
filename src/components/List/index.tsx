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
  BadgeId,
  border,
} from '../../index.js'
import { BasedSchema } from '@based/schema'
import { getData } from '../Grid/getData.js'

export type ListProps = {
  pagination: Pagination
  values?: any[]
  onClick?: (row: any) => void
  isBlock?: boolean
  isLoading?: boolean
  style?: Style
  schema?: BasedSchema
  fields?: FormProps['fields']
  suffix?: (v: any) => React.ReactNode
}

export function List(p: ListProps) {
  const values = p.values ?? []

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        paddingTop: 24,
        paddingBottom: 24,
        ...p.style,
      }}
    >
      <Virtualized
        isBlock={p.isBlock}
        isLoading={p.isLoading}
        itemSize={100}
        pagination={p.pagination}
        values={values}
      >
        {({ values, itemHeight, width }) => {
          return (
            <Stack grid gap={0} direction="column">
              {values.map((raw, i) => {
                const v = getData(raw, p.fields, p.schema)
                const hasSrc = 'src' in v
                const hasResult = v.result
                return (
                  <Stack
                    key={i}
                    direction="row"
                    justify="start"
                    onClick={() => {
                      if (p.onClick) {
                        p.onClick(raw)
                      }
                    }}
                    style={{
                      width: '100%',
                      height: itemHeight,
                      cursor: 'pointer',
                      paddingLeft: 32,
                      paddingRight: 32,
                      '&:hover': {
                        background:
                          color('background', 'muted') + ' !important',
                      },
                    }}
                  >
                    <Stack
                      style={{
                        height: '100%',

                        borderBottom: border(),
                      }}
                    >
                      <Stack
                        direction="row"
                        justify="start"
                        gap={16}
                        style={{
                          cursor: 'pointer',
                          padding: 12,
                        }}
                      >
                        <styled.div style={{ flexGrow: 0 }}>
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
                                padding: 8,
                                width: 64,
                                height: 64,
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
                        </styled.div>
                        <styled.div
                          style={{
                            flexGrow: 1,
                            minWidth: 0,
                            flexShrink: 1,
                          }}
                        >
                          <Text
                            style={{
                              maxWidth: 750,
                            }}
                            variant="sub-title"
                            singleLine
                          >
                            {v.title ?? v.name ?? '-'}
                          </Text>
                          {v.date ? (
                            <Text
                              singleLine
                              style={{ flexShrink: 0 }}
                              variant="body-light"
                            >
                              {v.date}
                            </Text>
                          ) : null}
                        </styled.div>
                        {typeof p.suffix === 'function' ? (
                          p.suffix(raw)
                        ) : v.id ? (
                          <BadgeId style={{ flexShrink: 0 }} id={v.id} />
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
