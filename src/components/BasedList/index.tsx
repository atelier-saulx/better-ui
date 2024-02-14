// @ts-nocheck
import { useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import * as React from 'react'
import { generateFieldsFromQuery } from '../BasedExplorer/index.js'
import { Text, border, borderRadius, color } from '../../index.js'
import { styled } from 'inlines'

export type BasedListProps = {
  query: () => any
  queryEndpoint?: string
  // basically defines which key on the item should be rendered into the specific slots on the list
  fields?: {
    title: string
    description?: string
    image?: string
  }
  onItemClick?: (item: any) => void
  count: number
  itemHeight: number
}

function Virtualized({
  children,
  count,
  itemHeight,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = React.useState<{
    height: number
    page: number
    numberOfItemsPerPage: number
  }>()
  const ref = React.useRef<HTMLDivElement>()

  React.useLayoutEffect(() => {
    if (!ref.current) return

    const { height } = ref.current.getBoundingClientRect()

    setState({
      height,
      page: 0,
      numberOfItemsPerPage: Math.ceil(height / itemHeight),
    })
  }, [])

  const handleScroll = React.useCallback(() => {
    if (!state) return

    const newPage = Math.floor(
      ref.current.scrollTop / (state.numberOfItemsPerPage * itemHeight),
    )

    if (state.offset !== newPage) {
      setState({
        ...state,
        page: newPage,
      })
    }
  }, [state])

  console.log(state)

  return (
    <div
      onScroll={handleScroll}
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
      ref={ref}
    >
      {state && (
        <div
          style={{
            position: 'relative',
            height: count * itemHeight,
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${state.page * state.numberOfItemsPerPage * itemHeight}px)`,
            }}
          >
            {React.Children.toArray(children).slice(
              state.page * state.numberOfItemsPerPage,
              (state.page + 1) * state.numberOfItemsPerPage,
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function BasedList({
  query,
  fields: fieldsProp,
  queryEndpoint = 'db',
  onItemClick,
}: BasedListProps) {
  const { data: rawSchema, checksum } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
  }, [checksum])

  const fields = React.useMemo(() => {
    if (fieldsProp) return fieldsProp
    if (!schema) return null

    const generatedFields = generateFieldsFromQuery(query(), schema)

    const fields = {
      title: 'id',
      description: null,
      image: null,
    }

    for (const key in generatedFields) {
      if (['name', 'title'].includes(key)) {
        fields.title = key
      }

      if (['description'].includes(key)) {
        fields.description = key
      }

      if (['image'].includes(key)) {
        fields.image = key
      }
    }

    return fields
  }, [schema, query, fieldsProp])
  const { data } = useQuery(queryEndpoint, query())

  if (!data || !fields) return null

  return (
    <Virtualized count={1000} itemHeight={81}>
      {data.data.map((e, i) => (
        <styled.div
          key={i}
          style={{
            display: 'flex',
            gap: 16,
            padding: 16,
            borderBottom: border(),
            cursor: 'pointer',
            '&:hover': {
              background: color('background', 'neutral'),
            },
          }}
          onClick={() => {
            onItemClick?.(e)
          }}
        >
          <div
            style={{
              height: 48,
              width: 48,
              border: border(),
              borderRadius: borderRadius('small'),
              background: color('background', 'screen'),
            }}
          >
            {fields.image && (
              <img
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: borderRadius('small'),
                }}
                src={
                  typeof e[fields.image] === 'object'
                    ? e[fields.image].src
                    : e[fields.image]
                }
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div>
              <Text>{e[fields.title]}</Text>
            </div>
            {fields.description && (
              <div>
                <Text>{e[fields.title]}</Text>
              </div>
            )}
          </div>
        </styled.div>
      ))}
    </Virtualized>
  )
}
