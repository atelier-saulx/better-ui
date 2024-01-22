import * as React from 'react'
import { SelectInput, SelectInputProps, getFlagEmoji } from '../../index.js'

export type LanguageInputProps = Omit<SelectInputProps, 'options'> & {
  options: string[]
  language?: string
}

export function LanguageInput({
  value,
  options,
  language,
  ...props
}: LanguageInputProps) {
  return (
    <SelectInput
      placeholder="Select language"
      value={value}
      options={options.map((lang) => ({
        value: lang,
        label: new Intl.DisplayNames([language || lang || 'en'], {
          type: 'language',
        }).of(lang),
        prefix: getFlagEmoji(lang === 'en' ? 'gb' : lang),
      }))}
      {...props}
    />
  )
}
