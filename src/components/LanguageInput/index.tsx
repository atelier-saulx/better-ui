import * as React from 'react'
import { SelectInput, SelectInputProps, getFlagEmoji } from '../../index.js'

export type LanguageInputProps = Omit<SelectInputProps, 'options'> & {
  options: string[]
}

export function LanguageInput({
  value,
  options,
  ...props
}: LanguageInputProps) {
  return (
    <SelectInput
      placeholder="Select language"
      value={value}
      options={options.map((language) => ({
        value: language,
        label: new Intl.DisplayNames([value ?? 'en'], {
          type: 'language',
        }).of(language),
        prefix: getFlagEmoji(language === 'en' ? 'gb' : language),
      }))}
      {...props}
    />
  )
}
