import * as React from 'react'
import { LanguageInput } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof LanguageInput> = {
  title: 'Inputs/LanguageInput',
  component: LanguageInput,
}

export default meta

export const Default = () => {
  const [lang, setLang] = React.useState('en')
  return (
    <LanguageInput
      value={lang}
      onChange={setLang}
      options={['en', 'de', 'fr', 'lb']}
    />
  )
}

export const Small = () => {
  const [lang, setLang] = React.useState('en')
  return (
    <LanguageInput
      variant="small"
      value={lang}
      onChange={setLang}
      options={['en', 'de', 'fr', 'lb']}
    />
  )
}
