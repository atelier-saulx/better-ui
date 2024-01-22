import * as React from 'react'
import { SelectInput, getFlagEmoji } from '../../index.js'

export type LanguageInputProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
}

export function LanguageInput({
  value,
  onChange,
  options,
}: LanguageInputProps) {
  return (
    <SelectInput
      placeholder="Select language"
      value={value}
      onChange={onChange}
      options={options.map((language) => ({
        value: language,
        label: new Intl.DisplayNames([value ?? 'en'], {
          type: 'language',
        }).of(language),
        prefix: getFlagEmoji(language === 'en' ? 'gb' : language),
      }))}
    />
  )
}
