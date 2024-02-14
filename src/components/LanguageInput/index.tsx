import React, { useContext } from 'react'
import { SelectInput, SelectInputProps, getFlagEmoji } from '../../index.js'
import { LanguageCtx } from '../../hooks/useLanguage/index.js'

export type LanguageInputProps = Omit<SelectInputProps, 'options'> & {
  options?: string[]
  language?: string
}

export function LanguageInput({
  value,
  options,
  language,
  onChange,
  ...props
}: LanguageInputProps) {
  const lang = useContext(LanguageCtx)

  value ||= lang.code
  onChange ||= lang.setLanguage
  options ||= lang.options

  return (
    <SelectInput
      placeholder="Select language"
      value={value}
      options={options.map((lang) => {
        const l = new Intl.DisplayNames([language || lang || 'en'], {
          type: 'language',
        }).of(lang)
        return {
          value: lang,
          label: l[0].toUpperCase() + l.substring(1),
          prefix: getFlagEmoji(lang === 'en' ? 'gb' : lang),
        }
      })}
      onChange={onChange}
      {...props}
    />
  )
}
