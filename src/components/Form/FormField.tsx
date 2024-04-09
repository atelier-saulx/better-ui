import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Text, Stack, border, Tooltip, IconGlobe } from '../../index.js'
import { Variant } from './types.js'
import { getTitle } from './utils.js'

const markdownLinkParser = (v: string) => {
  const regexp = /\[(.*?)\]\((.*?)\)/gm
  const m = regexp.exec(v)
  console.log(m)
  if (m) {
    console.log('-----', v.split(regexp))
  }
  return v
}

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
