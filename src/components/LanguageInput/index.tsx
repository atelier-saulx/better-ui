import React, { useContext } from 'react'
import {
  Button,
  Dropdown,
  IconChevronDown,
  IconChevronDownSmall,
  IconGlobe,
  SelectInput,
  SelectInputProps,
  Stack,
  border,
  borderRadius,
  color,
  Text,
  getFlagEmoji,
} from '../../index.js'
import { LanguageCtx } from '../../hooks/useLanguage/index.js'
import { styled } from 'inlines'

export type LanguageInputProps = Omit<
  SelectInputProps,
  'options' | 'variant'
> & {
  options?: string[]
  language?: string
  variant?: 'regular' | 'small'
}

export function LanguageInput({
  value,
  options,
  language,
  onChange,
  variant = 'regular',
  ...props
}: LanguageInputProps) {
  const lang = useContext(LanguageCtx)

  value ||= lang.code
  onChange ||= lang.setLanguage
  options ||= lang.options

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Stack
          gap={8}
          padding={8}
          fitContent
          justify="start"
          style={{
            borderRadius: borderRadius('small'),
            cursor: 'pointer',
            '&:hover': {
              background: color('background', 'neutral'),
            },
          }}
        >
          <IconGlobe />
          <Text variant="caption">{value}</Text>
          <IconChevronDown />
        </Stack>
      </Dropdown.Trigger>
      <Dropdown.Items>
        {options.map((lang) => {
          const l = new Intl.DisplayNames([language || lang || 'en'], {
            type: 'language',
          }).of(lang)

          return (
            <Dropdown.Item
              key={lang}
              onClick={() => {
                onChange(lang)
              }}
            >
              <Stack gap={8}>
                <div>{getFlagEmoji(lang === 'en' ? 'gb' : lang)}</div>
                <div>{l[0].toUpperCase() + l.substring(1)}</div>
              </Stack>
            </Dropdown.Item>
          )
        })}
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
