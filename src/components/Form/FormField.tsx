import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Text, Stack, border, Tooltip, IconGlobe } from '../../index.js'
import { Variant } from './types.js'
import { getTitle } from './utils.js'

const markdownLinkParser = (v: string) => {
  // This splits the string using the matched
  // regexp adding matched groups inbetween the
  // splited string.
  // If no match is found it returns an array with
  // only the string.
  const regexp = /\[(.*?)\]\((.*?)\)/gm
  const vSplited = v.split(regexp)
  const length = vSplited.length
  let i = 0
  const result = []
  while (i < length) {
    result.push(vSplited[i])
    i = i + 1
    if (i + 3 <= length) {
      result.push(
        <a
          key={i}
          href={vSplited[i + 1]}
          target="_blank"
          style={{ color: 'inherit' }}
        >
          {vSplited[i]}
        </a>,
      )
      i = i + 2
    }
  }
  return result
}

// italic regexp
// const regexp = /\*(?![*\s])(?:[^*]*[^*\s])\*/gm
// bold regexp
// const regexp = new RegExp(/\*\*(?![*,\s])([^*]*[^*,\s]{2})\*\*/, 'cg')

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  variant: Variant
  noBorder?: boolean
  fieldKey: string
}

export function FormField({
  children,
  field,
  fieldKey,
  noBorder,
  variant,
}: FormFieldProps) {
  const name = getTitle(fieldKey, field)
  return (
    <Stack
      fitContent
      gap={12}
      direction="column"
      align="start"
      style={
        variant === 'bare'
          ? {
              '& > *': {
                border: 'none !important',
                '& > * > :last-child > *': {
                  borderBottom: 'none !important',
                },
              },
            }
          : noBorder
            ? null
            : {
                paddingLeft: 24,
                paddingBottom: 8,
                borderLeft: border('muted', 2),
              }
      }
    >
      {variant !== 'bare' ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Text variant="body-bold">{name}</Text>
            {field.type === 'text' && (
              <Tooltip content="This field is translated into multiple languages">
                <IconGlobe size={14} />
              </Tooltip>
            )}
          </div>
          {field.description && (
            <Text style={{ marginTop: -2 }} color="secondary">
              {markdownLinkParser(field.description)}
            </Text>
          )}
        </div>
      ) : null}
      {children}
    </Stack>
  )
}
