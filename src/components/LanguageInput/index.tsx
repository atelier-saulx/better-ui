import React, { useContext } from 'react'
import {
  Button,
  Dropdown,
  IconChevronDown,
  IconChevronDownSmall,
  SelectInput,
  SelectInputProps,
  Stack,
  border,
  borderRadius,
  color,
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
        <styled.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 24,
            gap: 4,
            borderRadius: borderRadius('small'),
            padding: '2px 8px',
            cursor: 'pointer',
            '&:hover': {
              background: color('background', 'neutral'),
            },
          }}
        >
          <div>{getFlagEmoji(value === 'en' ? 'gb' : value)}</div>
          <div>
            <IconChevronDown />
          </div>
        </styled.div>
      </Dropdown.Trigger>
      <Dropdown.Items>
        {options.map((lang) => {
          const l = new Intl.DisplayNames([language || lang || 'en'], {
            type: 'language',
          }).of(lang)

          return (
            <Dropdown.Item
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
